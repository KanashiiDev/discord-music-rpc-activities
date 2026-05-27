registerParser({
  domain: ["animepahe.pw", "animepahe.com", "animepahe.org"],
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "animepahe",
  version: "1.0.0",
  description: "Animepahe lets you watch anime online with fast streaming servers.",
  mode: "watch",
  urlPatterns: [/\/play\//],
  iframeSelectors: { fields: { $video: { type: "video" } } },
  fn: async function () {
    const iframe = await getIframeData();
    const title = getText("#episodeMenu");
    const artist = getText("h1:nth-child(2) > a:nth-child(2)");
    const image = getImage(".anime-poster");
    const { duration, currentTime, playing } = iframe || {};

    return { title, artist, image, source: "animepahe", songUrl: location.href, timePassed: currentTime, duration, isPlaying: playing };
  },
});
