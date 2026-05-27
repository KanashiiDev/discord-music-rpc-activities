registerParser({
  domain: ["animetsu.cc", "animetsu.bz", "animetsu.live"],
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Animetsu",
  version: "1.0.0",
  description: "Animetsu is a free anime streaming site where you can watch anime in HD quality.",
  mode: "watch",
  urlPatterns: [/\/watch\//],
  iframeSelectors: { fields: { $video: { type: "video" } } },
  fn: async function () {
    const iframe = await getIframeData();
    const fullTitle = getText("head > title");
    const title = fullTitle.split("-")[0].trim();
    const artist = fullTitle.split("-")[1].trim();
    const image = getImage(`a[title='${artist}'] img`);
    const video = document.querySelector("[data-media-player] video");

    let { duration, currentTime, playing } = iframe || {};
    if (video && !duration) {
      playing = !video.paused;
      currentTime = video.currentTime;
      duration = video.duration;
    }

    return { title, artist, image, source: "Animetsu", songUrl: location.href, timePassed: currentTime, duration, isPlaying: playing };
  },
});
