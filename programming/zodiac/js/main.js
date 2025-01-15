var zodiac = [

{
	sign: 'aquarius',
	description: 'Hey, thanks for spilling your drink all over the place. You are wise.',
	image: 'img/aquarius.png'

},

{
	sign: 'pisces',
	description: 'I am this one and we cannot make up our minds. You are creative.',
	image: 'img/pisces.png'

},

{
	sign: 'aries',
	description: 'This is a nice name for a ram. You are smart.',
	image: 'img/aries.png'

},

{
	sign: 'taurus',
	description: 'Is this one a cow or a bull? You are loyal, though.',
	image: 'img/taurus.png'

},

{
	sign: 'gemini',
	description: 'You can nap on the job and have the other person work for you. You know how to boogie.',
	image: 'img/gemini.png'

},

{
	sign: 'cancer',
	description: 'Possibly the one with the worst name, but you make for a rather delicious bisque. You are sweet.',
	image: 'img/cancer.png'

},

{
	sign: 'leo',
	description: 'The prideful lion that makes their way on cereal boxes and in zoos. You are strong.',
	image: 'img/leo.png'

},

{
	sign: 'virgo',
	description: 'Madonna sang about these, so that is important. You are important.',
	image: 'img/virgo.png'

},


{
	sign: 'libra',
	description: 'The cosmic version of the weight scale that is meant to balance out whatever. You are relaxed.',
	image: 'img/libra.png'

},


{
	sign: 'scorpio',
	description: 'The thing with the tail that goes zap and everyone is afraid of it. You are determined.',
	image: 'img/scorpio.png'

},


{
	sign: 'sagittarius',
	description: 'Is this like, a pokemon name? When science goes too far with species gene splicing. You are dedicated.',
	image: 'img/sagittarius.png'

},

{
	sign: 'capricorn',
	description: 'Take an aries and breed it with a pisces and you get this thing, I am sorry. You are intelligent.',
	image: 'img/capricorn.png'

}

];

var unknown = {
	image: 'img/unknown.png'
}

//getSign() stores the value of the sign input (ex: 'aquarius')
function getSign() {
	var sign = document.getElementById('sign').value.toLowerCase(	);
	result.style = "display: block";

	for(i = 0; i < zodiac.length; i++) {
		if (sign === zodiac[i].sign) {
			document.getElementById('result').innerHTML = 
			'<h1>' + zodiac[i].sign.toUpperCase() + '</h1>' + ' ' + zodiac[i].description;
			document.getElementById('icon').src = zodiac[i].image;
			return; 
		}
	}

document.getElementById('result').innerHTML = '<h1>' + 'Could not find sign' + '</h1>' + 'misspelling or nonexistent sign, please try again!';
document.getElementById('icon').src = unknown.image;

};


/*

*/