registerParser({
  domain: "music.amazon.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Amazon Music",
  version: "1.0.0",
  description: "On-demand music streaming service with songs, playlists, and integrated podcasts.",
  urlPatterns: [/.*/],
  fn: function () {
    const main = document.querySelector("music-horizontal-item")?.shadowRoot;
    const title = getText("music-link", { root: main });
    const artist = getText("music-link[kind='secondary']", { root: main });
    const image = getText("music-image", { root: main, attr: "src", transform: (v) => v.replace(/\.jpg$/, "._SX160_SY160_.jpg") });
    const songUrl = main?.querySelector("music-link a")?.href;
    const times = document.querySelector("#progress-container")?.getAttribute("aria-valuetext").split("/");
    const [timePassed = "", remaining = ""] = times ? times : [];

    return {
      title,
      artist,
      image,
      source: "Amazon Music",
      songUrl: songUrl || "https://www.music.amazon.com/",
      timePassed,
      duration: remaining,
      isPlaying: Boolean(main?.querySelector("button[aria-label='Pause']")),
    };
  },
});
