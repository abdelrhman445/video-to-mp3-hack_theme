<div align="center" style="background:#0d0d0d;padding:30px;border-radius:22px;border:1px solid #222;">

<img src="https://i.imgur.com/U8y7F3T.gif" width="180" />

# ⚡ NeoDownload API  
### Advanced Anime x Hacker Edition

</div>

<div align="center">

A modern, powerful, high‑speed API for downloading **videos, audio, playlists**  
from YouTube and multiple other platforms — built with **Node.js + yt‑dlp**  
with a clean hacker-themed frontend UI.

<br>

<img src="https://i.imgur.com/jSxP4FL.gif" width="620" style="border-radius:14px;" />

</div>

---

## 🚀 Features

- Ultra‑fast video/audio downloading  
- MP3 / M4A / MP4 / WEBM support  
- Full metadata extraction  
- Playlist support  
- Clean hacker‑dark UI  
- Reliable, stable backend  
- Works on any hosting or VPS  

---

## 📦 Project Structure

```
NeoDownload/
│── server.js
│── package.json
│── /api
│     ├── index.js
│     ├── video.js
│     ├── audio.js
│     └── formats.js
│── /public
│     ├── index.html
│     ├── style.css
│     └── app.js
```

---

## 🔧 Installation

```bash
git clone https://github.com/your-user/neo-download.git
cd neo-download
npm install
```

Install yt-dlp:

```bash
npm run setup
```

Start:

```bash
npm start
```

---

## 📡 API Routes

### Get Video Info
```
GET /api/info?url=VIDEO_URL
```

### Download Video
```
GET /api/video?url=VIDEO_URL&quality=1080p
```

### Download Audio
```
GET /api/audio?url=VIDEO_URL&format=mp3
```

---

## 🖥️ UI Preview

<div align="center">
<img src="https://i.imgur.com/klJExb3.gif" width="700" style="border-radius:14px;" />
</div>

---

## 🧪 Example Request

```bash
curl "http://localhost:3000/api/video?url=https://youtu.be/dQw4w9WgXcQ&quality=720p"
```

---

## 📸 Screenshots

<div align="center">
<img src="https://i.imgur.com/8RB8pFR.jpeg" width="420" style="border-radius:12px;" />
<img src="https://i.imgur.com/QqPZm08.gif" width="420" style="border-radius:12px;" />
</div>

---

## 👤 Developer  
**NullSpecter (AbdUlrahman Elsayed)**  
Cyber Security Specialist • Full Stack Developer  

<div align="center">
<img src="https://i.imgur.com/AdSFb2j.gif" width="170" />
</div>
