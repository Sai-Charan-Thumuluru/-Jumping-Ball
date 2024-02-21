let ball = document.getElementById('ball');
let block = document.getElementById('block');
let gameFinish = document.getElementById('game-finish');
let score = document.getElementById('score');
let goal = document.getElementById('goal');
let timer = document.getElementById('timer');
let scoreCount = 0;
const target = 25;

goal.innerHTML = `<span style='color: black; font-family: Courier; font-size: 90%; position: absolute; left: 40%; top: 3%'>Goal:${target}</span>`;
score.innerHTML = `<span style='color: black; font-family: Courier; font-size: 90%; position: absolute; left: 3%; top: 3%'>Score:${scoreCount}</span>`;

let seconds = 0;

function updateTimer() {
    timer.innerHTML = `<span style='color: black; font-family: Courier; font-size: 90%; position: absolute; left: 75%; top: 3%'>Timer: ${seconds}</span>`;
    seconds += 1;
}

updateTimer();
let timerInterval = setInterval(updateTimer, 1000);

document.addEventListener('keydown', event => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
      jump();
    }
});


function jump() {
    if (ball.classList !== 'animate' && ball.style.animationPlayState !== 'paused') {
        ball.classList.add('animate');
    }
    
    setTimeout(function() {
        ball.classList.remove('animate');
    }, 500);
}

function showScore() {
    score.innerHTML = `<span style='color: black; font-family: Courier; font-size: 90%; position: absolute; left: 3%; top: 3%'>Score:${scoreCount}</span>`;
    scoreCount++

    if (scoreCount > target) {
        finishGame('YOU WON', 'gold', 'black', '37%');
    }
}

let scoreInterval = setInterval(showScore, 500);



let checkLife = setInterval(function() {
    const ballHead = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    
    if (ballHead >= 130 && (blockLeft < 45 && blockLeft > 0)) {
        block.style.animationPlayState = ball.style.animationPlayState = 'paused';
        finishGame('GAME OVER', 'red', 'red', '33%');
    }

}, 10);

function finishGame(finishMessage, textColor, textStrokeColor, leftOfMsg) {
    clearInterval(timerInterval);
    clearInterval(scoreInterval);

    setTimeout(function() {
        gameFinish.innerHTML = `<span style='color: ${textColor}; -webkit-text-stroke: 1px ${textStrokeColor}; font-family: Courier; position: absolute; left: ${leftOfMsg}; top: 40%'>${finishMessage}</span>
        <button id="play-again" onclick="refreshPage()">REPLAY</button>`;
        block.style.display = ball.style.display = 'none';
    }, 700);
}

function refreshPage() {
    location.reload();
}



