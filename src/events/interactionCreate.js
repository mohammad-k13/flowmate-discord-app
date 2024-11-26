import { Events } from "discord.js";

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction[0].isChatInputCommand) return;

        const command = interaction[0].client.commands.get(interaction[0].commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction[0]);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        }
    },
};
