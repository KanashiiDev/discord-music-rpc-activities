registerParser({
  id: "kanashiidev_anison.fm_Lio",
  domain: ["anison.fm", "en.anison.fm", "cn.anison.fm"],
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "ANISON.FM",
  version: "1.0.0",
  description: "Online radio station specializing in anime openings, endings, and Japanese tracks.",
  category: "radio",
  tags: ["anime", "japan", "community"],
  urlPatterns: [/.*/],
  fn: function () {
    const titleText = getText(".player-wrapper .player-item .song-box__subtitle");
    if (titleText === "Отбивочка") return;

    const title = titleText;
    const artist = getText(".player-wrapper .player-item .song-box__title");
    const image = getImage(".player-wrapper .player-item .song-item__img--title")?.replace("poster/50/", "poster/200/");
    const source = "ANISON.FM";
    const songUrl = location.href;
    const isPlaying = document.querySelector("svg.song-play__start")?.classList.contains("hide");
    const duration = getText(".player-wrapper .player-item .song-item__time");
  },
});
