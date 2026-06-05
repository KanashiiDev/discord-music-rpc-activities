registerParser({
  domain: "accuradio.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "AccuRadio",
  version: "1.0.0",
  description: "Free online radio platform with hundreds of curated music channels across genres.",
  category: "radio",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    const player = document.querySelector("#playerContents");
    if (!player) return null;

    const title = player.querySelector("#songtitle")?.textContent;
    const artist = player.querySelector("#songartist")?.textContent;
    const image = player.querySelector("#albumArtImg")?.src;
    const songUrl = player.querySelector("#playerName")?.href;
    const timeElem = player.querySelector("#progressWrapper")?.textContent;
    const isPlaying = Boolean(title && artist && document.querySelector("#playerPauseButton"));
    const source = "AccuRadio";
    const timePassed = timeElem;
    const duration = timeElem;
  },
});
