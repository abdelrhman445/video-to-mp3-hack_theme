██████████████████████████████████████████████████████████████
███                   ⚠ NEO DOWNLOAD v3.0.0 ⚠              ███
███         THE DARK PORTAL FOR VIDEO → MP3/MP4 TOOL         ███
███          Built for Hackers • Devs • Power Users          ███
██████████████████████████████████████████████████████████████

===============================================================
🔥 OVERVIEW
===============================================================
NeoDownload is a hacker-themed video downloader and converter.
It allows you to extract audio and download video from major platforms:

• YouTube • TikTok • Facebook • Instagram • Twitter

Features:
- Ultra-fast processing
- High-quality MP3 up to 320kbps
- Multi-quality video download (144p → 1080p+)
- Smart auto format detection
- Hacker UI terminal-style interface
- API fully functional & stable
- Responsive design for all devices

===============================================================
🔥 FEATURES
===============================================================
✔ Video info extraction
✔ Audio MP3 download
✔ Video MP4 download
✔ Cross-platform support
✔ Auto format detection
✔ Security validation for links
✔ Auto-clearing temp files
✔ Developer-friendly debug logs

===============================================================
📁 PROJECT STRUCTURE
===============================================================
NeoDownload/
│
├── server.js              ← Main Express server
├── package.json
├── README.md
│
├── api/
│   ├── index.js           ← API router
│   ├── download.js        ← Video/audio handler
│   └── utils.js           ← Helper functions
│
└── public/
    ├── index.html         ← Hacker-style frontend
    ├── style.css          ← Black + neon green theme
    └── app.js             ← Frontend logic

===============================================================
🧪 API ENDPOINTS
===============================================================
▶ GET VIDEO INFO
GET /api/info?url=

▶ DOWNLOAD AUDIO (MP3)
GET /api/audio?url=

▶ DOWNLOAD VIDEO (MP4)
GET /api/video?url=

▶ DIRECT FILE DOWNLOAD
GET /api/download?url=

===============================================================
🛠 INSTALLATION
===============================================================
# 1. Clone the repo
git clone https://github.com/yourusername/NeoDownload.git
cd NeoDownload

# 2. Install dependencies
npm install

# 3. Install yt-dlp + ffmpeg

Windows:
winget install yt-dlp
winget install ffmpeg

Linux:
sudo apt install ffmpeg
sudo curl -L https://yt-dlp.org/downloads/latest/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod +x /usr/local/bin/yt-dlp

# 4. Run server
npm start

Server ready:
📡 API:       http://localhost:3000/api
🎨 Frontend:  http://localhost:3000

===============================================================
🎨 HACKER UI
===============================================================
✔ Full dark terminal UI
✔ Matrix-style animation
✔ Neon green highlights
✔ Fake terminal logs
✔ Video preview + info
✔ Responsive & clean layout
✔ Scanline & glitch effects

===============================================================
🛡 SECURITY
===============================================================
• URL sanitization
• Anti-SSRF
• Directory traversal protection
• Protocol validation (HTTP/HTTPS)
• Error logging system
• Auto remove temp files
• Optional rate limiting

===============================================================
⚠ TROUBLESHOOTING
===============================================================
❌ yt-dlp not installed
→ Install via winget or curl

❌ ffmpeg missing
→ npm install ffmpeg-static

❌ Timeout errors
→ Increase timeout in download.js

===============================================================
📜 LICENSE
===============================================================
MIT License — Free to use, modify, and distribute.

===============================================================
👤 AUTHOR
===============================================================
AbdUlrahman Elsayed – NullSpecter
Cyber Security Engineer & Full-Stack Developer
██████████████████████████████████████████████████████████████
