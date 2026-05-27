registerParser({
  domain: "danceradio.show",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Dance Radio",
  version: "1.0.0",
  description: "Online dance music radio station streaming current hits and '00s/'90s throwbacks 24/7.",
  urlPatterns: [/.*/],
  iframeSelectors: { match: ["embed.radio.co"], fields: { playing: { type: "exists", selector: ".radioco-player #playButton.play-button.icon.icon-playerstop" } } },
  fn: async function () {
    const iframe = await getIframeData();
    let fetched;
    try {
      const res = await fetch("https://public.radio.co/stations/s3dccdde7b/status");
      const data = await res.json();
      fetched = { title: data.current_track.title, artwork_url: data.current_track.artwork_url };
    } catch (_) {}

    return { title: fetched?.title, artist: fetched?.title, image: fetched?.artwork_url, source: "Dance Radio", songUrl: "https://danceradio.show/", isPlaying: Boolean(iframe?.playing) };
  },
});
