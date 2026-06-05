registerParser({
  domain: "youtube.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "YouTube",
  version: "1.0.0",
  description: "Video-sharing platform hosting music, live streams, and other content.",
  category: ["video", "platform"],
  tags: [],
  mode: "watch",
  urlPatterns: [/.*/],
  fn: function () {
    if (location.pathname.includes("shorts")) return;

    const url = window.location.href;
    const jsonEl = document.querySelector(".playerMicroformatRendererHost")?.textContent;
    const jsonData = jsonEl ? JSON.parse(jsonEl) : null;
    const title = getText("#title > h1 > yt-formatted-string") || jsonData?.name;
    const artist = getText("#upload-info #text > a") || jsonData?.author;
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
