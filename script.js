'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

function init(){

 scores = [0, 0];
 currentScore = 0;
 activePlayer = 0;
 playing = true;


score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;

player0.classList.remove('player--winner');
player1.classList.remove('player--winner');
player0.classList.add('player--active');
player1.classList.remove('player--active');


}

init();

function switchPlayer(){

   currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active')
}
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if(playing){
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  //2.Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3.Check for rolled 1
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switch to next player
    // currentScore = 0;
    // document.getElementById(`current--${activePlayer}`).textContent =
    //   currentScore;
    // activePlayer = activePlayer === 0 ? 1 : 0;
    // player0.classList.toggle('player--active');
    // player1.classList.toggle('player--active');
    switchPlayer();
  }
}
});

//hold button

btnHold.addEventListener('click', function(){

  if(playing){
//1. Add the current score to the active player score
//2. Check if score >= 100

scores[activePlayer] += currentScore;

document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

if(scores[activePlayer] >= 20){

  playing = false;

  document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);

  document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);

  diceEl.classList.add('hidden');

}else{
  //switch the user
  switchPlayer();
}
}
})

btnNew.addEventListener('click',init)