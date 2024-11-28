import { Events } from "discord.js";
import buttonIntranctions from "./interaction/button-intranctions.js";

export const event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        // Check if the interaction is a command
        if (interaction[0].isCommand()) {
            const command = interaction[0].client.commands.get(interaction[0].commandName);
            if (!command) return console.log("No command found");

            try {
                await command.execute(interaction[0]); // Execute the command
            } catch (err) {
                console.log(err);
                await interaction[0].reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        }

        // Check if the interaction is a button click
        else if (interaction[0].isButton()) {
            buttonIntranctions(interaction[0]);
        }

        // Handle other types of interactions if needed, for example, select menus
        else if (interaction[0].isSelectMenu()) {
            console.log(`Select menu option selected: ${interaction[0].values}`);
            try {
                await interaction[0].reply({
                    content: `You selected: ${interaction[0].values.join(", ")}`,
                    ephemeral: true,
                });
            } catch (err) {
                console.log(err);
                await interaction[0].reply({
                    content: "There was an error while processing the select menu.",
                    ephemeral: true,
                });
            }
        }

        // Handle other interaction types here (like modal submissions, etc.) if necessary
    },
};
