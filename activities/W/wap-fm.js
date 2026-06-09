registerParser({
  id: "kanashiidev_radio.wapchan.org_cHVibGljXC",
  domain: "radio.wapchan.org",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "wap-fm",
  version: "1.0.0",
  description: "Community-run online radio on the Wapchan anime/manga forum.",
  homepage: "https://radio.wapchan.org/public/wapfm",
  category: "radio",
  tags: ["anime", "community"],
  urlPatterns: [/public\/wapfm/],
  fn: function () {
    const isPlaying = Boolean(document.querySelector(".radio-control-play-button > svg > path")?.getAttribute("d")?.startsWith("M324") || document.querySelector(".radio-player-widget > audio"));

    const title = getText(".now-playing-title");
    const artist = getText(".now-playing-artist");
    const image = getImage("img.album_art");
    const timePassed = getText(".time-display-played");
    const duration = getText(".time-display-total");
    const source = "wap-fm";
    const songUrl = "https://radio.wapchan.org/public/wapfm";
  },
});
