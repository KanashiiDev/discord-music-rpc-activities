registerParser({
  domain: ["anime.nexus"],
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Anime Nexus",
  version: "1.0.0",
  description: "Anime Nexus is your ultimate destination for discovering, streaming, and discussing all things anime.",
  mode: "watch",
  tags: ["anime"],
  mode: "watch",
  urlPatterns: [/\/watch\/.*/],
  iframeSelectors: { fields: { $video: { type: "video" } } },
  fn: async function () {
    const iframe = await getIframeData();
    const title = getText("[data-media-player] .flex.flex-col h2");
    const artist = getText("[data-media-player] .flex.flex-col h1");
    const image = getImage(".active img");
    const video = document.querySelector("[data-media-player] video");
    const source = "Anime Nexus";
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
