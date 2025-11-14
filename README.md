# 🚀 NeoDownload v3.0.0 – Ultimate Video & Audio Downloader

![Version](https://img.shields.io/badge/Version-3.0.0-blueviolet?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platforms-YouTube%20|%20TikTok%20|%20Instagram%20|%20Facebook-blue?style=for-the-badge)

![Banner](https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif)

---

## 🎨 Overview
NeoDownload is a **modern and hacker-inspired** video/audio downloader.  
It supports multiple platforms and gives you **super fast conversions** with a sleek, animated UI.

- 💽 Download videos & extract audio (MP3)  
- 🎬 Multi-platform support: YouTube, TikTok, Instagram, Facebook  
- ⚡ Ultra-fast conversion with **yt-dlp + ffmpeg**  
- 🌐 Responsive & animated interface  
- 🔒 Secure & safe (auto cleaning temp files, URL validation)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎧 Audio Extraction | Convert videos to MP3 up to 320kbps |
| 🎥 Video Download | Download in multiple resolutions |
| ⚡ Speed | Optimized for maximum download speed |
| 🔒 Security | URL sanitization + prevent traversal attacks |
| 🌐 Platforms | YouTube, TikTok, Instagram, Facebook, Twitter |
| 🎨 UI | Animated terminal-style interface with neon effects |

---

## 📁 Project Structure

```
NeoDownload/
├── server.js           # Main Node.js server
├── package.json
├── README.md
├── api/
│   ├── index.js        # API router
│   ├── download.js     # Download & conversion logic
│   └── utils.js        # Helper functions
└── public/
    ├── index.html      # Frontend page
    ├── style.css       # CSS with animations & themes
    └── app.js          # Frontend JS logic
```

---

## 🧪 API Endpoints

### Get Video Info
```
GET /api/info?url=VIDEO_URL
```

### Download Audio
```
GET /api/audio?url=VIDEO_URL
```

### Download Video
```
GET /api/video?url=VIDEO_URL
```

### Direct Download
```
GET /api/download?url=VIDEO_URL
```

---

## 🚀 Installation

```bash
# Clone repo
git clone https://github.com/yourusername/NeoDownload.git
cd NeoDownload

# Install dependencies
npm install

# Make sure ffmpeg & yt-dlp are installed
# Windows
winget install yt-dlp
winget install ffmpeg

# Linux
sudo apt install ffmpeg
sudo curl -L https://yt-dlp.org/downloads/latest/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod +x /usr/local/bin/yt-dlp

# Start server
npm start
```

Frontend: [http://localhost:3000](http://localhost:3000)  
API: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🎨 UI Preview

![Preview](https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif)

Animated terminal-style interface with **neon effects, scanlines, and interactive tabs**.  
Responsive for all devices.

---

## 🛡 Security

- Input validation & sanitization  
- Anti-SSRF & directory traversal protection  
- Auto-clean temporary files  
- Optional rate-limiting  

---

## ⚠ Troubleshooting

- ❌ yt-dlp not installed → run `npm run install-ytdlp`  
- ❌ ffmpeg missing → run `npm install ffmpeg-static`  
- ❌ Timeout → increase timeout in `download.js`

---

## 📜 License

MIT License – Free to use, modify & distribute

---

## 👤 Author

**AbdUlrahman Elsayed – NullSpecter**  
Cyber Security Expert & Full-Stack Developer

---

![Footer GIF](https://media.giphy.com/media/3o7aD6t0sJZlL9w6R2/giphy.gif)
