export default async function (interaction) {
    try {
        const response = await fetch(process.env.TRIGGER_CALLBACK_URL, {
            method: "POST",
            body: JSON.stringify({ workflowId: interaction.customId }),
        });

        console.log(await response.json());
        await interaction.reply({
            content: `Button clicked! Custom ID: ${interaction.customId}`,
            ephemeral: true, // Makes the reply visible only to the user who clicked
        });
    } catch (err) {
        console.log(err);
        await interaction.reply({
            content: "There was an error while processing the button click.",
            ephemeral: true,
        });
    }
}
