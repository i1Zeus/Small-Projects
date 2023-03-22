/*
todo //// update loop
todo //// classes :
{
*  ////  ball, 
*  ////  paddle, 
*  ////  game
}
*/
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

//* ball
const ball = new Ball(document.getElementById("ball"));

//* player
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const playerScore = document.getElementById("player-score");

//* computer
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const computerScore = document.getElementById("computer-score");

//* pause button
const pauseButton = document.getElementById("pause-button");
let paused = true;

//* pause button event
pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.innerText = paused ? "Play" : "Stop";
    ball.reset();
    computerPaddle.reset();
    playerScore.innerText = 0;
    computerScore.innerText = 0;
    ball.x = 50;
    ball.y = 50;
    lastTime = null;
});

//* update loop
let lastTime;
const update = (time) => {
    if (!paused) {
        if (lastTime != null) {
            const delta = time - lastTime;
            //* Update Code
            ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            computerPaddle.update(delta, ball.y);
            if (isLose()) handelLose();
        }
        lastTime = time;
    }
    window.requestAnimationFrame(update);
};

//* lose handel
const isLose = () => {
    if (!paused) {
        const rect = ball.rect();
        return rect.left <= 0 || rect.right >= window.innerWidth;
    }
};

//* lose Function
const handelLose = () => {
    const rect = ball.rect();
    if (rect.right <= window.innerWidth) {
        computerScore.innerText = parseInt(computerScore.innerText) + 1;
    } else {
        playerScore.innerText = parseInt(playerScore.innerText) + 1;
    }
    ball.reset();
    computerPaddle.reset();
    if (
        parseInt(playerScore.innerText) >= 10 ||
        parseInt(computerScore.innerText) >= 10
    ) {
        alert("Game Over");
        paused = true;
    }
};

//* mouse move event for the player paddle
document.addEventListener("mousemove", (e) => {
    if(paused) return;
    playerPaddle.position = (e.y / window.innerHeight) * 100;
});

//* updating with every frame
window.requestAnimationFrame(update);

//!bad practice not good for performance & not accurate
// setInterval(update, 1000 / 60);
//* good practice
// window.requestAnimationFrame(update);
