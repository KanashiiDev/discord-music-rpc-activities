registerParser({
  id: "kanashiidev_radio.net_Lio",
  domain: "radio.net",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "radio.net",
  version: "1.0.0",
  description: "Large aggregator providing access to thousands of global radio stations.",
  category: "aggregator",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    function getStemFromUrl(input) {
      if (typeof input !== "string") return "";
      let url;
      try {
        url = new URL(input, "http://dummy-base");
      } catch {
        return "";
      }
      const segments = url.pathname.split("/").filter(Boolean);
      if (!segments.length) return "";
      const last = segments[segments.length - 1];
      const dot = last.lastIndexOf(".");
      return decodeURIComponent(dot > 0 ? last.slice(0, dot) : last);
    }

    const root = document.querySelector("[data-testid='player-display-area']");
    let title = root?.querySelector("[data-testid='status-display']")?.textContent;
    let artist = root?.querySelector("[data-testid='status-display']")?.textContent;
    const image = document.querySelector("[data-testid='logo-in-player']")?.src;
    const sourceTitle = root?.querySelector("[data-testid='broadcast-name']")?.textContent ?? "radio.net";
    const sourceUrl = location.origin && getStemFromUrl(image) ? `${location.origin}/s/${getStemFromUrl(image)}` : "https://www.radio.net";

    if (!title && sourceTitle) {
      title = sourceTitle;
      artist = sourceTitle;
    }
    const source = sourceTitle;
    const songUrl = sourceUrl;
    const isPlaying = Boolean(document.querySelector("button[data-item='stop_button']"));
  },
});
