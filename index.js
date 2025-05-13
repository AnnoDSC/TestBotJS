const { Client, IntentsBitField, Events, Partials, ChannelType, REST, Collection, Routes, MessageFlags } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const path = require('path');

const prefix = '!';
const client = new Client({
  intents: new IntentsBitField(53608447),
  partials: [
	Partials.Message,
	Partials.Channel,
	Partials.GuildMember,
	Partials.User,
	Partials.Reaction
  ]
});

const rest = new REST().setToken(config.token);
const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(__dirname, 'commands', file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		commands.push(command);
		console.log(commands.map(command => command));
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}



client.once('ready', async () => {
	await rest.put(
		Routes.applicationCommands(config.clientId),
		{ body: commands.map(command => command.data.toJSON()) }, // Corrected to map over commands and convert to JSON
	);
	console.log('Successfully reloaded application (/) commands.');
	console.log(`Logged in as ${client.user.tag}`);
});
  

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.find(cmd => cmd.data.name === interaction.commandName);
	console.log(command)

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	console.log(command)

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});
  
client.login(config.token)
