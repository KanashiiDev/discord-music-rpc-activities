# <img align="center" src="https://raw.githubusercontent.com/KanashiiDev/discord-music-rpc/refs/heads/main/app/assets/icon/icon.png" alt="Extension Icon" width="48" height="48"> Web Presence - Contributing

This guide explains how to create, test, and submit an activity for a music or video website.

> [!IMPORTANT]
> Only activities exported via a **Userscript Manager** from Web Presence version **2.0.0** and later will be accepted.

---

## Activity Rules

These rules apply to all submitted activities. PRs that violate them will be closed without merge.

**Content**

- The activity must be for a website that streams or plays music/audio or video.
- Activities for illegal websites (e.g. piracy, drug marketplaces, CSAM) are not accepted.
- Activities for websites whose primary purpose is adult/nudity content are not accepted. If a platform incidentally contains such content, the activity must never display it - only song/video title, artist, and cover art are shown.

**Website requirements**

- The website must be publicly accessible.
- Activities for `.onion` domains or free/disposable domains (e.g. Freenom, `.tk`, `.rf`, `.gd`) are not accepted.

**Maintenance**

- If an activity no longer works and is not updated by its author or the community within a reasonable time, it will be removed from the repository.
- If you want to take over maintenance of an abandoned activity, fix it and open a PR - the original author will be credited in the file.

**Code & language**

- All activity metadata (name, description, comments) must be written in English.
- The exported `.js` file must come directly from the Userscript Manager. Hand-edited or manually written files are not accepted.

---

## Prerequisites

Before contributing, make sure you have:

- [Web Presence](https://github.com/KanashiiDev/web-presence) version 2.0.0 or later installed

If you haven't created an activity before, read the official guide first:

**[[Userscript Guide]](https://github.com/KanashiiDev/web-presence/wiki/Adding-a-New-Site#option-2---userscript-method)**

---

## Submitting a New Activity

### 1. Create your activity

Use the Userscript Manager inside Web Presence to create and configure your activity.

| Field         | Required | Notes                                                              |
| ------------- | -------- | ------------------------------------------------------------------ |
| Name          | ✓        | The name of the music/video site                                   |
| Domain        | ✓        | The site's domain (e.g. `music.example.com`)                       |
| Author        | ✓        | Your username                                                      |
| Authors Links |          | Link to your profile (e.g. GitHub)                                 |
| Category      | ✓        | `Radio`, `Platform`, `Aggregator`, `Video`, or `Other`             |
| Tags          |          | Comma-separated keywords related to the site (e.g. `anime, japan`) |
| Description   | ✓        | A short description of what the activity does                      |
| Version       | ✓        | Start at `1.0.0`; increment on every update                        |
| Homepage      |          | The URL that opens when the activity icon is clicked               |
| Activity Mode | ✓        | `Listening` or `Watching` - see below                              |

#### Activity Mode

Choose the mode that matches what the site is primarily used for.

**Listening** - for music platforms, radio stations, podcasts.

**Watching** - for video platforms. Note that in Watching mode, the source section is only visible when hovering over the activity cover in Discord. This is an RPC limitation, not a bug in your activity.

If you select Watching mode, you must also decide on **Auto Detect Video Status**:

- **Enable** (recommended) - the extension automatically detects playback state, elapsed time, and duration. You don't need to handle these manually in your script.
- **Disable** - use this only if auto detection does not work correctly on the target site.

---

### 2. Test thoroughly

Before submitting, verify that your activity works correctly on the target website:

- Songs/videos are detected correctly
- Artist, title, and cover art are populated
- Play/pause status updates in real time

---

### 3. Export the file

1. Open Web Presence → Userscript Manager
2. Find your activity in the scripts list
3. Click **Export** next to the activity
4. Save the downloaded `.js` file

> Do not submit partial code, copied snippets, or manually modified exports. Only the full exported `.js` file from the Userscript Manager is accepted.

---

### 4. Place the file in the correct folder

All activities live inside the `activities/` directory, organised by the **first letter of the website name** (not the domain):

```text
Spotify        → activities/S/
YouTube Music  → activities/Y/
```

---

### 5. Open a Pull Request

Once your file is in the right place, open a Pull Request against `main`. A maintainer will review it and may request changes.

---

## Updating an Existing Activity

If you're fixing a bug or adding support for something new in an activity that already exists:

1. Make your changes in the Userscript Manager
2. **Increment the version number** - PRs that modify an activity without bumping the version will not be accepted
3. Export the updated `.js` file
4. Replace the existing file in the repository
5. Open a Pull Request describing what changed

---

## Pull Request Checklist

Before submitting, confirm:

- [ ] The activity works correctly on the target website
- [ ] All required fields are filled in
- [ ] Activity Mode is set correctly (`Listening` or `Watching`)
- [ ] The version was incremented if you modified an existing activity
- [ ] The `.js` file was exported from the Userscript Manager - not written or edited by hand
- [ ] The file is placed in the correct `activities/<letter>/` folder

---

## Questions

If you're unsure about something, open an issue before submitting a PR. It's easier to clarify requirements upfront than to revise a submission after the review.
