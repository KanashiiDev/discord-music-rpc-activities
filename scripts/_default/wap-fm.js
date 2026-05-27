registerParser({
  domain: "radio.wapchan.org",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "wap-fm",
  version: "1.0.0",
  description: "Community-run online radio on the Wapchan anime/manga forum.",
  homepage: "https://radio.wapchan.org/public/wapfm",
  urlPatterns: [/public\/wapfm/],
  fn: function () {
    const isPlaying = Boolean(document.querySelector(".radio-control-play-button > svg > path")?.getAttribute("d")?.startsWith("M324") || document.querySelector(".radio-player-widget > audio"));

    return {
      title: getText(".now-playing-title"),
      artist: getText(".now-playing-artist"),
      image: getImage("img.album_art"),
      timePassed: getText(".time-display-played"),
      duration: getText(".time-display-total"),
      source: "wap-fm",
      songUrl: "https://radio.wapchan.org/public/wapfm",
      isPlaying,
    };
  },
});
