registerParser({
  domain: "iheart.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "iHeart",
  version: "1.0.0",
  description: "Aggregator for live radio stations, custom music channels, and podcasts.",
  urlPatterns: [/.*/],
  fn: function () {
    const player = document.querySelector("body > div > div > div:last-child");
    if (!player) return null;

    function decodeCoverImage(url, size = "small") {
      try {
        let finalUrl = url;
        if (url.includes("/url/")) {
          const base64Part = url.split("/url/")[1].split("?")[0];
          finalUrl = /^[A-Za-z0-9+/=]+$/.test(base64Part) ? atob(base64Part) : decodeURIComponent(base64Part);
        }
        return finalUrl.replace(/(&|\?)size=\w+/i, `$1size=${size}`);
      } catch {
        return url;
      }
    }

    return {
      title: player.querySelector("div > div > div > div > div > div:nth-child(2) > span")?.textContent,
      artist: player.querySelector("div > div > div > div > div > div:nth-child(3) > div")?.textContent,
      image: decodeCoverImage(player.querySelector("div > div > div > div > div > div:nth-child(1) > img")?.src),
      source: "iHeart",
      timePassed: player.querySelectorAll("div > div > div > div > div > div:nth-child(1) > span")[1]?.textContent,
      duration: player.querySelectorAll("div > div > div > div > div > div:nth-child(1) > span")[2]?.textContent,
      isPlaying: Boolean(document.querySelector("[data-test='player-play-button'] svg[aria-label='Pause']")),
    };
  },
});
