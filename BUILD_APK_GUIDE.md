# Build APK Guide - Multiple Methods

## Issue with Local Build

The local Gradle build is failing due to CMake configuration issues with native modules. This is a common issue with React Native/Expo projects on Windows.

## ✅ RECOMMENDED: Method 1 - EAS Build (Cloud Build)

This is Expo's official build service - builds your app in the cloud.

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
cd frontend
eas login
```
(Create a free account at expo.dev if you don't have one)

### Step 3: Configure Project
```bash
eas build:configure
```

### Step 4: Build APK
```bash
# For testing (faster, creates APK)
eas build --platform android --profile preview

# For production
eas build --platform android --profile production
```

### Step 5: Download APK
- Build will run in the cloud (takes 10-15 minutes)
- You'll get a link to download the APK
- Download and transfer to your phone

**Advantages:**
- No local build issues
- Professional build environment
- Free tier available (limited builds per month)
- Handles all native dependencies correctly

## Method 2 - Use Expo Go App (For Testing Only)

This is the fastest way to test your app without building an APK.

### Step 1: Install Expo Go on Phone
- Download "Expo Go" from Play Store

### Step 2: Start Development Server
```bash
cd frontend
npx expo start
```

### Step 3: Scan QR Code
- Scan the QR code with Expo Go app
- App will load directly

**Limitations:**
- Requires internet connection
- Can't test push notifications fully
- Not a standalone app

## Method 3 - Fix Local Build (Advanced)

If you want to fix the local build, try these steps:

### Option A: Build without CMake modules
Edit `frontend/android/gradle.properties` and add:
```properties
android.useAndroidX=true
android.enableJetifier=true
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

Then rebuild:
```bash
cd frontend/android
./gradlew clean
./gradlew assembleRelease --stacktrace
```

### Option B: Use older NDK version
Edit `frontend/android/build.gradle` and change NDK version:
```gradle
ndkVersion = "25.1.8937393"
```

Then rebuild.

### Option C: Disable problematic modules
If you don't need certain features, you can disable modules causing issues.

## Method 4 - Use Expo Application Services (Recommended for Production)

For production apps, use EAS:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build
eas build --platform android --profile production

# Submit to Play Store (optional)
eas submit --platform android
```

## Quick Comparison

| Method | Time | Difficulty | Cost | Best For |
|--------|------|------------|------|----------|
| EAS Build | 15 min | Easy | Free tier | Production |
| Expo Go | 2 min | Very Easy | Free | Quick testing |
| Local Build | 10 min | Hard | Free | Full control |

## My Recommendation

**For your case, use EAS Build:**

1. It's the official Expo solution
2. Avoids all local build issues
3. Free tier includes builds
4. Professional build environment
5. Easy to use

### Quick Start with EAS:
```bash
# Install
npm install -g eas-cli

# Go to frontend
cd frontend

# Login (create account if needed)
eas login

# Build APK
eas build --platform android --profile preview
```

The build will run in the cloud and give you a download link for the APK!

## Need Help?

If you encounter issues:
1. Check Expo documentation: https://docs.expo.dev/build/setup/
2. EAS Build docs: https://docs.expo.dev/build/introduction/
3. Expo forums: https://forums.expo.dev/

## Current Project Status

✅ Backend deployed: https://attendease-xu5m.onrender.com
✅ Frontend configured for production
✅ EAS configuration created (eas.json)
⏳ APK build pending (use EAS Build recommended)
