registerParser({
  domain: "j1fm.tokyo",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "J1FM",
  version: "1.0.0",
  description: "Online radio playing Japanese pop hits and related music.",
  homepage: "https://www.j1fm.tokyo/player/j1hits/",
  category: "radio",
  tags: ["japan"],
  urlPatterns: [/player.*/],
  fn: function () {
    const title = getText("strong[data-station-metadata-target=playBarSecondaryTitle]");
    const artist = getText("span[data-station-metadata-target=playBarSecondarySubtitle]");
    const image = getImage("img[data-station-metadata-target=playBarSecondaryImage]");
    const source = getText('strong[data-player-target="playBarPrimaryTitle"]') || "J1FM";
    const songUrl = location.href;
    const isPlaying = Boolean(document.querySelector("[data-player-target='playBarPlayButton']")?.ariaLabel === "Stop" || document.querySelector("use[href='#icon-stop']"));
  },
});
