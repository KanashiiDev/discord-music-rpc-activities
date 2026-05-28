registerParser({
  domain: "twitch.tv",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Twitch",
  version: "1.0.0",
  description: "Twitch is an interactive livestreaming service for content spanning gaming, entertainment, sports, music, and more.",
  category: "platform",
  tags: ["streaming"],
  mode: "watch",
  urlPatterns: [/\/\w+/],
  fn: function () {
    const title = getText("#live-channel-stream-information [data-a-target='stream-title']");
    const artist = getText("#live-channel-stream-information h1.tw-title");
    const image = getImage("#live-channel-stream-information")?.replace(/-\d{1,2}x\d{1,2}/, "-300x300") || "https://www.twitch.tv/favicon.ico";
    const video = document.querySelector("video");
    const currentTime = Number.isFinite(video?.currentTime) && video.currentTime > 0 ? video.currentTime : 0;
    const duration = Number.isFinite(video?.duration) && video.duration > 0 ? video.duration : 0;
    const isPlaying = (!video?.paused && currentTime > 0) || Boolean(document.querySelector("[data-a-player-state='playing']"));
    const source = "Twitch";
    const songUrl = location.href;
    const timePassed = currentTime;
  },
});
