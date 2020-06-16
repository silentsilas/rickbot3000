const fs = require('fs');
const { admins } = require('../config.json');

module.exports = {
	name: 'clearOldEmojis',
	description: 'Display a user\'s  top 50 most frequently used emojis.',
	aliases: ['clear', 'c'],
	args: false,
  usage: 'admin only',
  execute(client, message) {
    if (!admins.includes(message.author.id)) 
      return message.channel.send('This Command Is Only For Admins');

    let rawdata = fs.readFileSync('emojiCount.json');
    let emojiData = JSON.parse(rawdata);

    ticEmojisDictionary = getTicEmojis(client, message);
    
    message.channel.send('Deleting emojis that do not belong.');
    findAndDeleteAlienEmojis(emojiData, ticEmojisDictionary, message);
    message.channel.send('Deletion complete.');
    message.channel.send('Looking for alien emojis.');
    findAlienEmojis(emojiData, ticEmojisDictionary, message);
    message.channel.send('Search complete.');

    let newData = JSON.stringify(emojiData, null, 2);
    fs.writeFileSync('emojiCount.json', newData)
  }
}

function getEmojiIdFromEmojiProp(emojiProp) {
  emojiRegex = emojiProp.match(/(\d+)/) //array of emoji regex capture data
  return emojiRegex[0];
}

function findAndDeleteAlienEmojis(emojiData, ticEmojisDictionary, message) {
  for (let user in emojiData) {
    for (let emojiProp in emojiData[user]) { // prop2 == emoji <:name:ID>
      emojiID = getEmojiIdFromEmojiProp(emojiProp);
      
      if (!ticEmojisDictionary.hasOwnProperty(emojiID)) {
        message.channel.send(`Deleting entry: User: ${user} | ID: ${emojiID}`)
        delete emojiData[user][emojiProp];
      }
    }
  }
}

function findAlienEmojis(emojiData, ticEmojisDictionary, message) {
  for (let user in emojiData) {
    for (let emojiProp in emojiData[user]) { // prop2 == emoji <:name:ID>
      emojiID = getEmojiIdFromEmojiProp(emojiProp);
      
      if (!ticEmojisDictionary.hasOwnProperty(emojiID)) {
        message.channel.send(`Found alien emoji: User: ${user} ID: ${emojiID} not TIC emoji`)
      }
    }
  }
}

function getTicEmojis(client, message) {
  let ticEmojisDictionary = {};

  guildEmojisArray = message.guild.emojis.cache.map(emoji => emoji.id)

  for (let idx in guildEmojisArray) {
    ticEmojisDictionary[guildEmojisArray[idx]] = true;
  }

  return ticEmojisDictionary;
}