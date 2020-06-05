require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const emojicounter = require('./emojicounter.js');

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
let rickemo = /\b(rick|emo)\b/;


client.on('message', message => {


    if (!message.author.bot && rickemo.test(message.content))
        message.react('545438299788017664');

    if (message.author.bot)
        return;
    
    if (!message.content.startsWith(prefix)) {
        
        try {
            emojicounter.countEmojis(client, message);
        } catch (error) {
            console.error(error);
            message.reply('There Was An Error Trying To Catch Emojis!');
        } 
        
        return;
    } 
        
        

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase()

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) 
        return message.channel.send('I Do Not Know That Command.');

    if (command.args && args.length !== command.argsNum) {
        let reply = `You Didn't Provide The Right Number Of Arguments, ${message.author}!`;

		if(command.usage) {
			reply += `\nThe Proper Usage Would Be: \`${prefix}${command.name} ${command.usage}\``;
        }
        
		return message.channel.send(reply);
    }

    try {
        command.execute(client, message, args);
    } catch (error) {
    	console.error(error);
	    message.reply('There Was An Error Trying To Execute That Command!');
    }         
})

//--------------------------------------
//        END EVENT ON MESSAGE
//--------------------------------------

client.on('error', error => {
    console.log(error);
})

client.login(process.env.TOKEN);