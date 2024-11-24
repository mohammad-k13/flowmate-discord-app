import { readdirSync, statSync } from "fs";
import path from "path";

export const loadCommands = async (client) => {
  client.commands = new Map();

  const commandsPath = path.resolve("src", "commands");

  // Read all files and folders in the 'commands' directory
  const commandFiles = readdirSync(commandsPath);

  for (const item of commandFiles) {
    const itemPath = path.join(commandsPath, item);

    // If it's a directory, load the commands in that directory
    if (statSync(itemPath).isDirectory()) {
      const commandFilesInFolder = readdirSync(itemPath).filter((file) => file.endsWith(".js"));

      for (const file of commandFilesInFolder) {
        const filePath = path.join(itemPath, file);
        try {
          const { default: command } = await import(filePath);
          if (command?.name) {
            client.commands.set(command.name, command);
            console.log(`Loaded command: ${command.name}`);
          } else {
            console.warn(`Command in file ${file} doesn't have a name.`);
          }
        } catch (error) {
          console.error(`Failed to load command ${file}:`, error);
        }
      }
    }
    // If it's a file directly in the 'commands' folder, load it
    else if (item.endsWith(".js")) {
      const filePath = path.join(commandsPath, item);
      try {
        const { default: command } = await import(filePath);
        if (command?.name) {
          client.commands.set(command.name, command);
          console.log(`Loaded command: ${command.name}`);
        } else {
          console.warn(`Command in file ${item} doesn't have a name.`);
        }
      } catch (error) {
        console.error(`Failed to load command ${item}:`, error);
      }
    }
    // Handle cases where item is neither a directory nor a .js file
    else {
      console.warn(`Skipped non-directory or non-JS file: ${item}`);
    }
  }
};