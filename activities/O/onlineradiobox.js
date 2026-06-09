registerParser({
  id: "kanashiidev_onlineradiobox.com_Lio",
  domain: "onlineradiobox.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Online Radio Box",
  version: "1.0.0",
  description: "Directory and streaming platform that aggregates thousands of online radio stations worldwide.",
  category: "aggregator",
  tags: [],
  urlPatterns: [/.*/],
  fn: async function () {
    async function fetchTrackHistory() {
      const stationLink = document.querySelector(".player__station__title a");
      if (!stationLink) return;
      const stationId = stationLink.getAttribute("href")?.split("?")[0];
      try {
        const response = await fetch(`${stationId}playlist/`);
        if (!response.ok) throw new Error();
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const item = doc.querySelector(".tablelist-schedule .active .track_history_item");
        if (!item) return;
        return {
          trackTitle: item.textContent.split(" - ")[1] || document.querySelector(".player__station__name")?.textContent,
          trackArtist: item.textContent.split(" - ")[0] || "OnlineRadioBox",
          trackLink: item.querySelector("a")?.href || "",
        };
      } catch (_) {}
    }

    async function fetchTrackCover(url) {
      if (!url) return;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.querySelector(".subject__cover--album img")?.src;
      } catch (_) {}
    }

    const isPlaying = Boolean(document.querySelector("#b_top_play.b-stop"));
    if (!isPlaying) return;

    const fetched = await fetchTrackHistory();
    const stationName = document.querySelector(".player__station__name")?.textContent || "OnlineRadioBox";
    const image = fetched?.trackLink ? await fetchTrackCover(fetched.trackLink) : document.querySelector(".player__station__logo")?.src;
    const title = fetched?.trackTitle;
    const artist = fetched?.trackArtist;
    const source = stationName;
    const songUrl = fetched?.trackLink || document.querySelector(".player__station__title a")?.href || "https://onlineradiobox.com/";
  },
});
