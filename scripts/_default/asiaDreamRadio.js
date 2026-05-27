registerParser({
  domain: "asiadreamradio.torontocast.stream",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Asia Dream Radio",
  version: "1.0.0",
  description: "Online radio focused on J-Pop, Asian hits, and Japanese music.",
  urlPatterns: [/stations.*/],
  fn: async function () {
    function isoToTimeString(iso) {
      const match = iso?.match(/PT(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/);
      const minutes = match?.[1] ? parseInt(match[1]) : 0;
      const seconds = match?.[2] ? parseFloat(match[2]) : 0;
      const total = Math.round(minutes * 60 + seconds);
      return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, "0")}`;
    }

    async function fetchSongInfo() {
      const iframeSrc = document.querySelector("iframe[src*=samcloudmedia]")?.src;
      if (!iframeSrc) return;
      const url = new URL(iframeSrc);
      let sid = url.searchParams.get("sid"),
        token = url.searchParams.get("token");
      if (!sid || !token) {
        const h = new URLSearchParams(url.hash.substring(1));
        sid ??= h.get("sid");
        token ??= h.get("token");
      }
      if (!sid || !token) return;
      try {
        const res = await fetch(`https://listen.samcloud.com/webapi/station/${sid}/history/npe?token=${token}&format=json`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const { Title, Artist, Duration, Picture } = data?.m_Item2 || {};
        if (Title) return { title: Title, artist: Artist, duration: isoToTimeString(Duration), cover: Picture };
      } catch (_) {}
    }

    function getPageSongInfo() {
      const main = document.querySelector(".sc-status-widget");
      if (!main) return null;
      return {
        title: main.querySelector(".track_st_track-meta").textContent,
        artist: main.querySelector(".track_st_track-meta").textContent,
        cover: main.querySelector("img").src,
        duration: main.querySelector(".track_st_progress-text")?.textContent,
      };
    }

    let data = await fetchSongInfo();
    if (!data) {
      data = getPageSongInfo();
      if (!data) return;
    }

    let station = "Asia Dream Radio";
    document.querySelectorAll(".paraWrap").forEach((e) => {
      if (e.textContent.includes("Station")) station = `${station}${e.textContent.replace("Station:", "")}`;
    });

    const title = data.title;
    const artist = data.artist;
    const image = data.cover;
    const source = station;
    const songUrl = location.href;
    const duration = data.duration?.trim();
    const isPlaying = Boolean(document.querySelector("#button_play_stop-3.active"));
  },
});
