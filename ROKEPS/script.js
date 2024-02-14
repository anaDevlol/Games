let score = JSON.parse(localStorage.getItem('score')) || { Wins: 0, losses: 0, ties: 0 };
document.querySelector('.js-score').innerHTML = `wins: ${score.Wins} losses: ${score.losses},   ties: ${score.ties}`


let isAutoPlaying = false;
let intervalId;
const buttonElement = document.querySelector('.js-auto-play-button');

document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        if (!isAutoPlaying) {
            intervalId = setInterval(function () {
                const playermove = pickcomputermove();
                playgame(playermove);
            }, 1000);
            isAutoPlaying = true
        } else {
            clearInterval(intervalId);
            isAutoPlaying = false;
        }

        if (buttonElement.innerText === 'Auto Play') {
            buttonElement.innerHTML = 'Stop Playing';
            buttonElement.classList.add('Stop-it');
        } else {
            buttonElement.innerHTML = 'Auto Play';
            buttonElement.classList.remove('Stop-it');
        }

    })

document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        score.Wins = 0;
        score.losses = 0;
        score.ties = 0;

        localStorage.removeItem('score')
        updatescoreElement()
    })

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playgame('rock')
    })
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playgame('paper')
    })
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playgame('scissors')
    })

document.addEventListener('keydown', (event) => {
    
    if (event.key === 'r') {
        playgame('rock');
    } else if (event.key === 'p') {
        playgame('paper');
    } else if (event.key === 's') {
        playgame('scissors');
    }
});


function playgame(playermove) {
    const computermove = pickcomputermove();
    let result = '';


    if (playermove === 'scissors') {
        if (computermove === 'rock') {
            result = 'you lose.'
        } else if (computermove === 'paper') {
            result = 'you win.'
        } else if (computermove === 'scissors') {
            result = 'you tie.'
        }
    } else if (playermove === 'paper') {
        if (computermove === 'rock') {
            result = 'you win.';
        } else if (computermove === 'paper') {
            result = 'you tie.'
        } else if (computermove === 'scissors') {
            result = 'you lose.'
        }
    } else if (playermove === 'rock') {
        if (computermove === 'rock') {
            result = 'you tie.'
        } else if (computermove === 'paper') {
            result = 'you lose.'
        } else if (computermove === 'scissors') {
            result = 'you win.';
        }
    }
    if (result === 'you win.') {
        score.Wins += 1;
    } else if (result === 'you lose.') {
        score.losses += 1;
    } else if (result === 'you tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score))
    updatescoreElement()

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML
        = `you
    <img src="image/removal-${playermove}.png"
    class="ch-icon">
    <img src="image/removal-${computermove}.png"
    class="ch-icon">
    Computer`;
}

function updatescoreElement() {
    document.querySelector('.js-score').innerHTML = `wins:${score.Wins},losses: ${score.losses},ties: ${score.ties}`
}

function pickcomputermove() {
    const randomnumber = Math.random()
    let computermove = '';
    if (randomnumber >= 0 && randomnumber < 1 / 3) {
        computermove = 'rock'
    } else if (randomnumber >= 1 / 3 && randomnumber < 2 / 3) {
        computermove = 'paper'
    } else if (randomnumber >= 2 / 3 && randomnumber < 1) {
        computermove = 'scissors'
    }

    return computermove;

}
