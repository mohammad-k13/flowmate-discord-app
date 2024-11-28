import { Events } from "discord.js";

export const event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        // if (interaction[0].isChatInputCommand()) {
        //     console.log(interaction[0].options.getString("foodname"))
        // }
        const command = interaction[0].client.commands.get(interaction[0].commandName);
        if (!command) return console.log("No Found Such a command");

        try {
            await command.execute(interaction[0]);
        } catch (err) {
            await interaction.followUp({
                content: "There was an error while executing this command! Sorry",
            });
        }
    },
};
