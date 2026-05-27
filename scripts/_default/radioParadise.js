registerParser({
  domain: "radioparadise.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Radio Paradise",
  version: "1.0.0",
  description: "Listener-supported, ad-free curated online radio with eclectic music selections.",
  urlPatterns: [/.*/],
  fn: function () {
    const currentChannel = getText(".channel-selector div");
    const channelMap = { "The Main Mix": "main-mix", "The Mellow Mix": "mellow-mix", "RP Rock Mix": "rock-mix", "RP Global Mix": "global-mix", "Beyond...": "beyond", Serenity: "serenity" };

    return {
      title: getText(".player-title"),
      artist: getText(".player-artist"),
      image: getImage(".player-cover"),
      source: "Radio Paradise",
      songUrl: "https://radioparadise.com/listen/channels/" + (channelMap[currentChannel] || ""),
      isPlaying: Boolean(document.querySelector("mat-icon#play-button[title='Pause']")),
    };
  },
});
