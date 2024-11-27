import { Client, GatewayIntentBits, Events, REST, Routes } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});

// Define an async function to initialize and start the bot
const startBot = async () => {
    try {
        // Register the command using the Discord REST API
        const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

        await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID), {
            body: [
                {
                    name: "foodii",
                    description: "test for food",
                    options: [
                        {
                            name: "food",
                            description: "Enter your favorite food",
                            type: 3, // Type 3 corresponds to STRING in Discord API
                            required: true,
                        },
                    ],
                },
            ],
        });

        console.log("Successfully registered application (/) commands.");

        // Log a message when the bot is ready
        client.once(Events.ClientReady, () => {
            console.log(`Ready! Logged in as ${client.user.tag}`);
        });

        // Handle interactions
        client.on(Events.InteractionCreate, async (interaction) => {
            if (interaction.isChatInputCommand()) {
                if (interaction.commandName === "foood") {
                    const favoriteFood = interaction.options.getString("food");
                    await interaction.reply(`You like ${favoriteFood}! Yum!`);
                }
            }
        });

        // Log in to Discord
        await client.login(process.env.DISCORD_BOT_TOKEN);
    } catch (error) {
        console.error("Error starting the bot:", error);
    }
};

// Call the function to start the bot
startBot();
