const util = require('../util.js');

module.exports = {
	name: 'burn',
	description: 'Gets A Personal Burn From The Real Slickrick',
	aliases: ['b', 'insult', 'smash'],
	args: false,
  usage: '<optional thing to search for in quote list>',
	execute(client, message, args) {
    if (args[0])
      var requester = util.getUserFromMention(args[0], client);
    else {
      var requester = message.guild.members.get(message.author.id).displayName;
    }
    console.log(requester);

    var randomQuote = burns[util.getRandomInt(0, burns.length)];

    var personalizedQuote = util.personalize(randomQuote, requester);

    var rickifiedQuote = util.rickify(personalizedQuote);

    message.delete();

		return message.channel.send(rickifiedQuote)
	},
};

burns = [
  'Please read with full understand placeholder.',
  'placeholder, you\'re a dinosaur.',
  'placeholder, what mental disorder do you have?',
  'you\'re spamming placeholder. ask jesus for guidance.',
  'placeholder is another idiot here. no offense of course.',
  'You must be an idiot, placeholder.',
  'Sure, whatever suits your comfort zone placeholder.',
  'placeholder, Making excessive jokes is a sign of immaturity in my view.',
  'That will get you nowhere in life placeholder.',
  'You\'re weird, placeholder. insanely weird.',
  'Seriously though placeholder, I really suspected you to behave older since you\'re older.',
  'You sicken my stomach placeholder.',
  'placeholder, You really have an issue in accepting the truth because of your subjective/sentimental feelings. If people were to value their own sentimental and subjective values above the truth then society would utterly collapse in morality and ethics.',
  'All you did was rant placeholder. In the rules of a diplomatic debate, you wouldn\'t stand a chance in prevailing since you haven\'t arranged and put out anything that defines a debunk to my sayings. So with that being said, I would like to professionally declare you the loser of this debate.',
  'I could care less placeholder.',
  'Why are you fat in the first place placeholder?',
  'Gosh, I truly despise this generation with such a heated passion and  placeholder is the epitome of why.',
  'People need to learn some manners. Especially you placeholder',
  'I\'m getting tired of you being a hypocrite, placeholder, and getting away with defaming me so gruelly.',
  'You need to settle and calm down placeholder.',
  'That\'s your opinion, placeholder.',
  'placeholder, I speak my opinion and you speak your opinion. So what?',
  'Only change I see in placeholder is how much they have aged in their face.',
  'So disagreeing with someone gives you the right and audacity to ridicule, bash and vilify that person? At least I\'m not the one doing it. You are, placeholder.',
  'I never claimed that. placeholder, just stop fooling the audience.',
  'placeholder, you should elaborate for once.',
  'There are opinions among assumptions and assumptions among hypothesis but the truth lies in there, somewhere. You just need the eyes to find it. Too bad you\'re blinder than a bat, placeholder.',
  'placeholder, You haven\'t stated facts, just merely assumptions.',
  'You can counter an irrational and illogical argument if you have knowledge, intellect and wisdom but you lack all of these, placeholder.',
  'As for now, placeholder, you\'re creating meaningless statements with no back-up which might explain how much of an \'idiot\' that \'you\' and \'I\' claim you are. You are the correct definition of credulous.',
  'placeholder, You\'re the one being irrelevant.',
  'placeholder, You are too stubborn to accept the truth and facts.',
  'placeholder, You don\'t acknowledge how you are deluded from the truth in entirety.',
  'I am who I am, you are who you are, placeholder. An idiot',
  'placeholder, I never said I condoned it, you nitwit.',
  'placeholder, you\'re just too young and too intellectually immature to grasp all of this.',
  'placeholder, wait until you get in jail one day',
  'Nice. You evaded my question placeholder. Good job. :chew1: Please read with full understand next time.',
  'Damn, you\'re really an idiot, aren\'t you placeholder. No offense intended, of course.',
  'placeholder doesn\'t have that perspective.',
  'Same old evil placeholder eh.',
  'placeholder, where\'s your counter in this discussion? oh right, you don\'t have any',
  'placeholder pointed it out earlier, you should have caught his subliminal reference.',
  'placeholder, I suppose you have the inability to comprehend simple figuratives.',
  'I barely know you placeholder, no offense.',
  'That\'s your problem placeholder, not mine.',
  'You need to learn how to manage your emotions placeholder.',
  'I don\'t care placeholder.',
  'Your assumption is incorrect placeholder. Try again.',
  'Oh it\'s placeholder. Now I acknowledge why I smell a stench of ignorance.',
  'placeholder, this seems to be an indication of you possessing the lack of comprehension in the learning compartment of the human brain.',
  'I tell you placeholder, if you have the proper sense then you would comprehend that easily crafted sentence.',
  'I don\'t know any way to be any clearer, placeholder. Unless you start having sense and read with full understand.',


]