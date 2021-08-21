'use strict';
alert(
  'THE RULES OF THE GAME\n1.Roll the dice\n2.The number you get on the dice will be added to your current score\n3.Press hold button to add the current score to your points table\n4.If you get 1 on the dice the Player changes and you cannot add your current score to the points table\n5.The Player who scores 100 points will be the winner\n6.Click ok to begin the game.'
);
const score0El = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let cs, ap, playing, scores;

const init = function () {
  scores = [0, 0];
  cs = 0;
  ap = 0;
  playing = true;

  score0El.textContent = '0';
  score1EL.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';
  diceEL.classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  document.querySelector(`.player--0`).classList.remove(`player--winner`);
  document.querySelector(`.player--1`).classList.remove(`player--winner`);
  document.getElementById(`name--0`).textContent = 'PLAYER 1';
  document.getElementById(`name--1`).textContent = 'PLAYER 2';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${ap}`).textContent = 0;
  cs = 0;
  ap = ap === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      cs += dice;
      document.getElementById(`current--${ap}`).textContent = cs;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[ap] += cs;
    document.getElementById(`score--${ap}`).textContent = scores[ap];

    if (scores[ap] >= 10) {
      playing = false;
      document.querySelector(`.player--${ap}`).classList.add(`player--winner`);
      document
        .querySelector(`.player--${ap}`)
        .classList.remove('player--active');
      document.getElementById(`name--${ap}`).textContent = 'Winner';
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
