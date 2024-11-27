import { InteractionContextType, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("input-test").setDescription('sdfsdf').addStringOption(option => option.setName("tet").setRequired(true)),
        // .setName("input-test")
        // .setDescription("Select a member and ban them.")
        // .addStringOption((option) => option.setName("reason").setDescription("The reason for banning").setRequired(true))
        // .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        console.log(interaction.options)
        const reason = interaction.options.getString("reason") ?? "No reason provided";
        await interaction.reply(`Banning  for reason: ${reason}`);
    },
};
