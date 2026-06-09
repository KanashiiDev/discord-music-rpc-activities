registerParser({
  id: "kanashiidev_ashiya.radio_Lio",
  domain: "ashiya.radio",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Ashiya Radio",
  version: "1.0.1",
  description: "Japanese online radio station featuring jazz and international music.",
  lastUpdated: "1780444258963",
  mode: "listen",
  watchAutoDetect: "disable",
  homepage: "",
  category: "radio",
  tags: ["jazz", "japan"],
  urlPatterns: [/.*/],
  iframeSelectors: {
    fields: {
      playing: {
        selector: ".radioco-player #playButton.play-button.icon.icon-playerstop",
        type: "exists",
      },
    },
    match: ["embed.radio.co"],
  },
  fn: async function () {
    const iframe = await getIframeData();
    let fetched;
    try {
      const res = await fetch("https://public.radio.co/stations/sc8d895604/status");
      const data = await res.json();
      fetched = { title: data.current_track.title, artwork_url: data.current_track.artwork_url };
    } catch (_) {}

    const title = fetched?.title.split("-")[0] || fetched?.title;
    const artist = fetched?.title.split("-")[1] || fetched?.title;
    const image = fetched?.artwork_url;
    const source = "Ashiya Radio";
    const songUrl = "https://www.ashiya.radio/";
    const isPlaying = Boolean(iframe?.playing);
  },
});
