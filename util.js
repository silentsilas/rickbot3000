module.exports = {
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min; 
  },

  rickify(quote){
    var rickQuote = '';
    var rickArray = quote.split(' ');
    
    for (var i = 0; i < rickArray.length; i++){
      currentWord = rickArray[i];
  
      if (currentWord.length === 1){
        currentWord = rickArray[i].toUpperCase();
        rickArray[i] = currentWord; 
      }
  
      if (currentWord.length > 1) {
        currentWord = currentWord[0].toUpperCase() + currentWord.slice(1);
        rickArray[i] = currentWord;
      }
    }
  
    rickQuote = rickArray.join(' ');
  
    return rickQuote;
  },

  personalize(quote, requester){
    personalizedQuote = '';
  
    quoteArray = quote.split(' ');
    for (var i = 0; i < quoteArray.length; i++){
  
      if(quoteArray[i] === 'placeholder!'){
        quoteArray[i] = requester + '!';
      }
      if(quoteArray[i] === 'placeholder \'s' || quoteArray[i] === 'placeholder \'s'){
        quoteArray[i] = requester + '\'s';
      }
      if(quoteArray[i] === 'placeholder,' || quoteArray[i] === 'placeholder,'){
        quoteArray[i] = requester + ',';
      }
      if(quoteArray[i] === 'placeholder.' || quoteArray[i] === 'placeholder.'){
        quoteArray[i] = requester + '.';
      }
      if (quoteArray[i] === 'placeholder' || quoteArray[i] === 'placeholder'){
        quoteArray[i] = requester;
      }
    }
    personalizedQuote = quoteArray.join(' ');
  
    return personalizedQuote;
  },

  /* getRequestee(client, message, args) {
    if (typeof client.users.fetch(mention) !== undefined)
  } */

  getRequestee(client, message, args) {
    let requestee = "server";
    
    if(module.exports.getUserFromMention(client, message, args[0]))
        requestee = module.exports.getUserFromMention(client, message, args[0]).id;

    return requestee;
  },
  
  getUserFromMention(client, message, mention) {
    if (!mention) 
      return;
  
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
  
      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }
      //return message.mentions.users.first()
      console.log(client.users.cache.get(mention))
      return client.users.cache.get(mention);
    }
  },

  matchBear(message) {
    return message;
  },

  sortEmojis(requestee, emojiData, isTop, numEmojis) {
    let sortable = [];
  
    for (let emoji in emojiData[requestee]) {
      sortable.push([emoji, emojiData[requestee][emoji]]);
    }
  
    sortable.sort(function(a, b) {
      if(isTop) return b[1] - a[1];
      else return a[1] - b[1];
    });
  
    return sortable.slice(0, numEmojis);
  },
  
  // emojiList = array of arrays [[emojiName, count], [emojiName2, count2]]
  prettifyEmojis(emojiList) {
    let prettifiedEmojis = `${emojiList[0][0]} : ${emojiList[0][1]}`;

    for(let i=1; i<emojiList.length; i++) {
      prettifiedEmojis = prettifiedEmojis.concat(' | ', `${emojiList[i][0]} : ${emojiList[i][1]}`)
    }

    return prettifiedEmojis;
  },
};