import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const loadCommand = async (client) => {
    client.commands = new Map();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const commandsFolderPath = join(__dirname, "../" + "commands");
    const commandsFolders = readdirSync(commandsFolderPath);

    for (const commandFolder of commandsFolders) {
        //reading files inside of each folder
        const commandsSubFolderPath = join(commandsFolderPath + "/" + commandFolder);
        const commandsSubFolderFiles = readdirSync(commandsSubFolderPath);

        for (const commandFile of commandsSubFolderFiles) {
            const commandFilePath = join(commandsSubFolderPath + "/" + commandFile);
            const { command } = await import(commandFilePath);

            if (!command || !command.data || !command.execute) {
                return console.log("Your Command Doesn't export right data");
            } else {
                client.commands.set(command.data.name, command);
                console.log(`Load ${command.data.name} command`)
            }
        }
    }
};

export default loadCommand;
