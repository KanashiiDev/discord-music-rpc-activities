registerParser({
  domain: "jetsetradio.live",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Jet Set Radio",
  version: "1.0.0",
  description: "Fan-made browser radio inspired by Jet Set Radio, streaming funky retro and hip-hop tracks 24/7.",
  urlPatterns: [/.*/],
  fn: function () {
    if (document.querySelector("#tvFrame")?.style?.visibility !== "hidden") return null;

    const title = getText("#programInformationText");
    if (title === "Bump" || title === "Loading..." || title === "PAUSED") return null;

    const image = getImage("#graffitiSoulFrame img");
    const coverSegment = image?.split("/")[5];
    const stationLabel = coverSegment ? coverSegment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : null;

    return {
      title,
      artist: title,
      image,
      source: stationLabel ? "Jet Set Radio - " + stationLabel : "Jet Set Radio",
      songUrl: "https://jetsetradio.live/",
      isPlaying: Boolean(document.querySelector("#pauseTrackButton")?.style.visibility === "visible"),
    };
  },
});
