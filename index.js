require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.username}`);
    //client.user.setUsername('WickedBot');
    //client.user.setAvatar('https://pbs.twimg.com/profile_images/911621253764603904/DXiJWgyl_400x400.jpg');
    //client.user.setActivity('Overthrow the humans');
});

;

//--------------------------------------
//
//         EVENT ON NEW USER
//
//--------------------------------------
/* client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const mainChannel = member.guild.channels.find(ch => ch.name === 'theicecave');
    // Do nothing if the channel wasn't found on this server
    if (!mainChannel) return;
    // Send the message, mentioning the member
    mainChannel.send('Howdy ${member}, Please Read Everything With Full Understand. Thank You.');
  }
); */

//--------------------------------------
//
//         EVENT ON MESSAGE
// <:pedobear:675486314635984899>
//--------------------------------------
client.on('message', message => {
    if (!message.author.bot && (message.content.toLowerCase().includes('rick') || message.content.toLowerCase().includes('emo') || message.content.includes(':rick:545438299788017664') || message.author.id === 278356884061290509))
        message.react(':rick:545438299788017664');

    /* if (!message.author.bot && (message.content.toLowerCase().includes('kid') || message.content.toLowerCase().includes('child') || message.content.toLowerCase().includes('1') || message.content.toLowerCase().includes('2') ||  message.content.toLowerCase().includes('3') ||  message.content.toLowerCase().includes('4') ||  message.content.toLowerCase().includes('5') ||  message.content.toLowerCase().includes('6') ||  message.content.toLowerCase().includes('7') ||  message.content.toLowerCase().includes('8') ||  message.content.toLowerCase().includes('9') ||    message.content.includes(':pedobear:675486314635984899')))
        message.react(':pedobear:675486314635984899')

        if (!message.author.bot && (message.content.toLowerCase().includes(' 10 ') ||  message.content.toLowerCase().includes('11') || message.content.toLowerCase().includes('12') ||  message.content.toLowerCase().includes('13') ||  message.content.toLowerCase().includes('14') ||  message.content.toLowerCase().includes('15') || message.content.toLowerCase().includes('16') || message.content.toLowerCase().includes('17')))
            message.react(':pedobear:675486314635984899') */

    if (!message.content.startsWith(prefix) || 
        message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase()

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) 
        return message.channel.send('I do not know that command.');

    if (command.args && args.length !== command.argsNum) {
        let reply = `You didn't provide the right number of arguments, ${message.author}!`;

		if(command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        
		return message.channel.send(reply);
    }

    try {
        command.execute(client, message, args);
    } catch (error) {
    	console.error(error);
	    message.reply('There was an error trying to execute that command!');
    }         
})

//--------------------------------------
//        END EVENT ON MESSAGE
//--------------------------------------

client.on('error', error => {
    console.log(error);
})

client.login(process.env.TOKEN);