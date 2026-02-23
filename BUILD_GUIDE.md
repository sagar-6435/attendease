# Android Build Guide

## Current Status

✅ Android SDK configured at: `C:\Users\kanda\AppData\Local\Android\Sdk`
✅ local.properties created
✅ Build started in background

## Build Process

The build is currently running. First-time builds take 5-10 minutes because:
1. Gradle downloads all dependencies (~500MB+)
2. Android SDK downloads NDK if needed
3. Compiles all React Native and Expo modules
4. Generates release APK

## Check Build Status

You can monitor the build progress in your terminal or check the output.

## After Build Completes

The APK will be located at:
```
frontend/android/app/build/outputs/apk/release/app-release.apk
```

## Install APK on Device

### Via USB:
```bash
adb install frontend/android/app/build/outputs/apk/release/app-release.apk
```

### Via File Transfer:
1. Copy `app-release.apk` to your phone
2. Open the file on your phone
3. Allow installation from unknown sources if prompted
4. Install the app

## Testing Checklist

After installing:
- [ ] App opens successfully
- [ ] Can create account / login
- [ ] Can add subjects
- [ ] Can mark attendance
- [ ] Push notifications work
- [ ] Data syncs with backend

## Troubleshooting

### Build fails with "SDK not found"
- Verify Android SDK is installed
- Check `local.properties` has correct path

### Build fails with memory error
- Increase Gradle memory in `gradle.properties`:
  ```
  org.gradle.jvmargs=-Xmx4096m
  ```

### APK won't install
- Enable "Install from Unknown Sources" in Android settings
- Check if you have enough storage space

## Production Signing (Optional)

For Play Store release, you'll need to sign the APK:

1. Generate keystore:
```bash
keytool -genkey -v -keystore attendease-release.keystore -alias attendease -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/app/build.gradle` with signing config

3. Build signed APK:
```bash
./gradlew assembleRelease
```

## Next Steps

1. Wait for build to complete (check terminal)
2. Locate the APK file
3. Install on test device
4. Test all features
5. Share with users or publish to Play Store
