const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎯 تثبيت yt-dlp مبسط...');

// دالة للتحقق من تثبيت Python و pip
function checkPython() {
  return new Promise((resolve) => {
    exec('python --version', (error) => {
      if (error) {
        exec('python3 --version', (error3) => {
          if (error3) {
            resolve({ installed: false, error: 'Python غير مثبت' });
          } else {
            resolve({ installed: true, command: 'python3' });
          }
        });
      } else {
        resolve({ installed: true, command: 'python' });
      }
    });
  });
}

// دالة التثبيت باستخدام pip
function installWithPip(pythonCommand) {
  return new Promise((resolve) => {
    console.log('🔹 جاري التثبيت باستخدام pip...');
    
    const command = `${pythonCommand} -m pip install yt-dlp`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log('❌ فشل التثبيت مع pip:', error.message);
        resolve(false);
      } else {
        console.log('✅ تم تثبيت yt-dlp باستخدام pip!');
        
        // التحقق من التثبيت
        exec('yt-dlp --version', (error, stdout) => {
          if (error) {
            console.log('❌ yt-dlp غير قابل للتنفيذ بعد التثبيت');
            resolve(false);
          } else {
            console.log(`🎉 yt-dlp مثبت! الإصدار: ${stdout.trim()}`);
            resolve(true);
          }
        });
      }
    });
  });
}

// التنزيل المباشر لـ yt-dlp.exe
function downloadDirect() {
  return new Promise((resolve) => {
    console.log('🔹 جاري التنزيل المباشر...');
    
    // استخدام PowerShell للتنزيل (أكثر موثوقية في Windows)
    const powerShellCommand = `
      $url = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"
      $output = "yt-dlp.exe"
      Invoke-WebRequest -Uri $url -OutFile $output
      if (Test-Path $output) { Write-Host "SUCCESS" } else { Write-Host "FAILED" }
    `;
    
    exec(`powershell -Command "${powerShellCommand}"`, (error, stdout) => {
      if (error || !stdout.includes('SUCCESS')) {
        console.log('❌ فشل التنزيل المباشر');
        resolve(false);
      } else {
        console.log('✅ تم تنزيل yt-dlp.exe بنجاح!');
        resolve(true);
      }
    });
  });
}

// التنفيذ الرئيسي
async function main() {
  console.log('🚀 بدء عملية تثبيت yt-dlp...\n');
  
  // المحاولة 1: استخدام pip إذا كان Python مثبتاً
  const pythonCheck = await checkPython();
  if (pythonCheck.installed) {
    console.log(`🔹 Python مثبت: ${pythonCheck.command}`);
    const pipSuccess = await installWithPip(pythonCheck.command);
    if (pipSuccess) {
      console.log('\n✅ تم التثبيت بنجاح باستخدام pip!');
      return;
    }
  } else {
    console.log('🔹 Python غير مثبت');
  }
  
  // المحاولة 2: التنزيل المباشر (لـ Windows)
  if (process.platform === 'win32') {
    console.log('\n🔄 جاري المحاولة مع التنزيل المباشر...');
    const downloadSuccess = await downloadDirect();
    if (downloadSuccess) {
      console.log('\n✅ تم التثبيت بنجاح بالتنزيل المباشر!');
      return;
    }
  }
  
  console.log('\n💡 حلول بديلة:');
  console.log('1. قم بتثبيت Python من: https://www.python.org/downloads/');
  console.log('2. ثم شغل: pip install yt-dlp');
  console.log('3. أو نزل yt-dlp يدوياً من: https://github.com/yt-dlp/yt-dlp');
  console.log('\n🎯 للمشروع الحالي، يمكنك استخدام ytdl-core لليوتيوب بدون yt-dlp');
}

main();