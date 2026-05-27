registerParser({
  domain: "r-a-d.io",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "R/a/dio",
  version: "1.0.0",
  description: "Community-driven 24/7 online radio streaming anime and Japanese music with song requests.",
  urlPatterns: [/.*/],
  fn: function () {
    const isPlaying = Boolean(
      document.querySelector("#stream-play-pause")?.textContent.startsWith("Stop") ||
      navigator?.mediaSession?.playbackState === "playing" ||
      (document.querySelector("audio") && !document.querySelector("audio").paused),
    );

    return {
      title: getText("#metadata"),
      artist: getText("#metadata"),
      image: getImage("div:nth-of-type(2)#content > section > div > div.is-desktop > div > img"),
      source: "R/a/dio",
      songUrl: "https://r-a-d.io/",
      timePassed: getText("#progress-current"),
      duration: getText("#progress-max"),
      isPlaying,
    };
  },
});
