import { SlashCommandBuilder } from "discord.js";

export default {
      data: new SlashCommandBuilder().setName("ping").setDescription("Reply sdfasdf with Pong"),
      async execute(integraction) {
            console.log(integraction);
            await integraction.reply("Pong")
      }
};
