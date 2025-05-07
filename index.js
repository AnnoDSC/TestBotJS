const { Client, IntentsBitField, Events, Partials, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const prefix = '!';
const client = new Client({
  intents: new IntentsBitField([
    'Guilds',
    'GuildMessages',
    'MessageContent',
    'DirectMessages'
  ]),
  partials: [
	Partials.Message,
	Partials.Channel,
	Partials.GuildMember,
	Partials.User,
	Partials.Reaction
  ]
});

const commands = [];

// Lade alle Befehlsdateien aus dem "commands" Ordner
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command);
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.channel.type === ChannelType.DM) {
        message.reply('You cannot use commands in DMs!');
        return;
    }

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
  
	if (!commandName) {
	  return;
	}
  
	const command = commands.find(cmd => cmd.name === commandName);
	
	if (!command) {
	  return;
	}
  
	try {
	  command.execute(message, args);
	} catch (error) {
	  console.error(error);
	  message.reply('Es gab einen Fehler beim Ausführen dieses Befehls!');
	}
  });
  
  
client.login()
