import { Collection, REST, Routes } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

config();
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

const updateCommands = async (client) => {
    const commands = Array.from(client.commands.values()).map((item) => ({
        name: item.data.name,
        description: item.data.description ?? "",
        options: item.data.options ?? []
    }));


    console.log("commands are updating");
    const result = await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID), {
        body: commands,
    });
    console.log(result.length);
    console.log("commands updated");
};

export default updateCommands;
