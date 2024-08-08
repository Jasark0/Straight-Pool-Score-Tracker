let player1Score = Number(document.querySelector('.player1-score').innerHTML);
      let player2Score = Number(document.querySelector('.player2-score').innerHTML);
      const player1Name = localStorage.getItem('player1-name');
      const player2Name = localStorage.getItem('player2-name');

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

      function incrementPlayerOne(){
        player1Score++;
        document.querySelector('.player1-score').innerHTML = player1Score;
      }

      function increment2PlayerOne(){
        player1Score+=2;
        document.querySelector('.player1-score').innerHTML = player1Score;
      }
      
      function increment5PlayerOne(){
        player1Score+=5;
        document.querySelector('.player1-score').innerHTML = player1Score;
      }

      function increment14PlayerOne(){
        player1Score+=14;
        document.querySelector('.player1-score').innerHTML = player1Score;
      }

      function decrementPlayerOne(){
        player1Score--;
        document.querySelector('.player1-score').innerHTML = player1Score;
      }

      function incrementPlayerTwo(){
        player2Score++;
        document.querySelector('.player2-score').innerHTML = player2Score;
      }

      function increment2PlayerTwo(){
        player2Score+=2;
        document.querySelector('.player2-score').innerHTML = player2Score;
      }

      function increment5PlayerTwo(){
        player2Score+=5;
        document.querySelector('.player2-score').innerHTML = player2Score;
      }

      function increment14PlayerTwo(){
        player2Score+=14;
        document.querySelector('.player2-score').innerHTML = player2Score;
      }

      function decrementPlayerTwo(){
        player2Score--;
        document.querySelector('.player2-score').innerHTML = player2Score;
      }