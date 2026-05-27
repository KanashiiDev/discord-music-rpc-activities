registerParser({
  domain: "youtube.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "YouTube",
  version: "1.0.0",
  description: "Video-sharing platform hosting music, live streams, and other content.",
  mode: "watch",
  urlPatterns: [/.*/],
  fn: function () {
    if (location.pathname.includes("shorts")) return;

    const url = window.location.href;
    const title = getText("#title > h1 > yt-formatted-string");
    const artist = getText("#upload-info #text > a");
    const video = document.querySelector("video");
    const isLive = Boolean(document.querySelector("button.ytp-live-badge")?.offsetParent);
    const source = "YouTube";
    const songUrl = url;
    const vid = url && new URL(url).searchParams.get("v");
    const image = vid ? `https://i.ytimg.com/vi/${vid}/mqdefault.jpg` : null;

    let timePassed = "";
    let duration = "";
    let isWatching = 0;
    if (video) {
      isWatching = !video.paused;
      timePassed = isLive ? "" : video.currentTime;
      duration = isLive ? "" : video.duration;
    }
    const isPlaying = isWatching || Boolean(document.querySelector(".ytp-left-controls > button > svg > path")?.getAttribute("d").startsWith("M 12"));
  },
});
