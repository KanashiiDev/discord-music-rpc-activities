registerParser({
  domain: ["anison.fm", "en.anison.fm", "cn.anison.fm"],
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "ANISON.FM",
  version: "1.0.0",
  description: "Online radio station specializing in anime openings, endings, and Japanese tracks.",
  urlPatterns: [/.*/],
  fn: function () {
    const titleText = getText(".player-wrapper .player-item .song-box__subtitle");
    if (titleText === "Отбивочка") return;

    return {
      title: titleText,
      artist: getText(".player-wrapper .player-item .song-box__title"),
      image: getImage(".player-wrapper .player-item .song-item__img--title")?.replace("poster/50/", "poster/200/"),
      source: "ANISON.FM",
      songUrl: location.href,
      isPlaying: document.querySelector("svg.song-play__start")?.classList.contains("hide"),
      duration: getText(".player-wrapper .player-item .song-item__time"),
    };
  },
});
