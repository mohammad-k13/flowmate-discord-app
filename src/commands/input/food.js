import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { PrismaClient } from "@prisma/client";
import {getUserWorkflows} from '../../actions/index.js'
import { ButtonStyle } from "discord.js";


const data = {
    name: "foodi",
    description: "Test for Foods",
    options: [
        {
            name: "foodname",
            description: "Give me a Food name",
            type: 3,
            required: true,
        },
    ],
};



export const command = {
    data,
    async execute(interaction) {
        await interaction.deferReply();
        const row = new ActionRowBuilder();
        row.addComponents(
            new ButtonBuilder().setCustomId("test").setLabel("click me bitch").setStyle(ButtonStyle.Primary)
        );

        const workflows = await getUserWorkflows(interaction);

        if (!workflows || workflows.length === 0) {
            return await interaction.editReply("No workflows found.");
        }

        const foodname = interaction.options.getString("foodname");
        console.log(foodname);

        // Final reply
        await interaction.editReply({
            content: `Your food name is: ${foodname}\nWorkflows fetched successfully.`,
            components: [row],
        });
    },
};
