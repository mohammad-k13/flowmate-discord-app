import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const loadEvents = async (client) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const eventsFolderPath = join(__dirname, "../" + "events");
    const eventsFiles = readdirSync(eventsFolderPath).filter((file) => file.endsWith(".js"));

    for (const eventFile of eventsFiles) {
        const eventFilePath = join(eventsFolderPath, eventFile);
        const { event } = await import(eventFilePath);

        const { name, once, execute } = event;
        if (!name || !execute) return console.log("Event Export are not compelet");

        if (once) {
            client.once(name, (...args) => execute(args));
        } else {
            client.on(name, (...args) => execute(args));
        }
        console.log(`Load ${name} Event`);
    }
};

export default loadEvents;
