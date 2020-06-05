const util = require('../util.js');
const fs = require('fs');

module.exports = {
	name: 'bottom',
	description: 'Display a user\'s top 50 least frequently used emojis.',
	aliases: ['bo', 'bot'],
	args: false,
  usage: '@user',
	execute(client, message, args) {
    let rawdata = fs.readFileSync('emojiCount.json');
    let emojiData = JSON.parse(rawdata);

    let requestee = getRequestee(client, args);
    console.log(requestee + ' 2nd time');

    if(emojiData[requestee]) {
      message.channel.send(sortEmojis(requestee, emojiData));
    } else {
      message.channel.send('User Has Not Yet Used Emojis. They Are As Emotionless As The Void. So Says The Rick.')
    }
  }
}

function sortEmojis(requestee, emojiData) {
  let sortable = [];

  for (var emoji in emojiData[requestee]) {
    sortable.push([emoji, emojiData[requestee][emoji]]);
  }

  sortable.sort(function(a, b) {
    return a[1] - b[1];
  });

  return sortable.slice(0, 50).join(' | ');

}

function getRequestee(client, args) {
  let requestee = "server";
  
  if(util.getUserFromMention(args[0], client))
      requestee = util.getUserFromMention(args[0], client).id;

  console.log(requestee);

  return requestee;
}