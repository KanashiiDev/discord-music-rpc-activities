registerParser({
  id: "kanashiidev_tunein.com_Lio",
  domain: "tunein.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "TuneIn",
  version: "1.0.0",
  description: "Aggregator for live radio, music streams, podcasts, and news audio.",
  category: "aggregator",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    const title = getText("#playerTitle");
    const sourceTitle = getText("#playerSubtitle") ?? "TuneIn";
    const sourceUrl = document.querySelector('a[class*="nowPlaying-module__link"]')?.href || "https://tunein.com";
    const artist = title;
    const image = getImage("#playerArtwork");
    const source = sourceTitle;
    const songUrl = sourceUrl;
    const isPlaying = Boolean(document.querySelector("svg[data-testid='player-status-playing']"));
  },
});
