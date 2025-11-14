const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 بدء إعداد مشروع تحميل الفيديو إلى MP3...');

// إنشاء المجلدات اللازمة
const folders = ['temp', 'public', 'routes', 'utils'];
folders.forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`✅ تم إنشاء مجلد: ${folder}`);
  }
});

console.log('\n📋 الخطوات التالية:');
console.log('1. قم بتشغيل: npm run install-ytdlp');
console.log('2. ثم شغل: npm start');
console.log('\n🎉 تم الانتهاء من الإعداد الأساسي!');