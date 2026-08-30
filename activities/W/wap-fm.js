registerParser({
  id: "kanashiidev_radio.wapchan.org_cHVibGljXC",
  domain: ["wapchan.org", "radio.wapchan.org"],
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "wap-fm",
  version: "1.0.1",
  description: "Community-run online radio on the Wapchan anime/manga forum.",
  homepage: "https://radio.wapchan.org/public/wapfm",
  category: "radio",
  tags: ["anime", "community"],
  urlPatterns: [/.*/],
  iframeSelectors: {
    fields: {
      iframeArtist: {
        selector: ".now-playing-artist",
        type: "text",
      },
      iframeDuration: {
        selector: ".time-display-total",
        type: "time",
      },
      iframeElapsed: {
        selector: ".time-display-played",
        type: "time",
      },
      iframeHasAudio: {
        selector: ".radio-player-widget > audio",
        type: "exists",
      },
      iframeImage: {
        selector: ".now-playing-art a.album-art",
        type: "href",
      },
      iframePlayPath: {
        attr: "d",
        selector: ".radio-control-play-button > svg > path",
        type: "attr",
      },
      iframeTitle: {
        selector: ".now-playing-title",
        type: "text",
      },
    },
    match: "radio.wapchan.org",
  },
  fn: async function () {
    const isWapfmPage = location.pathname.includes("/public/wapfm");
    let title, artist, image, timePassed, duration, isPlaying, songUrl, source;

    if (isWapfmPage) {
      title = getText(".now-playing-title");
      artist = getText(".now-playing-artist");
      image = document.querySelector(".now-playing-art a.album-art")?.href || getImage("img.album_art") || null;
      timePassed = getText(".time-display-played");
      duration = getText(".time-display-total");
      songUrl = "https://radio.wapchan.org/public/wapfm";
      source = "wap-fm";
      isPlaying = Boolean(document.querySelector(".radio-control-play-button > svg > path")?.getAttribute("d")?.startsWith("M324") || document.querySelector(".radio-player-widget > audio"));
    } else {
      const iframeData = await getIframeData();
      title = iframeData?.iframeTitle || null;
      artist = iframeData?.iframeArtist || null;
      image = iframeData?.iframeImage || null;
      timePassed = iframeData?.iframeElapsed || null;
      duration = iframeData?.iframeDuration || null;
      isPlaying = Boolean(iframeData?.iframePlayPath?.startsWith("M324") || iframeData?.iframeHasAudio);
      songUrl = "https://wapchan.org";
      source = "Wapchan";
    }
  },
});
