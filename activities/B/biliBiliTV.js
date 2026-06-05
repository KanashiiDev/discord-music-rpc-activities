registerParser({
  domain: "bilibili.tv",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "BiliBiliTV",
  version: "1.0.0",
  description: "Southeast Asia's leading ACG community where people can create, watch and share engaging videos.",
  category: "video",
  tags: ["anime"],
  mode: "watch",
  urlPatterns: [/.*/],
  iframeSelectors: { fields: { $video: { type: "video" } } },
  fn: async function () {
    if (!/\/(play|video)\/.*/.test(location.pathname)) return;
    const iframe = await getIframeData();
    const title = getText(".ep-item--active") || getText(".bstar-meta__title");
    const artist = getText("h1.bstar-meta__title > a") || getText(".bstar-meta-up-follow__nickName");
    const image = "https://p.bstarstatic.com/fe-lib/images/web/share-cover.png@500w_500h_1e_1c_1f.png";
    const source = "BiliBiliTV";
    const songUrl = location.href;
    const { duration, currentTime, playing } = iframe || {};
    const timePassed = currentTime;
    const isPlaying = playing;
  },
});
