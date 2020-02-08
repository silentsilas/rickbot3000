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

  getUserFromMention(mention, client) {
    if (!mention) 
      return;
  
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
  
      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }
  
      return client.users.get(mention);
    }
  },

  matchBear(message) {
    return message;
  }
};