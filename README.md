# <img align="center" src="https://raw.githubusercontent.com/KanashiiDev/discord-music-rpc/refs/heads/main/app/assets/icon/icon.png" alt="Extension Icon" width="48" height="48"> Discord Music RPC - Activities

This repository contains community-created activities for [Discord Music RPC](https://github.com/KanashiiDev/discord-music-rpc).

If a music website is not supported yet, you can create a new activity using the Userscript Manager and submit it to this repository so everyone can use it.

## How to Create and Submit an Activity

### 1. Create an Activity

Activities are userscript files that are created and edited through the Discord Music RPC Userscript Manager.

**Follow the official guide: [[Userscript Guide]](https://github.com/KanashiiDev/discord-music-rpc/wiki/Adding-a-New-Music-Site#option-2---userscript-method)**

**Your activity must include:**

- Name
- Domain
- Author
- Category
- Description
- Version **(Must be incremented on every update)**

---

### 2. Test Your Activity

Before submitting your activity, make sure it works correctly on the target website.

**Verify that:**

- Songs are detected correctly
- Artist, title, and cover art are detected correctly
- Play/Pause status updates correctly

---

### 3. Export Your Activity

**Once your activity is working:**

1. Open Discord Music RPC - Userscript Manager
2. Locate your activity in the scripts list
3. Click the **Export** button next to that activity
4. The `.js` file will be downloaded automatically

> Do not submit partial code, copied snippets, or manually modified exports. Only the full exported `.js` file from the Userscript Manager is accepted.

---

### 4. Place the File in the Correct Folder in this Repo

All activities must be placed inside the `activities` directory in this repository.

Each activity should be stored in a folder based on the **first letter of the website name (not the domain)**.

Choose the correct folder accordingly:

```text
Spotify        → activities/S/
YouTube Music  → activities/Y/
```

## Before Opening a Pull Request

Make sure that:

- Your activity works correctly
- The version number was increased if you modified an existing activity
- The file is located in the correct `activities` folder

## Submit Your Pull Request

Once everything is ready, open a Pull Request and wait for review.

Thank you for helping expand activity support for Discord Music RPC.
