import { SlashCommandBuilder } from "discord.js";

export default {
      data: new SlashCommandBuilder().setName("workflow-trigger").setDescription("Select one workflow for trigger"),
      async execute(intraction) {
            console.log(intraction)
            await intraction.reply("List of workflow")
      }
}