import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

const loadCommand = async (client) => {
    client.commands = new Collection();

    const commandsFolderPath = join(import.meta.dirname, "../src", "commands");
    const commandsFiles = readdirSync(commandsFolderPath).filter((file) => file.endsWith(".js"));

    for (const commandFile of commandsFiles) {
        const commandFilePath = join(commandsFolderPath, commandFile);
        const command = await import(commandFilePath);

        if (command.default?.data && command.default?.execute) {
            const { name } = command.default.data;
            client.commands.set(name, command.default);
            console.log(`Load ${name} Commanad`);
        } else {
            console.log(`NOT Load ${commandFile}`);
        }
    }
};

export default loadCommand;