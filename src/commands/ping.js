export default {
    name: "ping",
    description: "Replies with Pong!",
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};
