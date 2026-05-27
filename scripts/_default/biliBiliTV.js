registerParser({
  domain: "bilibili.tv",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "BiliBiliTV",
  version: "1.0.0",
  description: "Southeast Asia's leading ACG community where people can create, watch and share engaging videos.",
  mode: "watch",
  urlPatterns: [/\/(play|video)\//],
  iframeSelectors: { fields: { $video: { type: "video" } } },
  fn: async function () {
    const iframe = await getIframeData();
    const title = getText(".ep-item--active") || getText(".bstar-meta__title");
    const artist = getText("h1.bstar-meta__title > a") || getText(".bstar-meta-up-follow__nickName");
    const { duration, currentTime, playing } = iframe || {};

    return {
      title,
      artist,
      image: "https://p.bstarstatic.com/fe-lib/images/web/share-cover.png@500w_500h_1e_1c_1f.png",
      source: "BiliBiliTV",
      songUrl: location.href,
      timePassed: currentTime,
      duration,
      isPlaying: playing,
    };
  },
});
