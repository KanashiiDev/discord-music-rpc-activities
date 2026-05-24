registerParser({
  domain: "anizm.net",
  authors: "kanashiiDev",
  authorsLinks: "",
  title: "anizm",
  version: "1.0.1",
  description: "parser for anizm",
  lastUpdated: "1779450900084",
  mode: "watch",
  watchAutoDetect: "enable",
  homepage: "",
  urlPatterns: [/.*/],
  fn: function () {
    let title = getText("h1.anizm_pageTitle > span");
    let artist = getText("#pageContent a");
    let image = "";
    let source = "anizm";
    let songUrl = "";
    let timePassed = null;
    let duration = null;
    let buttons = [
      { link: "https://anison.fm/user/100542", text: "test" },
      { link: "https://anison.fm/user/100543", text: "test2" },
    ];

    return {
      title,
      artist,
      image,
      source,
      songUrl,
      duration,
      timePassed,
      buttons,
    };
  },
});
