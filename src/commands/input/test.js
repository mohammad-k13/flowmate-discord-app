export const command = {
      data: {
            name: "test",
            description: "test"
      },
      async execute(interaction) {
            await interaction.reply("test for test");
      }
}