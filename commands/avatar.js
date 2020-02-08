module.exports = {
	name: 'avatar',
	description: 'Displays avatar of the requested user',
	aliases: ['avvie', 'av', 'pfp', 'icon'],
  args: true,
  argsNum: 1,
  usage: '@user',
	execute(client, message, args) {
    if (args[0]) {
      const user = getUserFromMention(args[0], client);
      if (!user) {
        return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
      }
  
      return message.channel.send(`${user.displayAvatarURL}`);
    }
  }
}

function getUserFromMention(mention, client) {
  if (!mention) 
    return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}