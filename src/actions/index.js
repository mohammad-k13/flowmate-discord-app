import {prisma} from './prisma.js'

export const getUserWorkflows = async (interaction) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                Account: { some: { providerAccountId: interaction.user.id } },
            },
        });

        if (!user) {
            await interaction.editReply("User not found for the given Discord ID.");
            return [];
        }

        // Fetch workflows
        const workflows = await prisma.workflow.findMany({
            where: {
                userId: user.id,
            },
        });

        return workflows;
    } catch (error) {
        console.error("Error finding workflows:", error);
        await interaction.editReply("An error occurred while fetching workflows.");
        return [];
    } finally {
        await prisma.$disconnect();
    }
};
