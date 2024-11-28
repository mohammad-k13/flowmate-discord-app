

export const command = {
      data: {
            name: "foodi",
            description: "Test for Foods",
            options: [
                  {
                        name: "foodname",
                        description: "Give me a Food name",
                        type: 3,
                        required: true
                  }
            ]
      },
      async execute(interaction) {
            const foodname = interaction.options.getString("foodname");
            await interaction.reply(`your foodName is: ${foodname}`);
      }
}