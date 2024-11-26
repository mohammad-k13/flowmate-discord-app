import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("me")
        .setDescription("Describe yourself or say something in a special way.")
        .addStringOption(option =>
            option
                .setName("message") // Option name
                .setDescription("Write your custom message.") // Description shown to users
                .setRequired(true) // Make this input required
        ),
    async execute(interaction) {
        // Get the user's message input
        const message = interaction.options.getString("message");

        // Customize the output with `/me`-like behavior
        await interaction.reply({
            content: `*${interaction.user.username} ${message}*`, // Italicized custom message with the user's name
            ephemeral: false, // Set to true if you want the reply visible only to the user
        });
    },
};