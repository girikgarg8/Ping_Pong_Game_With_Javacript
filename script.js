//Update loop
import Ball from './Ball.js'
import Paddle from './Paddle.js'
const ball=new Ball(document.getElementById("ball"));
const playerPaddle=new Paddle(document.getElementById("player-paddle"));
let lastTime
const computerPaddle=new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem=document.getElementById("player-score");
const computerScoreElem=document.getElementById("computer-score");
function update(time){
	if (lastTime!=null){
	const delta=time-lastTime;
	//Update code
	ball.update(delta,[playerPaddle.rect(),computerPaddle.rect()]);
	computerPaddle.update(delta,ball.y)
	if (isLose()){
		handleLose();
	  }
	}
	lastTime=time;
	window.requestAnimationFrame(update);
}
function handleLose(){
	const rect = ball.rect()
	if (rect.right>=window.innerWidth){
		playerScoreElem.textContent=parseInt(playerScoreElem.textContent)+1;
	}
	else{
		computerScoreElem.textContent=parseInt(computerScoreElem.textContent)+1;
	}
	ball.reset();
	computerPaddle.reset();
}
function isLose(){
	const rect=ball.rect();
	return rect.right>=window.innerWidth || rect.left<=0;
}
document.addEventListener("mousemove",function(e){
	playerPaddle.position=(e.y/window.innerHeight)*100; //this is done because in the CSS file,calaculation is done in viewport height units
}
);
window.requestAnimationFrame(update);