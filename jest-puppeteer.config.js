module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS === "false",
    args: [`--window-size=1920,1080`],
  },
  browserContext: "default",
};
