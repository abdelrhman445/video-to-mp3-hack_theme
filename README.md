<div align="center">

<img src="https://i.imgur.com/U8y7F3T.gif" width="230" />

# ⚡ NeoDownload API  
### Anime • Hacker • Ultra Fast • Multi-Platform Downloader

A powerful Node.js API that downloads **YouTube videos, audio, playlists**, and supports **TikTok, Instagram, Facebook, Twitter, and more**—all with insane speed using *yt‑dlp*.

<br>

<img src="https://i.imgur.com/jSxP4FL.gif" width="600" />

---

## 🚀 Features

✔ Download **video** in all qualities  
✔ Download **audio** (mp3 / m4a)  
✔ Fetch metadata, thumbnails, duration  
✔ Fast + Safe + Optimized  
✔ Built-in rate limiter  
✔ Modern Hacker UI (front-end)  
✔ 100% Open-source  

---

## 📂 Project Structure

```
neo-download/
│── server.js
│── package.json
│── /api
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

Install **yt-dlp** (Required):

```bash
npm run setup
```

Start the server:

```bash
npm start
```

---

## 📡 API Endpoints

### 🎥 Get Video Info  
```
GET /api/info?url=YOUTUBE_URL
```

### 📥 Download Video  
```
GET /api/video?url=YOUTUBE_URL&quality=1080p
```

### 🎧 Download Audio  
```
GET /api/audio?url=YOUTUBE_URL&format=mp3
```

---

## 🖥️ Frontend Preview

<img src="https://i.imgur.com/klJExb3.gif" width="700" />

---

## 🧪 Example Request

```bash
curl "http://localhost:3000/api/video?url=https://youtu.be/dQw4w9WgXcQ&quality=720p"
```

---

## 🔥 Screenshots

<img src="https://i.imgur.com/8RB8pFR.jpeg" width="400" />
<img src="https://i.imgur.com/QqPZm08.gif" width="400" />

---

## 👨‍💻 Developer  
**NullSpecter (AbdUlrahman)**  
Cyber Security Specialist & Full Stack Developer   

---

<img src="https://i.imgur.com/AdSFb2j.gif" width="200" />

### ⭐ If you like this project, give it a star!

</div>
