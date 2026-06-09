registerParser({
  id: "kanashiidev_music.amazon.com_Lio",
  domain: "music.amazon.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Amazon Music",
  version: "1.0.0",
  description: "On-demand music streaming service with songs, playlists, and integrated podcasts.",
  category: "platform",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    const main = document.querySelector("music-horizontal-item")?.shadowRoot;
    const title = getText("music-link", { root: main });
    const artist = getText("music-link[kind='secondary']", { root: main });
    const image = getText("music-image", { root: main, attr: "src", transform: (v) => v.replace(/\.jpg$/, "._SX160_SY160_.jpg") });
    const songUrl = main?.querySelector("music-link a")?.href || "https://www.music.amazon.com/";
    const times = document.querySelector("#progress-container")?.getAttribute("aria-valuetext").split("/");
    const timePassed = times ? times[0] : "";
    const duration = times ? times[1] : "";
    const isPlaying = Boolean(main?.querySelector("button[aria-label='Pause']"));
    const source = "Amazon Music";
  },
});
