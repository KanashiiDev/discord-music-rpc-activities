registerParser({
  id: "kanashiidev_radioparadise.com_Lio",
  domain: "radioparadise.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "Radio Paradise",
  version: "1.0.0",
  description: "Listener-supported, ad-free curated online radio with eclectic music selections.",
  category: "radio",
  tags: [],
  urlPatterns: [/.*/],
  fn: function () {
    const currentChannel = getText(".channel-selector div");
    const channelMap = {
      "The Main Mix": "main-mix",
      "The Mellow Mix": "mellow-mix",
      "RP Rock Mix": "rock-mix",
      "RP Global Mix": "global-mix",
      "Beyond...": "beyond",
      Serenity: "serenity",
    };

    const title = getText(".player-title");
    const artist = getText(".player-artist");
    const image = getImage(".player-cover");
    const source = "Radio Paradise";
    const songUrl = "https://radioparadise.com/listen/channels/" + (channelMap[currentChannel] || "");
    const isPlaying = Boolean(document.querySelector("mat-icon#play-button[title='Pause']"));
  },
});
