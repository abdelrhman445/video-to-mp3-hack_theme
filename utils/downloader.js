const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');
const { exec, spawn } = require('child_process');

// تأكد من وجود مجلد temp
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// الحصول على مسار ffmpeg من الحزمة
const ffmpegDir = path.dirname(ffmpegPath);
ffmpeg.setFfmpegPath(ffmpegPath);

console.log('🔧 مسار ffmpeg:', ffmpegDir);
console.log('🔧 ملف ffmpeg:', ffmpegPath);

// المنصات المدعومة (التركيز على يوتيوب)
const SUPPORTED_PLATFORMS = {
  'youtube.com': 'YouTube',
  'youtu.be': 'YouTube',
  'music.youtube.com': 'YouTube Music'
};

// دالة للتحقق من المنصة المدعومة
function checkSupportedPlatform(videoUrl) {
  try {
    const urlObj = new URL(videoUrl);
    const hostname = urlObj.hostname.replace('www.', '');
    
    for (const [domain, platform] of Object.entries(SUPPORTED_PLATFORMS)) {
      if (hostname.includes(domain)) {
        return { supported: true, platform };
      }
    }
    
    return { supported: false, platform: 'غير معروف' };
  } catch (error) {
    return { supported: false, platform: 'رابط غير صالح' };
  }
}

// دالة محسنة للتحقق من yt-dlp
async function checkYtDlpInstallation() {
  return new Promise((resolve) => {
    // جرب أولاً yt-dlp.exe في المسار النظامي
    const command = process.platform === 'win32' ? 'where yt-dlp' : 'which yt-dlp';
    
    exec(command, (error, stdout) => {
      if (error) {
        // إذا فشل، جرب الملف المحلي
        const localPath = process.platform === 'win32' ? 'yt-dlp.exe' : './yt-dlp';
        fs.access(localPath, fs.constants.F_OK, (err) => {
          if (err) {
            resolve({ 
              installed: false, 
              error: 'yt-dlp غير مثبت. الرجاء تشغيل: npm run install-ytdlp' 
            });
          } else {
            resolve({ 
              installed: true, 
              path: localPath,
              version: 'local',
              type: 'local'
            });
          }
        });
      } else {
        const systemPath = stdout.trim().split('\n')[0]; // خذ أول مسار
        resolve({ 
          installed: true, 
          path: systemPath,
          version: 'system',
          type: 'system'
        });
      }
    });
  });
}

// دالة لتنظيف رابط يوتيوب
function cleanYouTubeUrl(url) {
  try {
    const urlObj = new URL(url);
    // الاحتفاظ بمعرف الفيديو فقط، إزالة قوائم التشغيل والمعلمات الأخرى
    const videoId = urlObj.searchParams.get('v');
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    
    // إذا كان رابط youtu.be
    if (urlObj.hostname === 'youtu.be') {
      const videoId = urlObj.pathname.slice(1);
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    
    return url;
  } catch (error) {
    return url;
  }
}

// دالة للحصول على صورة مصغرة افتراضية
function getDefaultThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// دالة محسنة لجلب معلومات الفيديو باستخدام yt-dlp
async function getVideoInfo(videoUrl) {
  try {
    const platformCheck = checkSupportedPlatform(videoUrl);
    if (!platformCheck.supported) {
      throw new Error('المنصة غير مدعومة. حالياً ندعم يوتيوب فقط.');
    }

    // تنظيف الرابط
    const cleanUrl = cleanYouTubeUrl(videoUrl);

    const ytDlpCheck = await checkYtDlpInstallation();
    if (!ytDlpCheck.installed) {
      throw new Error(ytDlpCheck.error);
    }

    return new Promise((resolve, reject) => {
      const args = [
        '--dump-json',
        '--no-warnings',
        '--no-check-certificate',
        cleanUrl
      ];

      console.log(`🔹 جلب المعلومات: ${ytDlpCheck.path} ${args.join(' ')}`);

      const childProcess = spawn(ytDlpCheck.path, args, {
        timeout: 30000, // 30 ثانية
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';
      let timeoutId;

      // إعداد timeout
      timeoutId = setTimeout(() => {
        childProcess.kill('SIGTERM');
        reject(new Error('انتهت المهلة في جلب معلومات الفيديو (30 ثانية)'));
      }, 30000);

      childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      childProcess.on('close', (code) => {
        clearTimeout(timeoutId);

        if (code === 0 && stdout) {
          try {
            const info = JSON.parse(stdout);
            
            // استخراج معرف الفيديو من الرابط إذا لم يكن متوفراً
            let videoId = info.id || '';
            if (!videoId) {
              const match = cleanUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
              videoId = match ? match[1] : '';
            }

            resolve({
              title: info.title || 'بدون عنوان',
              duration: Math.floor(info.duration || 0),
              thumbnail: info.thumbnail || getDefaultThumbnail(videoId),
              platform: 'YouTube',
              views: info.view_count || 0,
              author: info.uploader || 'غير معروف',
              videoId: videoId
            });
          } catch (parseError) {
            console.error('❌ خطأ في تحليل JSON:', parseError);
            reject(new Error('خطأ في معالجة بيانات الفيديو'));
          }
        } else {
          const errorMsg = stderr || `yt-dlp انتهى بالرمز: ${code}`;
          console.error('❌ خطأ yt-dlp:', errorMsg);
          
          if (stderr.includes('Video unavailable')) {
            reject(new Error('الفيديو غير متاح أو محذوف'));
          } else if (stderr.includes('Private video')) {
            reject(new Error('الفيديو خاص ولا يمكن الوصول إليه'));
          } else if (stderr.includes('Not Found') || stderr.includes('404')) {
            reject(new Error('الفيديو غير موجود'));
          } else {
            reject(new Error(`فشل في جلب معلومات الفيديو: ${errorMsg}`));
          }
        }
      });

      childProcess.on('error', (error) => {
        clearTimeout(timeoutId);
        reject(new Error(`خطأ في تشغيل yt-dlp: ${error.message}`));
      });
    });
  } catch (error) {
    console.error('💥 خطأ في getVideoInfo:', error);
    throw new Error('لا يمكن جلب معلومات الفيديو: ' + error.message);
  }
}

// دالة محسنة لتحميل الفيديو وتحويله إلى MP3 باستخدام yt-dlp مع ffmpeg
async function downloadVideo(videoUrl, quality = '320') {
  return new Promise(async (resolve, reject) => {
    try {
      const platformCheck = checkSupportedPlatform(videoUrl);
      if (!platformCheck.supported) {
        throw new Error('المنصة غير مدعومة. حالياً ندعم يوتيوب فقط.');
      }

      // تنظيف الرابط
      const cleanUrl = cleanYouTubeUrl(videoUrl);

      const ytDlpCheck = await checkYtDlpInstallation();
      if (!ytDlpCheck.installed) {
        throw new Error(ytDlpCheck.error);
      }

      // جلب معلومات الفيديو أولاً للحصول على العنوان
      let videoInfo;
      try {
        videoInfo = await getVideoInfo(cleanUrl);
      } catch (infoError) {
        // إذا فشل جلب المعلومات، استخدم قيم افتراضية
        videoInfo = {
          title: 'فيديو',
          duration: 0
        };
      }

      const title = (videoInfo.title || 'فيديو')
        .replace(/[^\w\s\u0600-\u06FF\-_]/gi, '')
        .trim()
        .substring(0, 50) || 'فيديو';
      
      const outputFileName = `${Date.now()}_${title}.mp3`;
      const outputPath = path.join(tempDir, outputFileName);

      console.log('🔹 بدء تحميل وتحويل الفيديو...');
      console.log('🔹 مسار ffmpeg:', ffmpegDir);

      // استخدام yt-dlp للتحميل والتحويل المباشر إلى MP3 مع توجيه إلى ffmpeg
      const args = [
        '-x', // استخراج الصوت فقط
        '--audio-format', 'mp3',
        '--audio-quality', quality,
        '--no-warnings',
        '--no-check-certificate',
        '--ffmpeg-location', ffmpegDir, // توجيه yt-dlp إلى موقع ffmpeg
        '-o', outputPath,
        cleanUrl
      ];

      console.log(`🔹 تشغيل yt-dlp: ${ytDlpCheck.path} ${args.join(' ')}`);

      const childProcess = spawn(ytDlpCheck.path, args, {
        timeout: 300000, // 5 دقائق للتحميل
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';
      let timeoutId;

      // إعداد timeout
      timeoutId = setTimeout(() => {
        childProcess.kill('SIGTERM');
        reject(new Error('انتهت مهلة تحميل الفيديو (5 دقائق)'));
      }, 300000);

      childProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        if (output) {
          console.log(`🔹 ${output}`);
          stdout += output + '\n';
        }
      });

      childProcess.stderr.on('data', (data) => {
        const errorOutput = data.toString().trim();
        if (errorOutput && !errorOutput.includes('[download]')) {
          console.log(`⚠️  ${errorOutput}`);
          stderr += errorOutput + '\n';
        }
      });

      childProcess.on('close', (code) => {
        clearTimeout(timeoutId);

        if (code === 0) {
          // التحقق من وجود الملف
          if (fs.existsSync(outputPath)) {
            try {
              const stats = fs.statSync(outputPath);
              console.log('✅ تم التحويل بنجاح!');
              console.log(`📁 حجم الملف: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
              resolve({ 
                success: true, 
                filePath: outputPath, 
                fileName: outputFileName,
                fileSize: stats.size,
                duration: videoInfo.duration
              });
            } catch (e) {
              console.error('❌ خطأ في قراءة الملف المحول:', e);
              reject(new Error('خطأ في قراءة الملف المحول'));
            }
          } else {
            console.error('❌ الملف المحول غير موجود:', outputPath);
            reject(new Error('الملف المحول غير موجود'));
          }
        } else {
          const errorMsg = stderr || `yt-dlp انتهى بالرمز: ${code}`;
          console.error('❌ خطأ في التحويل:', errorMsg);
          
          if (stderr.includes('ffprobe and ffmpeg not found')) {
            reject(new Error('لم يتم العثور على ffmpeg. يرجى التأكد من تثبيته بشكل صحيح.'));
          } else if (stderr.includes('No video formats found')) {
            reject(new Error('لم يتم العثور على تنسيقات فيديو مناسبة'));
          } else if (stderr.includes('Unsupported URL')) {
            reject(new Error('الرابط غير مدعوم'));
          } else if (stderr.includes('Video unavailable')) {
            reject(new Error('الفيديو غير متاح'));
          } else {
            reject(new Error(`فشل في تحويل الفيديو: ${errorMsg}`));
          }
        }
      });

      childProcess.on('error', (error) => {
        clearTimeout(timeoutId);
        console.error('❌ خطأ في تشغيل yt-dlp:', error);
        reject(new Error(`خطأ في تشغيل yt-dlp: ${error.message}`));
      });

    } catch (error) {
      console.error('💥 خطأ في downloadVideo:', error);
      reject({ success: false, error: error.message });
    }
  });
}

// دالة للحصول على المنصات المدعومة
function getSupportedPlatforms() {
  return Object.values(SUPPORTED_PLATFORMS).filter((value, index, self) => 
    self.indexOf(value) === index
  );
}

// دالة للتحقق من حالة النظام
async function getSystemStatus() {
  const ytDlpStatus = await checkYtDlpInstallation();
  const ffmpegStatus = fs.existsSync(ffmpegPath);
  const tempDirStatus = fs.existsSync(tempDir);
  
  return {
    ytDlp: ytDlpStatus,
    ffmpeg: ffmpegStatus,
    tempDir: tempDirStatus,
    nodeVersion: process.version,
    platform: process.platform,
    dependencies: {
      'fluent-ffmpeg': '✓',
      'ffmpeg-static': ffmpegStatus ? '✓' : '✗',
      'yt-dlp': ytDlpStatus.installed ? '✓' : '✗'
    },
    ffmpegPath: ffmpegPath,
    ffmpegDir: ffmpegDir
  };
}

module.exports = {
  downloadVideo,
  getVideoInfo,
  getSupportedPlatforms,
  checkSupportedPlatform,
  getSystemStatus
};