registerParser({
  id: "kanashiidev_kick.com_XC8uKg",
  domain: "kick.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Kick",
  version: "1.0.1",
  description: "Kick is a streaming platform that makes it easy for you to find and watch your favorite content.",
  mode: "watch",
  category: "platform",
  tags: ["streaming"],
  urlPatterns: [/\/.*/],
  fn: function () {
    const title = getText("[data-testid='livestream-title']");
    const artist = getText("#channel-username");
    const image = getImage("div:nth-child(1) > #channel-avatar") || "https://www.google.com/s2/favicons?domain=kick.com&size=64";
    const video = document.querySelector("video");
    const rawCurrentTime = video?.currentTime;
    const rawDuration = video?.duration;
    const currentTime = Number.isFinite(rawCurrentTime) ? rawCurrentTime : 0;
    const duration = Number.isFinite(rawDuration) && rawDuration >= 2 ? rawDuration : 0;
    const isPlaying = (!video?.paused && currentTime > 0) || Boolean(document.querySelector("path[d='M4.9,28.9h7.4V3.1H4.9V28.9z M19.7,3.1v25.8h7.4V3.1H19.7z']"));
    const source = "Kick";
    const songUrl = location.href;
    const timePassed = currentTime;
  },
});
