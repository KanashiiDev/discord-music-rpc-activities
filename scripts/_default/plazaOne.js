registerParser({
  domain: "plaza.one",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Nightwave Plaza",
  version: "1.0.0",
  description: "24/7 online radio focused on vaporwave and retro aesthetic music.",
  urlPatterns: [/.*/],
  fn: function () {
    const timeElem = getText(".player-time");
    return {
      title: getText(".track-title"),
      artist: getText(".track-artist"),
      image: getImage(".cover img"),
      source: "Nightwave Plaza",
      songUrl: "https://plaza.one/",
      timePassed: timeElem,
      duration: timeElem,
      isPlaying: Boolean(document.querySelector(".col-3") || navigator?.mediaSession?.playbackState === "playing"),
    };
  },
});
