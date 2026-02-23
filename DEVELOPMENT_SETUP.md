# Development Setup - Quick Start

## What You'll Need

1. **Expo Go App** on your phone (Download from Play Store)
2. **Same WiFi Network** - Your PC and phone must be on the same network

## Step-by-Step Setup

### Step 1: Start Backend Server (Already Running on Render)

Your backend is already live at: https://attendease-xu5m.onrender.com

No need to run locally! The app will connect to the production backend.

### Step 2: Install Expo Go on Your Phone

1. Open **Google Play Store** on your Android phone
2. Search for **"Expo Go"**
3. Install the app
4. Open Expo Go

### Step 3: Start Frontend Development Server

Open a terminal and run:

```bash
cd frontend
npm start
```

This will:
- Start the Metro bundler
- Show a QR code in the terminal
- Open a web page with the QR code

### Step 4: Connect Your Phone

**Option A: Scan QR Code (Easiest)**
1. Open **Expo Go** app on your phone
2. Tap **"Scan QR code"**
3. Scan the QR code from your terminal or browser
4. App will load on your phone!

**Option B: Enter URL Manually**
1. Note the URL shown in terminal (like: exp://192.168.x.x:8081)
2. Open Expo Go
3. Tap "Enter URL manually"
4. Type the URL
5. Tap "Connect"

### Step 5: Test the App

Once loaded:
- ✅ Create an account
- ✅ Login
- ✅ Add subjects
- ✅ Mark attendance
- ✅ Check if data syncs with backend

## Troubleshooting

### Can't scan QR code?
- Make sure phone and PC are on same WiFi
- Try using "Tunnel" mode: Press `s` in terminal, then select "Tunnel"

### App won't load?
- Check if backend is running: https://attendease-xu5m.onrender.com
- Restart Metro bundler: Press `r` in terminal
- Clear cache: Press `Shift + r` in terminal

### "Network request failed"?
- Check your WiFi connection
- Make sure API_URL in frontend/.env is correct
- Backend might be sleeping (first request takes 30-60 seconds)

## Development Commands

While the dev server is running, you can press:
- `r` - Reload app
- `m` - Toggle menu
- `s` - Switch connection type (LAN/Tunnel)
- `c` - Clear cache and reload
- `d` - Open developer menu on phone

## Making Changes

1. Edit any file in `frontend/` folder
2. Save the file
3. App will automatically reload on your phone (Fast Refresh)
4. See changes instantly!

## Backend API

Your app connects to: `https://attendease-xu5m.onrender.com/api`

API Endpoints:
- POST /api/auth/signup - Register
- POST /api/auth/login - Login
- GET /api/subjects - Get subjects
- POST /api/subjects - Create subject
- POST /api/subjects/:id/attendance - Mark attendance

## Current Configuration

✅ Backend: Production (Render.com)
✅ Frontend: Development (Expo Go)
✅ Database: Firebase Firestore
✅ Push Notifications: Firebase Cloud Messaging

## Switching Back to Production

When ready to build APK:
1. Stop development server (Ctrl+C)
2. Follow BUILD_APK_GUIDE.md
3. Use EAS Build to create APK

## Tips

- Keep terminal open while testing
- Phone and PC must stay on same WiFi
- Changes reflect instantly (no rebuild needed)
- Perfect for rapid development and testing
