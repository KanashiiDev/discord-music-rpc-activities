registerParser({
  id: "kanashiidev_basic.pp.ua_Lio",
  domain: "basic.pp.ua",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Sasalele Music Station",
  version: "1.0.0",
  description: "Curated directory for hundreds of music radio streams.",
  category: "aggregator",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    const meta = getText("#metadataDisplay").split(" - ");
    let artist = meta[0] || "";
    let title = meta[1] || "";
    let image = getImage(".playing-info #ip");
    let stationName = getText(".playing-info #nowPlaying .homepagelink") || "Sasalele Music Station";
    const stationLink = document.querySelector(".playing-info #nowPlaying .homepagelink")?.getAttribute("href") || "";

    if (!title) {
      title = stationName || "Listening..";
      stationName = "Sasalele Music Station";
    }

    const badArtist = ["Visit radio's homepage for playing info", "Stream not active", "Unknown", "Loading..."];
    if (badArtist.includes(artist)) artist = "-1";
    if (/\.webp(\?.*)?$/i.test(image)) image = "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://basic.pp.ua&size=180";

    const source = stationName;
    const songUrl = stationLink;
    const buttons = [{ link: "https://basic.pp.ua/", text: "Sasalele Music Station" }];
    const isPlaying = Boolean(document.querySelector("#media-controller > media-control-bar > media-play-button[aria-label='pause']"));
  },
});
