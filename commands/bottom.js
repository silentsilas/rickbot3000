const { getRequestee, sortEmojis, prettifyEmojis } = require('../util.js');
const fs = require('fs');

module.exports = {
	name: 'bottom',
	description: 'Display a user\'s top 50 least frequently used emojis.',
	aliases: ['bo', 'bot'],
	args: false,
  usage: '@user',
	execute(client, message, args) {
    let isTop = false;
    const NUM_EMOJIS = 50;
    let rawdata = fs.readFileSync('emojiCount.json');
    let emojiData = JSON.parse(rawdata);

    let requestee = getRequestee(client, message, args);
    let sortedEmojis = sortEmojis(requestee, emojiData, isTop, NUM_EMOJIS);
    let prettifiedEmojis = prettifyEmojis(sortedEmojis);

    if(emojiData[requestee]) {
      message.channel.send(prettifiedEmojis);
    } else {
      message.channel.send('User Has Not Yet Used Emojis. They Are As Emotionless As The Void. So Says The Rick.')
    }
  }
}
