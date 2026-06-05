registerParser({
  domain: "vk.com",
  authors: "kanashiiDev",
  authorsLinks: "https://github.com/KanashiiDev",
  title: "VK",
  version: "1.0.0",
  description: "Music streaming and discovery integrated into the VK social platform.",
  category: "platform",
  tags: ["community"],
  urlPatterns: [/.*/],
  fn: async function () {
    //@world main
    const ap = await window?.ap?.getCurrentAudio();
    if (!ap) return null;

    const progressResult = await window?.ap?.getCurrentProgress();
    const progress = progressResult && !progressResult.__error ? progressResult : 0;

    const title = ap[3];
    const artist = ap[4];
    const duration = ap[5] || 0;
    const timePassed = Math.floor(progress * (ap[5] || 0));
    const image = ap[14]?.split(",")[0] || "https://cdn.discordapp.com/app-assets/1366752683628957767/1472958246636617829.png?size=160";
    const songUrl = `https://vk.com/audio${ap[26]}`;
    const source = "VK";
    const isPlaying = Boolean(document.querySelector("button[data-testid='TopAudioPlayer_TogglePlayAction'][data-testactive='true']"));
  },
});
