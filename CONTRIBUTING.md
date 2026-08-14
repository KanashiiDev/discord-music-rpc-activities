# <img align="center" src="https://raw.githubusercontent.com/KanashiiDev/discord-music-rpc/refs/heads/main/app/assets/icon/icon.png" alt="Extension Icon" width="48" height="48"> Web Presence - Contributing

This guide explains how to create, test, and submit an activity for a music or video website.

> [!IMPORTANT]
> Only activities created via the **Userscript Manager** inside the Web Presence browser extension will be accepted. Manually written or hand-edited files are not accepted.

---

## Prerequisites

- [Web Presence](https://github.com/KanashiiDev/web-presence) version 3.1.0 or later installed

If you haven't created an activity before, read the official guide first:

**[[Userscript Guide]](https://github.com/KanashiiDev/web-presence/wiki/Adding-a-New-Website#option-2---userscript-method)**

---

## Activity Rules

These rules apply to all submitted activities. PRs that violate them will be closed without merge.

**Content**

- The activity must be for a website that streams or plays music/audio or video.
- Activities for illegal websites (e.g. piracy, drug marketplaces, CSAM) are not accepted.
- Activities for websites whose primary purpose is adult/nudity content are not accepted. If a platform incidentally contains such content, the activity must never display it; only song/video title, artist, and cover art are shown.

**Website requirements**

- The website must be publicly accessible.
- Activities for `.onion` domains or free/disposable domains (e.g. Freenom, `.tk`, `.rf`, `.gd`) are not accepted.

**Code & language**

- All activity metadata (name, description, comments) must be written in English.
- The activity file must be submitted directly through the Userscript Manager's built-in contribute feature. Hand-edited or manually written files are not accepted.

**Maintenance**

- If an activity no longer works and is not updated by its author or the community within a reasonable time, it will be removed from the repository.
- If you want to take over maintenance of an abandoned activity, fix it and submit a PR. The original author will be credited in the file.

---

## How to Submit an Activity

### Step 1 - Create your activity

Open Web Presence and navigate to **Userscript Manager**. Click **+ New Script** to create a new activity, or open an existing one to edit it.

Fill in all required fields:

| Field         | Required | Notes                                                  |
| ------------- | -------- | ------------------------------------------------------ |
| Name          | ✓        | The name of the music/video site                       |
| Domain        | ✓        | The site's domain (e.g. `music.example.com`)           |
| Category      | ✓        | `Radio`, `Platform`, `Aggregator`, `Video`, or `Other` |
| Tags          |          | Comma-separated keywords (e.g. `anime, japan`)         |
| Description   | ✓        | A short English description of what the activity does  |
| Version       | ✓        | Start at `1.0.0`; increment on every update            |
| Homepage      |          | URL that opens when the activity icon is clicked       |
| Activity Mode | ✓        | `Listening` or `Watching` - see below                  |

#### Activity Mode

Choose the mode that matches what the site is primarily used for.

**Listening** - for music platforms, radio stations, podcasts.

**Watching** - for video platforms. Note that in Watching mode, the source section is only visible when hovering over the activity cover in Discord. This is an RPC limitation, not a bug in your activity.

If you select Watching mode, you must also decide on **Auto Detect Video Status**:

- **Enable** (recommended) - the extension automatically detects playback state, elapsed time, and duration. You don't need to handle these manually in your script.
- **Disable** - use this if you can retrieve the video's playback data directly from the page, or if automatic detection doesn't work correctly on the target site.

---

### Step 2 - Test thoroughly

Before submitting, verify that your activity works correctly on the target website:

- Songs/videos are detected correctly
- Artist, title, and cover art are populated
- Play/pause status updates in real time

---

### Step 3 - Connect your GitHub account

You need to connect your GitHub account before you can submit. This is a one-time step.

In the Userscript Manager, click the **GitHub icon button** in the top-right corner of the header. A sign-in window will appear showing a short code and an **Open GitHub** button.

Click **Open GitHub to Authorize**. This takes you to `github.com` where you enter the code shown in the extension. Once you approve it, the extension detects the approval automatically and the window closes. Your GitHub username will appear on the button to confirm you're connected.

You don't need to create any tokens, copy-paste anything, or touch GitHub settings manually. The extension handles everything.

> If the code expires before you finish (a countdown timer is shown), close the window and try again. A new code will be generated.

---

### Step 4 - Submit your activity

In your script list, find the activity you want to submit and click the **GitHub (contribute) button** next to it.

The extension will:

1. Check whether this activity already exists in the repository and compare versions.
2. Show you a confirmation window with a summary of what will be submitted (name, version, domain, author, activity mode, and the file path where it will be placed).
3. If this is an update to an existing activity, show a comparison table so you can see what has changed.

Review the details, optionally edit the commit message, then click **Submit** (or **Submit Update** for existing activities).

The extension then handles everything automatically:

- Creates a fork of the repository under your GitHub account (if one doesn't exist yet)
- Syncs the fork with the latest upstream changes
- Creates a branch named `contribute/<normalized-script-name>` (spaces become underscores, special characters removed)
- Pushes the activity file to the correct location
- Opens a Pull Request against the main repository

When the process is complete, a link to your Pull Request is shown. Click it to view the PR on GitHub.

---

### Step 5 - Wait for review

Once your Pull Request is open, a maintainer will review it. They may leave comments or request changes. If changes are requested, update your activity in the Userscript Manager, increment the version number, and submit again using the same contribute button. The extension will update the existing PR automatically.

---

## Where Your File Gets Placed

The extension places your activity file automatically. Files are placed at:

```
activities/<LETTER>/<scriptId>.js
```

Where `<LETTER>` is the first character of your activity's name, uppercased (A-Z or 0-9). Names that start with a special character fall back to `#/`. For example:

```
Spotify        → activities/S/
YouTube Music  → activities/Y/
```

The filename is derived from your activity's name: spaces become underscores, special characters are removed. If the name is written in all caps, the entire filename is lowercased; otherwise only the first character is lowercased.

---

## Version Rules

- If the same version already exists in the repository, submission is blocked. You must increment the version first.
- If the version in an open PR is the same as or newer than what you're trying to submit, submission is blocked.
- If the activity is already up to date in the repository (same version, same content), no PR will be opened.

---

## Common Errors

**"Version is the same or outdated"** - The repository already has this version. Increment the version number (e.g. `1.0.0` to `1.0.1`) and try again.

**"Already up to date"** - The activity in the repository is identical to what you're submitting. No action is needed.

**"Authentication failed"** - Your GitHub connection has expired or been revoked. Click **Re-authenticate** in the error window to sign in again.

**"Fork is taking too long"** - GitHub is still initializing your fork. Click **Retry** after a few seconds.

**"Rate limit exceeded"** - GitHub has temporarily limited requests. Wait a moment and click **Retry**.

---

## Pull Request Checklist

- [ ] The activity works correctly on the target website
- [ ] All required fields are filled in
- [ ] Activity Mode is set correctly (`Listening` or `Watching`)
- [ ] The version was incremented if you modified an existing activity

---

## Questions

If you're unsure about something, open an issue before submitting a PR. It's easier to clarify requirements upfront than to revise a submission after the review.
