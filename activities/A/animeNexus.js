registerParser({
  id: "kanashiidev_anime.nexus_XC93YXRjaF",
  domain: "anime.nexus",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Anime Nexus",
  version: "1.0.1",
  description: "Anime Nexus is your ultimate destination for discovering, streaming, and discussing all things anime.",
  lastUpdated: "1780442979917",
  mode: "watch",
  watchAutoDetect: "enable",
  homepage: "",
  category: "video",
  tags: ["anime"],
  urlPatterns: [/\/watch\/.*/],
  iframeSelectors: {
    fields: {
      $video: {
        type: "video",
      },
    },
  },
  fn: async function () {
    const iframe = await getIframeData();
    const title = getText("[data-media-player].flex.flex-col h2") || getText("span.text-white.font-medium.text-sm.lg\:text-base.truncate:last-child");
    const artist = getText("[data-media-player].flex.flex-col h1") || getText("span.text-white.font-medium.text-sm.lg\:text-base.truncate:first-child");
    const image = document.querySelector("meta[property='og:image']")?.content || getImage(".active img") || "https://anime.nexus/apple-touch-icon.png";
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
