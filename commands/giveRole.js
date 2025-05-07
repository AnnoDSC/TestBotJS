module.exports = {
    name: 'give',
    description: 'Removes all roles from a user except @everyone',
    /**
     * @param {import('discord.js').Message} message - The message object from Discord.js
     */
    async execute(message) {
        try {
            // Ensure that the bot's member object is fully fetched
            await message.guild.members.fetch(message.member.id);

            // Create an array to store roles
            var roles = [];

            // Filter out @everyone role and collect other roles
            message.guild.roles.cache.forEach(role => {
                if (role.name !== '@everyone') {
                    roles.push(role);
                }
            });

            // Try to remove the roles
            for (const role of roles) {
                // Ensure the bot's role is higher than the role it's trying to remove
                if (message.guild.me.roles.highest.position > role.position) {
                    await message.member.roles.remove(role);
                    console.log(`Removed role: ${role.name}`);
                } else {
                    console.log(`Cannot remove role: ${role.name}, my role is not high enough.`);
                }
            }

            message.reply('All roles (except @everyone) have been removed.');
        } catch (error) {
            console.error(error);
            message.reply('There was an error removing roles or fetching data.');
        }
    }
};
