registerParser({
  id: "kanashiidev_danceradio.show_Lio",
  domain: "danceradio.show",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Dance Radio",
  version: "1.0.0",
  description: "Online dance music radio station streaming current hits and '00s/'90s throwbacks 24/7.",
  category: "radio",
  tags: [],
  rlPatterns: [/.*/],
  iframeSelectors: { match: ["embed.radio.co"], fields: { playing: { type: "exists", selector: ".radioco-player #playButton.play-button.icon.icon-playerstop" } } },
  fn: async function () {
    const iframe = await getIframeData();
    let fetched;
    try {
      const res = await fetch("https://public.radio.co/stations/s3dccdde7b/status");
      const data = await res.json();
      fetched = { title: data.current_track.title, artwork_url: data.current_track.artwork_url };
    } catch (_) {}

    const title = fetched?.title;
    const artist = fetched?.title;
    const image = fetched?.artwork_url;
    const source = "Dance Radio";
    const songUrl = "https://danceradio.show/";
    const isPlaying = Boolean(iframe?.playing);
  },
});
