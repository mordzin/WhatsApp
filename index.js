const { createBot } = require("whatsapp-cloud-api");

(async () => {
  try {
    // replace the values below from the values you copied above
    const from = "YOUR_WHATSAPP_PHONE_NUMBER_ID";
    const token = "YOUR_TEMPORARY_OR_PERMANENT_ACCESS_TOKEN";
    const to = "PHONE_NUMBER_OF_RECIPIENT"; // your phone number without the leading '+'
    const webhookVerifyToken = "YOUR_WEBHOOK_VERIFICATION_TOKEN"; // use a random value, e.g. 'bju#hfre@iu!e87328eiekjnfw'

    const bot = createBot(from, token);

    const result = await bot.sendText(to, "Hello world");

    // Start express server to listen for incoming messages
    await bot.startExpressServer({
      webhookVerifyToken,
    });

    // Listen to ALL incoming messages
    bot.on("message", async (msg) => {
      console.log(msg);

      if (msg.type === "text") {
        await bot.sendText(msg.from, "Received your text message!");
      } else if (msg.type === "image") {
        await bot.sendText(msg.from, "Received your image!");
      }
    });
  } catch (err) {
    console.log(err);
  }
})();
