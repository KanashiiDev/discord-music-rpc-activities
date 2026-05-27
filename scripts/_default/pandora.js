registerParser({
  domain: "pandora.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Pandora",
  version: "1.0.0",
  description: "Personalized music streaming and radio with on-demand options.",
  urlPatterns: [/.*/],
  fn: function () {
    const player = document.querySelector(".region-bottomBar");
    if (!player) return null;

    const title = player.querySelector("[data-qa='mini_track_title']")?.textContent;
    const artist = player.querySelector("[data-qa='mini_track_artist_name']")?.textContent;
    const image = player.querySelector("[data-qa='mini_track_image']")?.src;
    const source = "Pandora";
    const songUrl = player.querySelector("[data-qa='mini_track_title']")?.href;
    const timePassed = player.querySelector("[data-qa='elapsed_time']")?.textContent;
    const duration = player.querySelector("[data-qa='remaining_time']")?.textContent;
    const isPlaying = Boolean(document.querySelector("button[data-qa='pause_button']"));
  },
});
