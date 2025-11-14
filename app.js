const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const downloadRoute = require('./routes/download');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

// إنشاء المجلدات اللازمة
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Routes
app.use('/api', downloadRoute);

// Route للصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route لأيقونة الموقع
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'حدث خطأ داخلي في الخادم' 
  });
});

// Route غير موجود
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'الصفحة غير موجودة' 
  });
});

// تنظيف الملفات المؤقتة كل ساعة
setInterval(() => {
  const files = fs.readdirSync(tempDir);
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  files.forEach(file => {
    const filePath = path.join(tempDir, file);
    const stats = fs.statSync(filePath);
    
    if (now - stats.mtime.getTime() > oneHour) {
      fs.unlinkSync(filePath);
      console.log(`تم حذف الملف المؤقت: ${file}`);
    }
  });
}, 60 * 60 * 1000);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 API: http://localhost:${PORT}/api`);
});