const express = require('express');
const router = express.Router();
const { downloadVideo, getVideoInfo, getSupportedPlatforms, getSystemStatus } = require('../utils/downloader');
const path = require('path');
const fs = require('fs');

// Route للتحقق من حالة النظام
router.get('/system-status', async (req, res) => {
  try {
    const status = await getSystemStatus();
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: 'خطأ في التحقق من حالة النظام' });
  }
});

// Route لجلب المنصات المدعومة
router.get('/platforms', (req, res) => {
  try {
    const platforms = getSupportedPlatforms();
    res.json({ success: true, platforms });
  } catch (error) {
    res.status(500).json({ success: false, error: 'خطأ في جلب المنصات المدعومة' });
  }
});

// Route لفحص حالة الخادم
router.get('/status', (req, res) => {
  res.json({ 
    success: true, 
    status: 'يعمل', 
    timestamp: new Date().toISOString(),
    version: '3.0.0'
  });
});

// Route محسن لتحميل معلومات الفيديو
router.post('/info', async (req, res) => {
  try {
    const { videoUrl } = req.body;
    
    if (!videoUrl) {
      return res.status(400).json({ 
        success: false, 
        error: 'يجب إدخال رابط الفيديو' 
      });
    }

    // تنظيف الرابط والتحقق من صحته
    const cleanUrl = videoUrl.trim();
    
    if (!cleanUrl.startsWith('http')) {
      return res.status(400).json({ 
        success: false, 
        error: 'رابط غير صالح. يجب أن يبدأ بـ http أو https' 
      });
    }

    console.log('🔹 معالجة الرابط:', cleanUrl);
    
    const videoInfo = await getVideoInfo(cleanUrl);
    res.json({ success: true, data: videoInfo });
    
  } catch (error) {
    console.error('❌ خطأ في /info:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'حدث خطأ في جلب معلومات الفيديو' 
    });
  }
});

// Route محسن لتحميل الفيديو وتحويله إلى MP3
router.post('/download', async (req, res) => {
  try {
    const { videoUrl, quality = '320' } = req.body;
    
    if (!videoUrl) {
      return res.status(400).json({ 
        success: false, 
        error: 'يجب إدخال رابط الفيديو' 
      });
    }

    // تنظيف الرابط
    const cleanUrl = videoUrl.trim();
    
    if (!cleanUrl.startsWith('http')) {
      return res.status(400).json({ 
        success: false, 
        error: 'رابط غير صالح. يجب أن يبدأ بـ http أو https' 
      });
    }

    // التحقق من الجودة المدخلة
    const validQualities = ['128', '192', '256', '320'];
    if (!validQualities.includes(quality)) {
      return res.status(400).json({ 
        success: false, 
        error: 'جودة غير صالحة. الجودة يجب أن تكون: 128, 192, 256, أو 320' 
      });
    }

    console.log('🔹 تحميل الرابط:', cleanUrl, 'الجودة:', quality);
    
    const result = await downloadVideo(cleanUrl, quality);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'تم التحويل بنجاح',
        data: {
          downloadUrl: `/api/download-file/${result.fileName}`,
          fileName: result.fileName,
          fileSize: result.fileSize,
          duration: result.duration
        }
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    console.error('❌ خطأ في /download:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'حدث خطأ أثناء التحويل' 
    });
  }
});

// Route لتحميل الملف
router.get('/download-file/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    
    // التحقق من أن الملف هو mp3 ومنع directory traversal
    if (!filename.endsWith('.mp3') || filename.includes('..') || filename.includes('/')) {
      return res.status(400).json({ 
        success: false, 
        error: 'نوع ملف غير صالح' 
      });
    }

    const filePath = path.join(__dirname, '../temp', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ 
        success: false, 
        error: 'الملف غير موجود' 
      });
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('❌ خطأ في تحميل الملف:', err);
        return res.status(500).json({ 
          success: false, 
          error: 'خطأ في تحميل الملف' 
        });
      }

      // حذف الملف بعد التحميل الناجح
      setTimeout(() => {
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ تم حذف الملف: ${filename}`);
          }
        } catch (e) {
          console.error('❌ خطأ في حذف الملف:', e);
        }
      }, 30000); // حذف بعد 30 ثانية
    });
  } catch (error) {
    console.error('❌ خطأ في /download-file:', error);
    res.status(500).json({ 
      success: false, 
      error: 'حدث خطأ أثناء تحميل الملف' 
    });
  }
});

module.exports = router;