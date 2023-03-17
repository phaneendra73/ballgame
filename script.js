
const ball = document.getElementById("ball");
const grid = document.querySelector(".grid");
var paddle = document.getElementById("paddle");
var blocks = Array.from(document.querySelectorAll(".grid div"))
var ballDirectionY = 1;
var ballDirectionX = 1;

// moving the ball
function moveBall() {
    var ballRight = parseInt(window.getComputedStyle(ball).getPropertyValue("right"));
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    ball.style.right = (ballRight + (10 * ballDirectionX)) + "px";
    ball.style.top = (ballTop - (10 * ballDirectionY)) + "px";
}
//chnage direction of ball on collision with walls
function changeDirection() {
    var ballRight = parseInt(window.getComputedStyle(ball).getPropertyValue("right"));
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));

    if (ballTop < 0) {
        ballDirectionY = -ballDirectionY
    }
    else if (ballRight < 0 || ballRight > innerWidth) {
        ballDirectionX = -ballDirectionX

    }

}
function remove() {
    blocks.forEach(block => {
        var blockPosition = block.getBoundingClientRect();
        var ballPosition = ball.getBoundingClientRect();
        var removedBlock = block.classList.contains("remove");
        if (blockPosition.left < ballPosition.right &&
            blockPosition.right > ballPosition.left &&
            blockPosition.top < ballPosition.bottom &&
            blockPosition.bottom > ballPosition.top &&
            !removedBlock) {
            block.style.visibility = "hidden";
            block.classList.add("remove");
            ballDirectionY = -ballDirectionY;
        }
    })
}
window.addEventListener("mousemove", movePaddle)
//  control the paddle position with mouse
function movePaddle(e) {
    mousePosition = {
        x: e.clientX,
        y: e.clientY
    }
    if (mousePosition.x < innerWidth - 70) {
        paddle.style.left = mousePosition.x + "px"
    }
}

function collision() {
    var paddlePosition = paddle.getBoundingClientRect();
    var ballPosition = ball.getBoundingClientRect();
    if (paddlePosition.left < ballPosition.right &&
        paddlePosition.right > ballPosition.left &&
        paddlePosition.top < ballPosition.bottom &&
        paddlePosition.bottom > ballPosition.top) {
        ballDirectionY = -ballDirectionY;
    }

}
function gameover() {
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    if (ballTop > innerHeight) {
        clearInterval(clr)
        const result = document.getElementById("result");
        result.style.display = "block";
        grid.style.display = "none";
        const box = document.getElementById("box");
        box.style.display = "none";

    }

}





function start() {
    moveBall()
    changeDirection()
    remove()
    collision()
    gameover()

}
const clr= setInterval(start, 40);
