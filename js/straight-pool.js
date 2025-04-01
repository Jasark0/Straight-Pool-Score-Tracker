player1Name = localStorage.getItem('player1-name');
player2Name = localStorage.getItem('player2-name');

let player1Score = Number(document.querySelector('.player1-score').innerHTML);
let player2Score = Number(document.querySelector('.player2-score').innerHTML);
let remainingBalls = Number(document.querySelector('.remaining-balls').innerHTML);
let rackNum = 1;

let player1Owe = 0; //player1 owed balls
let player2Owe = 0; //player2 owed balls
let playerSpot = 0; //alert to spot balls

let player1High = 0; //player1 high run
let player2High = 0; //player2 high run
let player1HighTemp = 0; //current player1 high run
let player2HighTemp = 0; //current player2 high run

let player1CFoul = 0; //player1 consecutive fouls: 3 consecutive leads to serious foul
let player2CFoul = 0; //player2 consecutive fouls: 3 consecutive leads to serious foul

let player1Turn = true; //determines the player turn

if (player1Name === null){
  player1Name = "Player 1";
}
if (player2Name === null){
  player2Name = 'Player 2';
}

window.onload = function(){ //on load, player names and turn name is identified
  if (player1Name){
    document.getElementById('player1').textContent = player1Name;
    document.getElementById('player-turn-text').textContent = `${player1Name}'s Turn`;
  }
  if (player2Name){
    document.getElementById('player2').textContent = player2Name;
  }
}

document.addEventListener("keydown", function(event){ //space to switch turns
  if (event.code === "Space"){
    event.preventDefault();
    if (player1Turn){
      player1Turn = false;
      document.getElementById('player-turn-text').textContent = `${player2Name}'s Turn`;
      document.getElementById('player-turn').src = "/images/rightArrow.png";

      player1HighTemp = 0;
      document.querySelector('.player1-curr-high-run').innerHTML = `Current High Run: ${player1HighTemp}`;
    }
    else{
      player1Turn = true;
      document.getElementById('player-turn-text').textContent = `${player1Name}'s Turn`;
      document.getElementById('player-turn').src = "/images/leftArrow.png";

      player2HighTemp = 0;
      document.querySelector('.player2-curr-high-run').innerHTML = `Current High Run: ${player2HighTemp}`;
    }

    if (playerSpot != 0){
      alert(`Spot ${playerSpot} balls please!`);
      remainingBalls += playerSpot;
      document.querySelector('.remaining-balls').innerHTML = remainingBalls;
      playerSpot = 0;
    }
  }

  if (event.code === "ArrowLeft"){
    if (player1Turn){
      decrementPlayerOne();
    }
    else{
      decrementPlayerTwo();
    }
  }

  if (event.code === "ArrowRight"){
    if (player1Turn){
      incrementPlayerOne();
    }
    else{
      incrementPlayerTwo();
    }
  }
});

function calRemainingBalls(potted){ //calculates the remaining balls currently
  remainingBalls = Number(document.querySelector('.remaining-balls').innerHTML - potted);
  if (remainingBalls > 15){
    remainingBalls = 15;
  }
  else if (remainingBalls === 1){
    remainingBalls = 15;
    document.querySelector('.remaining-balls').innerHTML = remainingBalls;

    if (playerSpot != 0){
      alert(`Spot ${playerSpot} balls please!`);
      remainingBalls = 1 + playerSpot;
      document.querySelector('.remaining-balls').innerHTML = remainingBalls;
      playerSpot = 0;
    }
    else{
      rackNum++;
      document.querySelector('.rack-number').innerHTML = `(Rack ${rackNum})`;
    }
  }
  else{
    document.querySelector('.remaining-balls').innerHTML = remainingBalls;
  }
}

function incrementOwe(player){
  if (player === "player1"){
    player1Owe--;
    playerSpot++;
    document.querySelector('.player1-owe').innerHTML = `Player Owes ${player1Owe} Balls`;
  }
  else if (player === "player2"){
    player2Owe--;
    playerSpot++;
    document.querySelector('.player2-owe').innerHTML = `Player Owes ${player2Owe} Balls`;
  }
}

function incrementPlayerOne(){
  if (!player1Turn){
    if (playerSpot != 0){
      alert(`Spot ${playerSpot} balls please!`);
      remainingBalls += playerSpot;
      document.querySelector('.remaining-balls').innerHTML = remainingBalls;
      playerSpot = 0;
    }

    player1Turn = true;
    document.getElementById('player-turn-text').textContent = `${player1Name}'s Turn`;
    document.getElementById('player-turn').src = "/images/leftArrow.png";

    player2HighTemp = 0;
    document.querySelector('.player2-curr-high-run').innerHTML = `Current High Run: ${player2HighTemp}`;
  }
  
  player1Score++;
  player1HighTemp++;
  player1CFoul = 0;

  if (player1Owe != 0){
    incrementOwe("player1");
  }
  else if (player2Owe != 0){
    incrementOwe("player2");
  }

  calRemainingBalls(1);

  if (player1HighTemp > player1High){
    player1High = player1HighTemp;
    document.querySelector('.player1-high-run').innerHTML = `High Run: ${player1High}`;
  }
  
  document.querySelector('.player1-score').innerHTML = player1Score;
  document.querySelector('.player1-curr-high-run').innerHTML = `Current High Run: ${player1HighTemp}`;
}

function increment2PlayerOne(){
  incrementPlayerOne();
  incrementPlayerOne();
}

function incrementRestPlayerOne(){
}

function decrementPlayerOne(){
  player1Score--;
  player1CFoul++;
  player1HighTemp = 0;
  player2HighTemp = 0;

  if (player1CFoul === 3){ //serious foul condition: -15 score, reset rack
    player1CFoul = 0;

    alert(`A serious foul committed: 3 foul rule. At this time, ${player1Name} must rerack all balls, and proceed to break. Please read rule 4.11 for more information.`);
    remainingBalls = 15;
    player1Score -= 15;
    player1Owe = 0;

    document.querySelector('.remaining-balls').innerHTML = remainingBalls;
    document.querySelector('.player1-score').innerHTML = player1Score;
    document.querySelector('.player1-owe').innerHTML = `Player Owes 0 Balls`;
  }
  else if (remainingBalls === 15){
    player1Owe++;
    document.querySelector('.player1-owe').innerHTML = `Player Owes ${player1Owe} Balls`;
    document.querySelector('.player1-score').innerHTML = player1Score;

    player1Turn = false;
    document.getElementById('player-turn-text').textContent = `${player2Name}'s Turn`;
    document.getElementById('player-turn').src = "/images/rightArrow.png";
  }
  else{
    document.querySelector('.player1-score').innerHTML = player1Score;
    calRemainingBalls(-1);
    alert(`Spot 1 ball please!`);
    remainingBalls++;
    document.querySelector('.remaining-balls').innerHTML = remainingBalls;

    player1Turn = false;
    document.getElementById('player-turn-text').textContent = `${player2Name}'s Turn`;
    document.getElementById('player-turn').src = "/images/rightArrow.png";
  }

  document.querySelector('.player1-curr-high-run').innerHTML = `Current High Run: ${player1HighTemp}`;
}



//player 2 functions

function incrementPlayerTwo(){
  if (player1Turn){
    if (playerSpot != 0){
      alert(`Spot ${playerSpot} balls please!`);
      remainingBalls += playerSpot;
      document.querySelector('.remaining-balls').innerHTML = remainingBalls;
      playerSpot = 0;
    }

    player1Turn = false;
    document.getElementById('player-turn-text').textContent = `${player2Name}'s Turn`;
    document.getElementById('player-turn').src = "/images/rightArrow.png";

    player1HighTemp = 0;
    document.querySelector('.player1-curr-high-run').innerHTML = `Current High Run: ${player1HighTemp}`;
  }
  
  player2Score++;
  player2HighTemp++;
  player2CFoul = 0;

  if (player2Owe != 0){
    incrementOwe("player2");
  }
  else if (player1Owe != 0){
    incrementOwe("player1");
  }
  
  calRemainingBalls(1);

  if (player2HighTemp > player2High){
    player2High = player2HighTemp;
    document.querySelector('.player2-high-run').innerHTML = `High Run: ${player2High}`;
  }

  document.querySelector('.player2-score').innerHTML = player2Score;
  document.querySelector('.player2-curr-high-run').innerHTML = `Current High Run: ${player2HighTemp}`;
}

function increment2PlayerTwo(){
  incrementPlayerTwo();
  incrementPlayerTwo();
}


function incrementRestPlayerTwo(){

}

function decrementPlayerTwo(){
  player2Score--;
  player2CFoul++;
  player1HighTemp = 0;
  player2HighTemp = 0;

  if (player2CFoul === 3){ //serious foul condition: -15 score, reset rack
    player2CFoul = 0;

    alert(`A serious foul committed: 3 foul rule. At this time, ${player2Name} must rerack all balls, and proceed to break. Please read rule 4.11 for more information.`);
    remainingBalls = 15;
    player2Score -= 15;
    player2Owe = 0;

    document.querySelector('.remaining-balls').innerHTML = remainingBalls;
    document.querySelector('.player2-score').innerHTML = player1Score;
    document.querySelector('.player2-owe').innerHTML = `Player Owes 0 Balls`;
  }
  else if (remainingBalls === 15){
    player2Owe++;
    document.querySelector('.player2-owe').innerHTML = `Player Owes ${player2Owe} Balls`;
    document.querySelector('.player2-score').innerHTML = player2Score;

    player1Turn = true;
    document.getElementById('player-turn-text').textContent = `${player1Name}'s Turn`;
    document.getElementById('player-turn').src = "/images/leftArrow.png";
  }
  else{
    document.querySelector('.player2-score').innerHTML = player2Score;
    calRemainingBalls(-1);
    alert(`Spot 1 ball please!`);
    remainingBalls++;
    document.querySelector('.remaining-balls').innerHTML = remainingBalls;

    player1Turn = true;
    document.getElementById('player-turn-text').textContent = `${player1Name}'s Turn`;
    document.getElementById('player-turn').src = "/images/leftArrow.png";
  }

  document.querySelector('.player2-curr-high-run').innerHTML = `Current High Run: ${player2HighTemp}`;
}