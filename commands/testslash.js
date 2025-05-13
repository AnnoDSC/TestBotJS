const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { default: Client } = require('pocketbase');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping1')
		.setDescription('Replies with Pong!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')),
		

	/**
	 * Handles the interaction response for a Discord.js slash command.
	 * @param {import('discord.js').Interaction} interaction - The interaction object from Discord.js.
	 */
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('I`ve received your message!')
			.setDescription(`This is a test message ${interaction.options}`)

		await interaction.reply({content: 'Pong!', embeds: [embed] });
	},
};


