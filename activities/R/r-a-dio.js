registerParser({
  id: "kanashiidev_r-a-d.io_Lio",
  domain: "r-a-d.io",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "R/a/dio",
  version: "1.0.0",
  description: "Community-driven 24/7 online radio streaming anime and Japanese music with song requests.",
  category: "radio",
  tags: ["anime", "japan", "community"],
  urlPatterns: [/.*/],
  fn: function () {
    const isPlaying = Boolean(
      document.querySelector("#stream-play-pause")?.textContent.startsWith("Stop") ||
      navigator?.mediaSession?.playbackState === "playing" ||
      (document.querySelector("audio") && !document.querySelector("audio").paused),
    );

    const title = getText("#metadata");
    const artist = getText("#metadata");
    const image = getImage("div:nth-of-type(2)#content > section > div > div.is-desktop > div > img");
    const source = "R/a/dio";
    const songUrl = "https://r-a-d.io/";
    const timePassed = getText("#progress-current");
    const duration = getText("#progress-max");
  },
});
