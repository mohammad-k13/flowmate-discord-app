import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { getUserWorkflows } from "../../actions/index.js";

const data = {
    name: "trigger-my-workflow",
    description: "Show All Your FlowMate's Workflow",
};

export const command = {
    data,
    async execute(interaction) {
        await interaction.deferReply();

        const workflows = await getUserWorkflows(interaction);
        if (!workflows || !workflows.length) {
            await interaction.editReply("No Workflow Found");
        }

        const row = new ActionRowBuilder();

        workflows.map((item) => {
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(item.id)
                    .setLabel(`Trigger Workflow: ${item.name}`)
                    .setStyle(ButtonStyle.Primary)
            );
        });

        await interaction.editReply({
            content: "Your Workflows",
            components: [row],
        });
    },
};
