registerParser({
  id: "kanashiidev_animepahe.pw_XC9wbGF5XC",
  domain: ["animepahe.pw", "animepahe.com", "animepahe.org"],
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "animepahe",
  version: "1.0.1",
  description: "Animepahe lets you watch anime online with fast streaming servers.",
  mode: "watch",
  category: "video",
  tags: ["anime"],
  mode: "watch",
  urlPatterns: [/\/play\/.*/],
  iframeSelectors: { fields: { $video: { type: "video" } } },
  fn: async function () {
    const iframe = await getIframeData();
    const title = getText("#episodeMenu");
    const artist = getText("h1:nth-child(2) > a:nth-child(2)");
    const image = "https://www.google.com/s2/favicons?domain=animepahe.pw&sz=128";
    const source = "animepahe";
    const songUrl = location.href;
    const { duration, currentTime, playing } = iframe || {};
    const timePassed = currentTime;
    const isPlaying = playing;
  },
});
