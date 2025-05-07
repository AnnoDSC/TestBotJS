module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    /**
     * @param {import('discord.js').Message} message - The message object from Discord.js
     * @param {string[]} args - Command arguments
     */
    execute(message, args) {
        message.channel.send('Pong!');
    }
};
