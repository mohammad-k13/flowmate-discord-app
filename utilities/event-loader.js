import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readdir, readdirSync } from "fs";

const loadEvents = async (client) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const eventsFolderPath = join(__dirname, "../src", "events");

    const eventFiles = readdirSync(eventsFolderPath).filter((file) => file.endsWith(".js"));

    for (const eventFile of eventFiles) {
        const eventFilePath = join(eventsFolderPath, eventFile);
        const event = await import(eventFilePath);

        if (event.default?.name && event.default?.execute) {
            const eventName = event.default?.name;
            const eventExecute = event.default?.execute;

            if (event.default?.once) {
                client.once(eventName, (...args) => eventExecute(args));
                console.log(`Load ${eventName} Event`);
            } else {
                client.on(eventName, (...args) => eventExecute(args));
                console.log(`Load ${eventName} Event`);
            }
        } else {
            console.log(`NOT Load ${eventFile} Event`);
        }
    }
};

export default loadEvents;
