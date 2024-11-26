import { Client, GatewayIntentBits, Events, Collection } from "discord.js";
import { config } from "dotenv";
import loadCommand from "./utilities/command-loader.js";
import loadEvents from "./utilities/event-loader.js";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessagePolls, GatewayIntentBits.GuildMessages] });

(async () => {
    await loadCommand(client);
    console.log("------evnets------")
    await loadEvents(client);
})();

client.login(process.env.DISCORD_BOT_TOKEN.toString());
