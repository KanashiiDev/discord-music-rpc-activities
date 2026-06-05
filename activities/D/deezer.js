registerParser({
  domain: "deezer.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Deezer",
  version: "1.0.0",
  description: "Global on-demand music streaming with playlists and recommendations.",
  category: "platform",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    let title = document.querySelector("[data-testid='item_title']")?.textContent;
    let artist = document.querySelector("[data-testid='item_subtitle']")?.textContent;
    let image = document.querySelector("[data-testid='item_cover'] img")?.src;
    const timePassed = document.querySelector("p[data-testid='elapsed_time']")?.textContent.trim() || "";
    const duration = document.querySelector("p[data-testid='remaining_time']")?.textContent.trim() || "";
    const sourceUrl = document.querySelector("[data-testid='item_title'] a")?.href;
    const source = "Deezer";
    const songUrl = sourceUrl || "https://www.deezer.com/";
    const isPlaying = Boolean(document.querySelector("[data-testid='play_button_pause']"));

    if (!title) title = document.querySelector("head title")?.textContent.split(" - ").slice(0, -2).join(" - ");
    if (!artist) artist = document.querySelector("head title")?.textContent.split(" - ").slice(-2)[0];
    if (!image) image = document.querySelector(`img[alt='${title}']`)?.src.replace("500x500", "200x200");
  },
});
