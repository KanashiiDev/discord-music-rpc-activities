registerParser({
  domain: "primevideo.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Amazon Prime Video",
  version: "1.0.0",
  description: "Stream popular movies, TV shows, sports, and live TV.",
  mode: "watch",
  urlPatterns: [/.*/],
  fn: function () {
    const title = getText(".atvwebplayersdk-episode-info");
    const artist = getText(".atvwebplayersdk-title-text");
    const image = document.querySelector("meta[property='og:image']")?.content || document.querySelector("[data-testid='title-art'] img")?.src;
    const video = document.querySelector("#dv-web-player video");
    const source = "Amazon Prime Video";
    const songUrl = location.href || "https://www.primevideo.com/";

    let timePassed = "";
    let duration = "";
    let isPlaying = 0;
    if (video) {
      isPlaying = !video.paused;
      timePassed = video.currentTime;
      duration = video.duration;
    }
  },
});
