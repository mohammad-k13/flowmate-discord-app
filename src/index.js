import { Client, GatewayIntentBits } from "discord.js";
import loadCommand from "./utilities/load-commnads.js";
import { config } from "dotenv";
import loadEvents from "./utilities/load-events.js";
import updateCommands from "./utilities/update-commands.js";

config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});
const setupClient = async () => {
    await loadCommand(client);
    await loadEvents(client);
    // await updateCommands(client);

    client.login(process.env.DISCORD_BOT_TOKEN)
};

setupClient();
