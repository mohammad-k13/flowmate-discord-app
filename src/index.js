import { Client, GatewayIntentBits } from "discord.js";
import { loadCommands } from "./helpers/commands-helper.js";
import {config} from "dotenv";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands
loadCommands(client);

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply("There was an error executing this command!");
    }
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);