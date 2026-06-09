registerParser({
  id: "kanashiidev_plaza.one_Lio",
  domain: "plaza.one",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Nightwave Plaza",
  version: "1.0.0",
  description: "24/7 online radio focused on vaporwave and retro aesthetic music.",
  category: "radio",
  tags: ["vaporwave", "retro"],
  urlPatterns: [/.*/],
  fn: function () {
    const timeElem = getText(".player-time");
    const title = getText(".track-title");
    const artist = getText(".track-artist");
    const image = getImage(".cover");
    const source = "Nightwave Plaza";
    const songUrl = "https://plaza.one/";
    const timePassed = timeElem;
    const duration = timeElem;
    const isPlaying = Boolean(document.querySelector(".col-3") || navigator?.mediaSession?.playbackState === "playing");
  },
});
