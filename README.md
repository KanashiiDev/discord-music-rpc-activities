# <img align="center" src="https://raw.githubusercontent.com/KanashiiDev/discord-music-rpc/refs/heads/main/app/assets/icon/icon.png" alt="Extension Icon" width="48" height="48"> Discord Music RPC - Activities

This repository contains community-created activities for Discord Music RPC.

If a music website is not supported yet, you can create a new activity using the Userscript Manager and submit it to this repository so everyone can use it.

---

## Step 1: Create an Activity

Activities are userscript files that are created and edited through the Discord Music RPC Userscript Manager.

**Follow the official guide:** https://github.com/KanashiiDev/discord-music-rpc/wiki/Adding-a-New-Music-Site#option-2---userscript-method

---

## Step 2: Test Your Activity

Before submitting your activity, make sure it works correctly on the target website.

**Verify that:**

- Songs are detected correctly
- Artist, title, and cover art are detected correctly
- Play/Pause status updates correctly

---

## Step 3: Export Your Activity

Once your activity is working:

1. Open Discord Music RPC - Userscript Manager
2. Export the activity
3. Save the exported `.js` file

Do not copy only parts of the code. Submit the complete exported activity file.

---

## Step 4: Place the File in the Correct Folder

All activities are stored inside the `activities` directory.

Choose the folder that matches the first letter of the website name.

Examples:

```text
Spotify        → activities/S/
YouTube Music  → activities/Y/
Bandcamp       → activities/B/
Deezer         → activities/D/
```

---

## Required Metadata

**Your activity must include the following metadata:**

- Name
- Domain
- Author
- Version
- Category
- Description

These fields can be configured in the Userscript Manager.

---

## Versioning

Every time you update an activity, increase its version number.

**Example:**

```javascript
1.0.0
```

**After a change:**

```javascript
1.0.1
```

### Why is this important?

Discord Music RPC uses activity versions to determine whether users should receive updates. If the version number is not increased, your changes may not be delivered to existing users.

---

## Before Opening a Pull Request

Make sure that:

- Your activity works correctly
- The metadata is present and accurate
- The version number was increased if you modified an existing activity
- The file is located in the correct `activities` folder
- The file is the exported version from the Userscript Manager

---

## Submit Your Pull Request

Once everything is ready, open a Pull Request and wait for review.

Thank you for helping expand activity support for Discord Music RPC.
