registerParser({
  id: "kanashiidev_music.apple.com_Lio",
  domain: "music.apple.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Apple Music",
  version: "1.0.0",
  description: "Subscription-based music streaming service with on-demand playback, curated playlists, and Apple ecosystem integration.",
  lastUpdated: "1780094714721",
  mode: "listen",
  watchAutoDetect: "disable",
  homepage: "",
  category: "platform",
  tags: ["music"],
  urlPatterns: [/.*/],
  fn: async function () {
    //@world main
    // Old UI
    const lcd = document.querySelector("amp-lcd")?.shadowRoot;
    const oldTitle = lcd?.querySelector(".lcd-meta-line__string-container")?.innerText ?? "";
    const oldArtist = lcd?.querySelector(".lcd-meta__secondary .lcd-meta-line__text-content")?.textContent.split("—")[0].trim();
    const oldImage = lcd?.querySelector(".lcd__artwork-img")?.src;
    const oldTimes = lcd?.querySelectorAll(".lcd-progress__time");
    const oldIsPlaying = document.querySelector("amp-lcd .playback-play__play")?.ariaHidden === "true";
    const oldTimePassed = oldTimes?.[0]?.textContent?.trim();
    const oldDuration = oldTimes?.[1]?.textContent?.trim();

    // New UI
    const newUI = document.querySelector(".player-lcd");
    const newUITitle = newUI?.querySelectorAll("span[class*='text']")[0]?.textContent?.trim();
    const newUIArtist = newUI?.querySelectorAll("span[class*='text']")[2]?.textContent?.trim();
    const newUIImage = newUI?.querySelector(".player-lcd__artwork picture source")?.getAttribute("srcset").split(",")[1];
    const newUIIsPlaying = newUI?.querySelector(".playback-play__play")?.tabindex === "-1";
    const newUITimePassed = newUI?.querySelector("amp-playback-controls-progress")?.shadowRoot?.querySelector("time.time.elapsed")?.textContent?.trim();
    const newUIDuration = newUI?.querySelector("amp-playback-controls-progress")?.shadowRoot?.querySelector("time.time.remaining")?.textContent?.trim();

    // Window Data
    const windowData = window.MusicKit?.__dev?.info;
    const windowAudioPlayer = window.audioPlayer;
    const winIsPlaying = windowData?.isPlaying;
    const winTitle = windowData?.nowPlayingItem?.title;
    const winArtist = windowData?.nowPlayingItem?.attributes?.artistName;
    const winArtwork = windowData?.nowPlayingItem?.attributes?.artwork?.url.replace("{w}x{h}", "305x305");
    const winTimePassed = windowAudioPlayer?.audio?.currentTime;
    const winDuration = windowAudioPlayer?.audio?.duration;
    const winUrl = windowData?.nowPlayingItem?.attributes?.url || windowAudioPlayer?._nowPlayingItem?.attributes?.url;

    const title = winTitle || oldTitle || newUITitle;
    const artist = winArtist || oldArtist || newUIArtist;
    const image = winArtwork || oldImage || newUIImage;
    const isPlaying = winIsPlaying || oldIsPlaying || newUIIsPlaying;
    const source = "Apple Music";
    const songUrl = "https://www.music.apple.com/";
    const timePassed = winTimePassed || oldTimePassed || newUITimePassed;
    const duration = winDuration || oldDuration || newUIDuration;
  },
});
