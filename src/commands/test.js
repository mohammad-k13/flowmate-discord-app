import { SlashCommandBuilder } from "discord.js";

export default {
      data: new SlashCommandBuilder().setName("test").setDescription('test'),
      async execute({reply}) {
            await reply("test")
      }
}