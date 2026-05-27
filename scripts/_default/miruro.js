registerParser({
  domain: ["miruro.to", "miruro.tv", "miruro.online", "miruro.bz"],
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Miruro",
  version: "1.0.0",
  description: "Free anime streaming site with HD quality subbed and dubbed options.",
  mode: "watch",
  urlPatterns: [/\/watch\//],
  iframeSelectors: { fields: { $video: { type: "video" } } },
  fn: async function () {
    const iframe = await getIframeData();
    const title = getText(".ep-title");
    const artist = getText(".title");
    const image = getImage("._infoLink_ ._image_");
    const video = document.querySelector("[data-media-provider] video");
    const source = "Miruro";
    const songUrl = location.href;

    let { duration, currentTime, playing } = iframe || {};
    if (video && !duration) {
      playing = !video.paused;
      currentTime = video.currentTime;
      duration = video.duration;
    }
    const timePassed = currentTime;
    const isPlaying = playing;
  },
});
