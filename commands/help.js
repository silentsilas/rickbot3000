const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List All Of My Commands Or Info About A Specific Command.',
	aliases: ['commands', 'halp', 'h'],
	usage: '[command name]',
	cooldown: 5,
	execute(client, message, args) {
		const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s A List Of All My Commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou Can Send \`${prefix}help [command name]\` To Get Info On A Specific Command!`);

            return message.channel.send(data, { split: true })
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

        if (!command) {
	        return message.reply('That\'s Not A Valid Command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });

	},
};