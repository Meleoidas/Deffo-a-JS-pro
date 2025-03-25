let button1 = document.querySelector('.button1');
let score1 = document.querySelector('.score');
let startTime, timeoutId, timeoutGameId, timeoutTime=0;
let inGame = false, canClick = false;

function button1Play(){
  if(!inGame){
    timeoutTime = Math.floor(Math.random() * 2000) + 1000;

    inGame = true;
    button1.classList.add('button1InGameWait');
    button1.innerHTML = 'Wait';

    timeoutId = setTimeout(function(){

      button1.classList.remove('button1InGameWait');
      button1.classList.add('button1InGameClick');
      button1.innerHTML = 'Click';

      canClick = true;
      startTime = performance.now();

    }, timeoutTime);

    timeoutGameId = setTimeout(function(){
      endGame();
      button1.innerHTML = 'Too late!';
    }, timeoutTime + 4000);

  }else{
    clearTimeout(timeoutId);
    clearTimeout(timeoutGameId);

    if(canClick){
      let endTime = performance.now();
      let score = Math.round(endTime - startTime) + 'ms';
      button1.innerHTML = score;
      score1.innerHTML = score + ' ' + score1.innerHTML;
      canClick = false;
    }else{
      button1.innerHTML = 'Too early';
    }

    endGame();
  
  }
}

function endGame(){
  inGame = false;
  canClick = false;
  button1.classList.remove('button1InGameClick');
  button1.classList.remove('button1InGameWait');
}