# How to Transfer APK to Your Mobile

## Method 1: USB Cable (Fastest)

### Step 1: Enable USB Debugging on Phone
1. Go to **Settings** → **About Phone**
2. Tap **Build Number** 7 times to enable Developer Options
3. Go back to **Settings** → **Developer Options**
4. Enable **USB Debugging**

### Step 2: Connect Phone to PC
1. Connect your phone via USB cable
2. On phone, allow USB debugging when prompted
3. Select "File Transfer" mode

### Step 3: Install APK
```bash
# Check if device is connected
adb devices

# Install the APK
adb install frontend/android/app/build/outputs/apk/release/app-release.apk
```

## Method 2: Email (Simple)

1. Locate the APK file:
   ```
   C:\attendease\attendance-tracker-app\frontend\android\app\build\outputs\apk\release\app-release.apk
   ```

2. Email it to yourself

3. Open email on your phone

4. Download the APK

5. Tap to install (you may need to enable "Install from Unknown Sources")

## Method 3: Cloud Storage (Google Drive, Dropbox, etc.)

1. Upload APK to Google Drive/Dropbox from PC

2. Open Drive/Dropbox app on phone

3. Download the APK

4. Tap to install

## Method 4: Direct File Transfer

### Using Windows:
1. Connect phone via USB
2. Open File Explorer
3. Navigate to your phone's storage
4. Copy APK to phone's **Downloads** folder
5. On phone, open **Files** app
6. Navigate to **Downloads**
7. Tap the APK to install

## Method 5: WhatsApp/Telegram (Quick)

1. Send APK file to yourself on WhatsApp/Telegram
2. Download on phone
3. Tap to install

## Installing the APK on Android

### First Time Installation:
1. Tap the downloaded APK file
2. You'll see "Install blocked" message
3. Tap **Settings**
4. Enable **Allow from this source**
5. Go back and tap **Install**
6. Wait for installation
7. Tap **Open** to launch the app

### Security Settings:
- **Android 8+**: Settings → Apps → Special Access → Install Unknown Apps → Enable for your file manager
- **Android 7 and below**: Settings → Security → Unknown Sources → Enable

## Verify Installation

After installing:
1. Open the app
2. Check if it connects to: `https://attendease-xu5m.onrender.com`
3. Try creating an account
4. Test all features

## Troubleshooting

### "App not installed" error
- Make sure you have enough storage space
- Uninstall any previous version first
- Try restarting your phone

### "Parse error"
- APK might be corrupted during transfer
- Try transferring again
- Make sure build completed successfully

### Can't find APK after download
- Check **Downloads** folder
- Check **File Manager** → **Downloads**
- Some browsers save to different locations

## APK Location on PC

```
C:\attendease\attendance-tracker-app\frontend\android\app\build\outputs\apk\release\app-release.apk
```

File size: ~50-80 MB (approximately)

## Sharing with Others

Once you've tested the app, you can share the same APK file with other users using any of the methods above.

## Note

This is an unsigned APK for testing. For Play Store distribution, you'll need to sign it with a release keystore.
