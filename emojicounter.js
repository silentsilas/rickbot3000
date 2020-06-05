const fs = require('fs');

const emojiformat = /<:([a-z])+:([0-9])+>/;

module.exports = {
  // must pass in client or get "property match undefined"
  countEmojis(client, message) {
    parsedForEmojis = message.content.match(emojiformat);
    author = message.author.id

    if(parsedForEmojis) {
        recordEmoji(author, parsedForEmojis[0]);
    }
  }  
}

function recordEmoji(author, emoji) {
  console.log(emoji);
  let rawdata = fs.readFileSync('emojiCount.json');
  let emojiData = JSON.parse(rawdata);
  
  if(emojiData["server"][emoji]) {
    emojiData["server"][emoji] = emojiData["server"][emoji] + 1;
  } else {
    emojiData["server"][emoji] = 1;
  }

  if(emojiData[author]) {
    if(emojiData[author][emoji]) {
      emojiData[author][emoji] = emojiData[author][emoji] + 1;
    } else {
      emojiData[author][emoji] = 1;
    }
  } else {
    emojiData[author] = {};
    emojiData[author][emoji] = 1;
  }
  
  let newData = JSON.stringify(emojiData, null, 2);
  fs.writeFileSync('emojiCount.json', newData)
}