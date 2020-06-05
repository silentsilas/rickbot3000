module.exports = {
	name: 'echo',
	description: 'Put Words In Rick\'s Mouth',
	aliases: ['e', 'eko'],
	args: false,
  usage: '<message you want rick to repeat>',
	execute(client, message, args) {
    var messageToRepeat = args.join(' ');
    rickifiedMessage = rickify(messageToRepeat);

    message.delete();

    return message.channel.send(rickifiedMessage);
  }
}

function rickify(quote){
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
}