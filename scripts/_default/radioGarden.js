registerParser({
  domain: "radio.garden",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Radio Garden",
  version: "1.0.0",
  description: "Interactive globe for exploring live radio stations worldwide.",
  urlPatterns: [/.*/],
  fn: function () {
    const root = document.querySelector("div[class*='_channelTitle_']");
    return {
      title: root?.querySelector("[class*='_title_']")?.textContent,
      artist: root?.querySelector("[class*='_subtitle_']")?.textContent,
      image: "https://radio.garden/icons/icon_60pt@2x.png",
      source: "Radio Garden",
      songUrl: "https://radio.garden",
      isPlaying: Boolean(document.querySelector("button[aria-label='stop']") || document.querySelector("[data-player='playing']")),
    };
  },
});
