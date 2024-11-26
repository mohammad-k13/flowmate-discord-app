import { SlashCommandBuilder } from "discord.js";

export default {
      data: new SlashCommandBuilder().setName("fuck").setDescription("tese this shit"),
      async execute(integraction) {
            console.log(integraction);
            await integraction.reply("Fuck you")
      }
}