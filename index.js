require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  ActivityType
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {

console.log(`✅ ${client.user.tag} online!`);

client.user.setActivity({
    name: "Tickets do Terror Tricolor",
    type: ActivityType.Watching
});

});

client.login(process.env.TOKEN);
