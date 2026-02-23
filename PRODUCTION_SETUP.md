# Production Setup Guide

## Backend Deployment (Render.com)

### 1. Prerequisites
- GitHub repository with your code
- Render.com account (free tier available)
- Firebase project with Admin SDK credentials

### 2. Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `attendease-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Branch**: `main`

### 3. Set Environment Variables on Render

Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
JWT_SECRET=<generate-strong-secret-here>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_PRIVATE_KEY=<your-firebase-private-key>
FIREBASE_CLIENT_EMAIL=<your-firebase-client-email>
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Note your backend URL: `https://attendease-backend.onrender.com`

## Frontend Configuration

### 1. Update API URL

Update `frontend/.env`:
```env
API_URL=https://attendease-backend.onrender.com/api
```

### 2. Build Android APK

```bash
cd frontend
npx expo prebuild
cd android
./gradlew assembleRelease
```

The APK will be at: `frontend/android/app/build/outputs/apk/release/app-release.apk`

### 3. Build for Production (EAS Build)

For production builds with Expo:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile production
```

## Security Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Verify Firebase credentials are correct
- [ ] Update API_URL in frontend/.env to production backend
- [ ] Add backend/.env to .gitignore (already done)
- [ ] Add frontend/.env to .gitignore (already done)
- [ ] Enable HTTPS on backend (Render provides this automatically)
- [ ] Test all API endpoints after deployment
- [ ] Verify push notifications work in production

## Testing Production Setup

### Test Backend Health
```bash
curl https://attendease-backend.onrender.com/
```

Expected response:
```json
{"message": "AttendEase API is running"}
```

### Test Authentication
```bash
curl -X POST https://attendease-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

## Monitoring

- Check Render logs for errors: Dashboard → Your Service → Logs
- Monitor Firebase usage: Firebase Console → Usage
- Set up Render alerts for downtime

## Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- Verify Firebase credentials format (private key should include \n for newlines)
- Check Render logs for specific errors

### Frontend can't connect
- Verify API_URL is correct in frontend/.env
- Check CORS is enabled in backend (already configured)
- Test backend health endpoint directly

### Push notifications not working
- Verify google-services.json is in frontend/android/app/
- Check FCM tokens are being saved correctly
- Test notification sending from Firebase Console

## Cost Optimization

- Render free tier: Backend sleeps after 15 minutes of inactivity
- Consider upgrading to paid tier ($7/month) for always-on service
- Firebase free tier: 50K reads/day, 20K writes/day

## Next Steps

1. Deploy backend to Render
2. Update frontend API_URL
3. Build and test Android APK
4. Distribute APK or publish to Play Store
5. Monitor logs and usage
