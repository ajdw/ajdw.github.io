var answerKey = [ 
	{
		question: 'What color is the sky?',
		answer: 'blue'
	},
	{
		question: 'What color is money?',
		answer: 'green'
	},
	{
		question: 'What is 2+2?',
		answer: 4
	},
	{
		question: 'What is the captial of California?',
		answer: 'Sacramento'
	},
	{
		question: 'What does a frog say?',
		answer: 'ribbit'
	},
	{
		question: 'How many legs does a dog have?',
		answer: 4
	},
	{
		question: 'What is 3x3?',
		answer: 9
	}
]


// Create a for loop
for (i = 0; i < answerKey.length; i++) {
// Each time we loop we run through our answerKey array, reference our object with bracket notation and then refer back to the document, retrieve by id and write with the textContent method the answerKey question that we have 
	var q = answerKey[i].question;
	document.getElementById('question' + [i]).textContent = q;

}

function testResults() {
  //create a variable that stores 0
	var correct = 0;
	//create a variable that stores 0
	var incorrect = 0;
	//create a for loop that runs as many times as the length of our answerKey array
	for(i = 0; i < answerKey.length; i++) {	
	//create a variable that stores our object's answer key value (first iteration: 'blue' / second interation: 'green', etc)
		var answer = answerKey[i].answer
	//create a variable that gets and stores the value of each answer the user typed in for each question 
		var guess = document.getElementById('answer' + [i]).value
	//create a variable that stores the id of question (plus its number)
		var questionSpot = document.getElementById('question' + [i])
  //create an if statement that says IF answer equals guess
		if(answer == guess) {
	//we change the variable holding the element id of answer (plus its number) and assign it the class of 'correct'
			questionSpot.className = 'correct'
	//we increase a 0 value variable called 'correct' by 1
			correct++
		} else {
	//we change the variable holding the element id of answer (plus its number) and assign it the class of 'incorrect'
			questionSpot.className = 'incorrect'
	//we increase a 0 value variable called 'incorrect' by 1
			incorrect++
		}
	}
	//we get an id with the value of 'correct' in our text document (index.html file) and change the textContent to the variable 'correct' which is a number
	document.getElementById('correct').textContent = correct
	
	//we get an id with the value of 'incorrect' in our text document (index.html file) and change the textContent to the variable 'incorrect' which is a number
	document.getElementById('incorrect').textContent = incorrect
}

