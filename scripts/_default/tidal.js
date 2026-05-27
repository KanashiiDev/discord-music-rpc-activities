registerParser({
  domain: "tidal.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Tidal",
  version: "1.0.0",
  description: "High-fidelity on-demand music streaming service.",
  urlPatterns: [/.*/],
  fn: function () {
    const main = document.querySelector("[data-test='footer-player']");
    const title = main?.querySelector("[data-test='footer-track-title']")?.innerText ?? "";
    const artist = main?.querySelector("[data-test='grid-item-detail-text-title-artist']")?.innerText.trim();
    const image = main?.querySelector("div.image img")?.src;
    const musicLink = main?.querySelector("[data-test='footer-track-title'] a")?.href ?? "";
    const times = main?.querySelector("[data-test='play-controls']").parentElement;
    const source = "Tidal";
    const songUrl = musicLink || "https://www.tidal.com/";
    const timePassed = times?.querySelector("[data-test='current-time']")?.textContent ?? "";
    const duration = times?.querySelector("[data-test='duration']")?.textContent ?? "";
    const isPlaying = Boolean(document.querySelector("button[data-test='pause']"));
  },
});
