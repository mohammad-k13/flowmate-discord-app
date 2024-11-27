import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readdirSync } from "fs";

dotenv.config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load commands dynamically
const commands = [];
const folderPath = join(__dirname, "src", "commands");
const commandsFolder = readdirSync(folderPath);

for (const folder of commandsFolder) {
    const commandPath = join(folderPath, folder);
    const command = await import(commandPath);

    if (command.default?.data.name && command.default?.data.description) {
        commands.push({ name: command.default?.data.name, description: command.default?.data.description }); // Convert to JSON for Discord API compatibility
    } else {
        console.log(`[WARNING] The command at ${commandPath} is missing required "name".`);
    }
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        console.log(commands);
        await rest.put(Routes.applicationCommands(CLIENT_ID, "1310668153126387804"), { body: commands });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error("Error while refreshing commands:", error);
    }
})();
