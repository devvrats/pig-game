'use strict';
let currentscore, activePlayer;
let playing = true;
let score = [0, 0];
let dice = document.querySelector('.dice').classList.add('hidden');

function reset() {
  let player0Score = document.querySelector('#score--0');
  let player1Score = document.querySelector('#score--1');
  playing = true;

  currentscore = 0;
  activePlayer = 0;

  player0Score.textContent = 0;
  player1Score.textContent = 0;
  document.querySelector(`#current--0`).textContent = currentscore;
  document.querySelector(`#current--1`).textContent = currentscore;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
}
reset();
function switchplayer() {
  currentscore = 0;

  document.querySelector(`#current--${activePlayer}`).textContent =
    currentscore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  for (let i = 0; i < document.querySelectorAll('.player').length; i++) {
    document.querySelectorAll('.player')[i].classList.toggle('player--active');
  }
}
function rolldice() {
  if (playing) {
    let random = Math.trunc(Math.random() * 6) + 1;

    // console.log(document.querySelectorAll('.player'));
    // document.querySelector('.dice').setAttribute('src', `dice-${random}.png`);
    document.querySelector('.dice').src = `dice-${random}.png`;
    document.querySelector('.dice').classList.remove('hidden');
    currentscore += random;
    if (random === 1) {
      switchplayer();
    }

    document.querySelector(`#current--${activePlayer}`).textContent =
      currentscore;
  }
}

function scorehold() {
  if (playing) {
    score[activePlayer] += currentscore;

    if (score[activePlayer] < 100) {
      document.querySelector(`#score--${activePlayer}`).textContent =
        score[activePlayer];

      switchplayer();
    } else {
      document.querySelector(`#score--${activePlayer}`).textContent =
        score[activePlayer];

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector('.dice').classList.add('hidden');
      playing = false;
    }
  }
}
document.querySelector('.btn--new').addEventListener('click', reset);

document.querySelector('.btn--roll').addEventListener('click', rolldice);
document.querySelector('.btn--hold').addEventListener('click', scorehold);
