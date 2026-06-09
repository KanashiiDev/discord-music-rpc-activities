registerParser({
  id: "kanashiidev_radio.garden_Lio",
  domain: "radio.garden",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Radio Garden",
  version: "1.0.0",
  description: "Interactive globe for exploring live radio stations worldwide.",
  category: "aggregator",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    const root = document.querySelector("div[class*='_channelTitle_']");
    const title = root?.querySelector("[class*='_title_']")?.textContent;
    const artist = root?.querySelector("[class*='_subtitle_']")?.textContent;
    const image = "https://radio.garden/icons/icon_60pt@2x.png";
    const source = "Radio Garden";
    const songUrl = "https://radio.garden";
    const isPlaying = Boolean(document.querySelector("button[aria-label='stop']") || document.querySelector("[data-player='playing']"));
  },
});
