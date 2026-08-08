registerParser({
  id: "kanashiidev_monochrome.tf_Lio",
  domain: "monochrome.tf",
  authors: "KanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Monochrome",
  version: "1.0.2",
  description: "",
  lastUpdated: "1786179237444",
  mode: "listen",
  watchAutoDetect: "disable",
  homepage: "",
  category: "platform",
  urlPatterns: [/.*/],
  fn: async function () {
    let title = getText('div.details > .title[ignore=".quality-badge"]');
    let artist = getText('div.details .artist-link');
    let image = getImage('.cover');
    let source = "Monochrome";
    let songUrl = "";
    let timePassed = getText('#current-time');
    let duration = getText('#total-duration');
    let buttons = [{ link: "", text: "" }, { link: "", text: "", }];
    let isPlaying = querySelectorDeep('div.buttons > .play-pause-btn path[d*=M6]');
  },
});