let player1Score = Number(document.querySelector('.player1-score').innerHTML);
let player2Score = Number(document.querySelector('.player2-score').innerHTML);
let remainingBalls = Number(document.querySelector('.remaining-balls').innerHTML);
const player1Name = localStorage.getItem('player1-name');
const player2Name = localStorage.getItem('player2-name');

let player1Owe = 0;
let player2Owe = 0;

let player1High = 0;
let player2High = 0;

let player1HighTemp = 0;
let player2HighTemp = 0;

if (player1Name === null){
  player1Name = 'Player 1';
}
if (player2Name === null){
  player2Name = 'Player 2';
}

window.onload = function(){
  if (player1Name){
    document.getElementById('player1').textContent = player1Name;
  }
  if (player2Name){
    document.getElementById('player2').textContent = player2Name;
  }
}

function calRemainingBalls(potted){
  remainingBalls = Number(document.querySelector('.remaining-balls').innerHTML - potted);
  if (remainingBalls > 15){
    remainingBalls = 15;
  }
  else if (remainingBalls === 1){
    document.querySelector('.remaining-balls').innerHTML = 15;
  }
  else{
    document.querySelector('.remaining-balls').innerHTML = remainingBalls;
  }
}

function incrementPlayerOne(){
  if (player1Owe != 0){
    player1Owe--;
    if (player1Owe === 1){
      document.querySelector('.player1-owe').innerHTML = `Player Owes 1 Ball`;
    }
    else{
      document.querySelector('.player1-owe').innerHTML = `Player Owes ${player1Owe} Ball`;
    }
  }
  else{
    calRemainingBalls(1);
  }
  player1Score++;
  document.querySelector('.player1-score').innerHTML = player1Score;

  player2HighTemp = 0;
  player1HighTemp++;
  if (player1HighTemp > player1High){
    player1High = player1HighTemp;
    document.querySelector('.player1-high-run').innerHTML = `High Run: ${player1High}`;
  }
}

function increment2PlayerOne(){
  player1Score+=2;
  document.querySelector('.player1-score').innerHTML = player1Score;
  calRemainingBalls(2);
}

function increment14PlayerOne(){
  player1Score+=14;
  document.querySelector('.player1-score').innerHTML = player1Score;
  calRemainingBalls(14);
}

function decrementPlayerOne(){
  if (remainingBalls >= 15){
    player1Owe++;
    if (player1Owe === 1){
      document.querySelector('.player1-owe').innerHTML = `Player Owes 1 Ball`;
    }
    else{
      document.querySelector('.player1-owe').innerHTML = `Player Owes ${player1Owe} Ball`;
    }
  }

  player1Score--;
  document.querySelector('.player1-score').innerHTML = player1Score;
  calRemainingBalls(-1);
}

function incrementPlayerTwo(){
  if (player2Owe != 0){
    player2Owe--;
    if (player2Owe === 1){
      document.querySelector('.player2-owe').innerHTML = `Player Owes 1 Ball`;
    }
    else{
      document.querySelector('.player2-owe').innerHTML = `Player Owes ${player2Owe} Ball`;
    }
  }
  else{
    calRemainingBalls(1);
  }

  player2Score++;
  document.querySelector('.player2-score').innerHTML = player2Score;

  player1HighTemp = 0;
  player2HighTemp++;
  if (player2HighTemp > player2High){
    player2High = player2HighTemp;
    document.querySelector('.player2-high-run').innerHTML = `High Run: ${player2High}`;
  }
}

function increment2PlayerTwo(){
  player2Score+=2;
  document.querySelector('.player2-score').innerHTML = player2Score;
  calRemainingBalls(2);
}


function increment14PlayerTwo(){
  player2Score+=14;
  document.querySelector('.player2-score').innerHTML = player2Score;
  calRemainingBalls(14);
}

function decrementPlayerTwo(){
  if (remainingBalls >= 15){
    player2Owe++;
    if (player2Owe === 1){
      document.querySelector('.player2-owe').innerHTML = `Player Owes 1 Ball`;
    }
    else{
      document.querySelector('.player2-owe').innerHTML = `Player Owes ${player2Owe} Ball`;
    }
  }

  player2Score--;
  document.querySelector('.player2-score').innerHTML = player2Score;
  calRemainingBalls(-1);
}