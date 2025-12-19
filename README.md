# Video Calling Web Application

A real-time video calling web application that allows two users to join a video call by entering the same room ID.  
Built using WebRTC for peer-to-peer media streaming and Socket.io for signaling.

---

## 🚀 Features

- One-to-one video calling
- Room-based call joining using Room ID
- Real-time audio & video streaming
- WebRTC peer-to-peer connection
- Socket.io signaling server
- Simple and minimal UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- JavaScript
- WebRTC APIs

### Backend
- Node.js
- Express.js
- Socket.io

---

## 📁 Project Structure

```text
video-calling-app/
├── client/        # React frontend
├── server/        # Signaling server
├── README.md
├── .gitignore


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone https://github.com/your-username/video-calling-app.git
cd video-calling-app

### 2️⃣ Backend Setup

cd server
npm install
npm run dev

### 3️⃣ Frontend Setup

cd client
npm install
npm start

## How It Works

a. User enters a Room ID
b. Second user joins with the same Room ID
c. Signaling is handled via Socket.io
d. Media streams are exchanged using WebRTC

## Limitations

a. No user authentication
b. Supports only one-to-one calls

## Future Improvements

a. Multi-user group calls
b. User authentication
c. Screen sharing
d. Chat during call

## Author

Debabrata Garai
B.Tech Information Technology, IIEST Shibpur