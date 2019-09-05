// A list of our declared variables, where we're going to store our data 

// Here we grab an element in our .html document with the id of 'myCanvas'
var canvas = document.getElementById('myCanvas');

/* Our variable ctx is going to use the getContext() method which returns an object that allows us to draw on it. 
We pass '2d' in the parameter thus creating a CanvasRenderingContext2D object which makes a 2d rendering plane. 
Our variable ctx is kind of like summoning a two dimensional plane, allowing us to birth into existence 2d objects. */
var ctx = canvas.getContext('2d');

// Our ballRadius variable stores the radius size for our ball
var ballRadius = 10;

// x holds a number value where we grab the canvas's width (480px) through dot notation and divide by two (240px)
var x = canvas.width/2;

// y holds a number value where we grab the canvas's height (320px) through dot notation and minus it by 30 (290px)
var y = canvas.height-30;

var dx = 2;
var dy =- 2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// The default score will always remain zero. We will make it change when we put it in the appropriate function.
var score = 0;
// We store in a variable the number of lives the player has. We'll use this for later in a function.
var lives = 3;


/* With dot notation, we're injecting into the document an addEventListener() function that passes three parameters
The first parameter in quotes (('keydown') or ('keyup')) refer to a string that specifies the name of the event,
The second parameter ponts to a function ((keyDownHandler) and (keyUpHandler) that run when the function occurs. 
The last parameter is a useCapture, which is an option boolean value. If true, it executes the event handler in the
capturing phase. If false, it is set at a default, where the event handler is executed in the bubbling phase) */
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false)

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}

// This is our bricks array, which will store drawn object images of our bricks as objects 
var bricks = [];
for(c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(r = 0; r < brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function keyDownHandler(e){

	if(e.keyCode == 39){
		
		rightPressed = true;
		
		}
		else if(e.keyCode == 37){
		
		leftPressed = true;
		
		}
		
	}
	
function keyUpHandler(e){

	if(e.keyCode == 39){
		
		rightPressed = false;
	}
	else if(e.keyCode == 37){
		
		leftPressed = false;
		
		}
	}

// We're going to create a function called drawBall() that draws the ball object of our Breakout Game
function drawBall(){

/* There's ctx below! It's our two dimensional plane that we created by using dot notation on our canvas variable
and evoking the getContext() function where we passed '2d' in the parameter.

We begin by using dot notation (the dot can be seen as an puncture mark for a syringe, with the following method
as the formula we wish to fill it with.) The beginPath() method always needs a closePath() method that follows.
When we beginPath() we begin a starting point for our 2d object to begin. 

Look at beginPath() as a pencil being placed down. What's in between it is the pencil's drawing style. The pencil
lifts off the paper when we use clothPath();
*/
	ctx.beginPath();
/* .arc() method is used to create an arc/curve that allows us to make circles or parts of circles. 
Its parameters take the following:
• the x-coordinate of the center of the circle - where it's placed on the x y axis (here we use our variable x)
• the y-coordinate of the center of the circle - where it's placed on the x y axis (here we use our variable y)
• the radius of the circle (we are using our ballRadius equal to 10)
• the sAngle (starting angle) (where our angle starts, in radians - 0 is at the 3 o'clock position of our arc's circle)
• the eAngle (ending angle) (in radians)
• counterclockwise (we won't worry about that yet, but it specifies whether we draw the arc clockwise or counterclockwise)
*/
	ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
	ctx.fillStyle='lime';
	ctx.fillStroke='#ff4d4d';
	ctx.Stroke='10';
	ctx.fill();
	ctx.closePath();
	}

// The drawPaddle() function 
function drawPaddle(){
/* Whenever we call the beginPath() and closePath() methods, we're opening up a space to draw something.
In this case, with dot notation, we will be drawing on our ctx variable equal to canvas.getContext('2d')*/
	ctx.beginPath();
/* the rect() method draws a rectangle for us. In the parameters we pass (x-coordinate of the upper-left corner
of the rectangle, y-coordinate of the upper-left corner of the rectangle, the width, and the height (in pixels)) */
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
/* the fillstyle is a property that sets the color, gradient, or pattern used to fill a drawing. In this case
We are filling our paddle color with the set hex code below*/ 
	ctx.fillStyle='red';
// The fill() method will fill our ctx variable. fillStyle gathers the paint, fill() method fills the object w/ that paint
	ctx.fill();
// Since we're done drawing, we use the closePath() method to finish up our path of artistic manipulation
	ctx.closePath();
	}

// This function will draw out our bricks
function drawBricks() {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth+brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight+brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount * brickColumnCount) {
                    	alert('YOU WIN, CONGRATULATIONS!');
                    	document.location.reload();
                    }
                }
            }
        }
    }
}

// This function's sole purpose is to apply a font with a style and text that keeps track of our score.
function drawScore() {
	// The font style on our ctx variable 2d object will be 16 pixels with an Arial font
	ctx.font = '16px Arial';
	// The .fillStyle method will give our drawScore() font text an ocean blue color
	ctx.fillStyle = '#0095DD';
	/* The .fillText method first takes a string ('Score: ') or number (score) 
	that will be displayed in the x (8) y (20) coordinates */
	ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives(){
	// ctx is our contexted (.getContext('2d')) 2d canvas object, which will have a 16 pixel Arial font 
	ctx.font = '16px Arial';
	// The .fillStyle will make oure '16px Arial' black, 
	ctx.fillStyle = 'black';
	/* The .fillText method will place the string 'Lives: ' and variable lives on 
	the designated x (canvas.width - 64) y (20) coordinates */
	ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}


function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

 if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
			 if(y= y-paddleHeight){
            dy = -dy  ;
			 }
        }
        else {
            lives--;
            if(!lives) {
            	// Upon the loss of all lives (!lives mean no(t) lives), we get a popup browser alert that says 'GAME OVER'
            	alert('GAME OVER');
            	// Upon the loss of all lives (!lives means no(t) lives) the document (index.html, in this case) reloads
            	document.location.reload();
            }
            else {
            	x = canvas.width/2;
            	y = canvas.height - 30;
            	dx = 2;
            	dy = -2;
            	paddleX = (canvas.width - paddleWidth)/2;
            }
        }
    }

	if (rightPressed && paddleX < canvas.width-paddleWidth){
		
		paddleX += 7;
		}
	 else if (leftPressed && paddleX > 0 ){
		 paddleX -= 7;
		 
		 }
		 
		 x = x + dx;
	     y = y + dy;

	     requestAnimationFrame(draw);
	}

draw();