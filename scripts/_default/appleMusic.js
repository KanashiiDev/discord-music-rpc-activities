registerParser({
  domain: "music.apple.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Apple Music",
  version: "1.0.0",
  description: "Subscription-based music streaming service with on-demand playback, curated playlists, and Apple ecosystem integration.",
  category: "platform",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    const lcd = document.querySelector("amp-lcd")?.shadowRoot;
    const title = lcd?.querySelector(".lcd-meta-line__string-container")?.innerText ?? "";
    const artist = lcd?.querySelector(".lcd-meta__secondary .lcd-meta-line__text-content")?.innerText.split("—")[0].trim();
    const image = lcd?.querySelector(".lcd__artwork-img")?.src;
    const times = lcd?.querySelectorAll(".lcd-progress__time");
    const isPlaying = document.querySelector("amp-lcd .playback-play__play")?.ariaHidden === "true";
    const source = "Apple Music";
    const songUrl = "https://www.music.apple.com/";
    const timePassed = times?.[0]?.textContent?.trim() ?? "0";
    const duration = times?.[1]?.textContent?.trim() ?? "0";
  },
});
