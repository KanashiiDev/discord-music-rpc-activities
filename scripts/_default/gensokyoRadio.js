registerParser({
  domain: "gensokyoradio.net",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Gensokyo Radio",
  version: "1.0.0",
  description: "Fan-run 24/7 radio station dedicated to Touhou Project fan arrangements and related music.",
  homepage: "https://gensokyoradio.net/playing/",
  urlPatterns: [/\/playing\//],
  fn: async function () {
    let data = null;
    try {
      const res = await fetch("https://gensokyoradio.net/api/station/playing/");
      if (res.ok) data = await res.json();
    } catch (_) {}

    let title = data?.SONGINFO?.TITLE || getText("#playerTitle");
    let artist = data?.SONGINFO?.ARTIST || getText("#playerArtist");

    let image = data?.MISC?.ALBUMART ? `https://gensokyoradio.net/images/albums/500/${data.MISC.ALBUMART}` : "";
    const imgRes = image ? await fetch(image) : false;
    if (!imgRes?.ok) image = getImage("#playerArt");

    let timePassed = data?.SONGTIMES?.PLAYED || null;
    let duration = data?.SONGTIMES?.DURATION || null;
    if (!timePassed || !duration) {
      const c = getText("#playerCounter");
      if (c.includes("/")) [timePassed, duration] = c.split("/").map((s) => s.trim());
    }

    const playButton = document.getElementById("shape")?.animatedPoints;
    const isPlaying = playButton ? playButton.getItem(0).x === 45 : false;
    const source = "Gensokyo Radio";
    const songUrl = "https://gensokyoradio.net/playing/";
  },
});
