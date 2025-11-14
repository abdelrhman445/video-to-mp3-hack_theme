###############################################################
######################  NEO DOWNLOAD  #########################
###############################################################

🚀 YouTube & Social Media Downloader API  
⚡ High-Speed • Stable • Hacker UI • Cross-Platform  

NeoDownload هو نظام كامل لتنزيل الفيديوهات والصوت من يوتيوب ومعظم منصّات السوشيال، مبني بـ:
- Node.js (Express)
- yt-dlp
- ffmpeg
- HTML / CSS / JS (Hacker UI)

===============================================================
🔥 FEATURES
===============================================================
✔ تحميل سريع جدًا  
✔ دعم YouTube / Facebook / Instagram / TikTok / Twitter  
✔ استخراج MP3 بكل الجودات  
✔ تحميل فيديو بجودات متعددة  
✔ Auto Format Detection  
✔ Error Handler محترف  
✔ واجهة "Hacker Terminal"  
✔ يدعم Windows / Linux / macOS  

===============================================================
📁 PROJECT STRUCTURE
===============================================================
NeoDownload/
│
├── server.js
├── package.json
├── README.md
│
├── api/
│   ├── index.js
│   ├── download.js
│   └── utils.js
│
└── public/
    ├── index.html
    ├── style.css
    └── app.js

===============================================================
🧪 API ENDPOINTS
===============================================================

▶ GET VIDEO INFO
GET /api/info?url=

▶ DOWNLOAD AUDIO (MP3)
GET /api/audio?url=

▶ DOWNLOAD VIDEO
GET /api/video?url=

▶ DIRECT FILE DOWNLOAD
GET /api/download?url=

===============================================================
🛠 INSTALLATION
===============================================================

1) Clone repo:
    git clone https://github.com/yourusername/NeoDownload.git
    cd NeoDownload

2) Install dependencies:
    npm install

3) Install yt-dlp + ffmpeg:

Windows:
    winget install yt-dlp
    winget install ffmpeg

Linux:
    sudo apt install ffmpeg
    sudo curl -L https://yt-dlp.org/downloads/latest/yt-dlp -o /usr/local/bin/yt-dlp
    sudo chmod +x /usr/local/bin/yt-dlp

===============================================================
🚀 RUN SERVER
===============================================================
    npm start

Server Ready:
📡 API:       http://localhost:3000/api
🎨 Frontend:  http://localhost:3000

===============================================================
🎨 HACKER UI
===============================================================
• خلفية سوداء  
• خطوط نيون خضراء  
• Animation Hacker Loading  
• Tabs للصوت والفيديو  
• Info Preview + Auto detection  

===============================================================
🛡 ERROR HANDLING
===============================================================
النظام يتعامل مع:
- روابط فاسدة
- فيديوهات محجوبة
- timeout
- أخطاء yt-dlp
- أخطاء جودة غير مدعومة

===============================================================
🤝 CONTRIBUTING
===============================================================
Pull Requests welcome.

===============================================================
📜 LICENSE
===============================================================
MIT License — Free to use.

===============================================================
👤 AUTHOR
===============================================================
AbdUlrahman Elsayed – NullSpecter  
Cyber Security Expert & Developer
###############################################################
