let bal = JSON.parse(localStorage.getItem('bal'));
let aiCasa;
if(bal){
  aiCasa = JSON.parse(localStorage.getItem('aiCasa'));
}else{
  bal = 1000;
  aiCasa = true;
}


let pret, pretTempTemp, alegere;
let prevPret, prevPretTemp, prevAlegere;



function updateBal(){
  document.querySelector('.bal').innerHTML = `Bal: $${bal}`;
}
function updateCasa(){
  document.querySelector('.casa').innerHTML = `Ai casa: ${aiCasa}`
}
updateBal();
updateCasa();




function gambleTime(){
  let alegereaRobotului;
  let num = Math.random();
  if(num <= 1/2)
    alegereaRobotului = 'heads';
  else
    alegereaRobotului = 'tails';

  if(alegere === alegereaRobotului){
    document.querySelector(`.wl`).innerHTML = 'WIN!'
    bal += pret*2;
    updateBal();
    
  }else{
    document.querySelector(`.wl`).innerHTML = 'LOSE!'
    bal -= pret;
    updateBal();
  }

  document.querySelector(`.js-${pretTempTemp}`).classList.remove('selected');
  document.querySelector(`.${alegere}`).classList.remove('selected');

  pret=0, alegere='';
  if(!bal && aiCasa){
    document.querySelector(`.announce`).innerHTML = 'Ai ajuns falit si ti-ai vandut casa pentru $3000';
    bal = 3000;
    updateBal();
    aiCasa=false;
    updateCasa();
  }else if(!bal && !aiCasa){
    document.querySelector(`.announce`).innerHTML = `Ai ramas si fara bani si fara casa, gg`;
  }
  localStorage.setItem('bal', JSON.stringify(bal));
  localStorage.setItem('aiCasa', JSON.stringify(aiCasa));
}



function price(pretTemp){
  pretTempTemp = pretTemp;
  pret = pretTemp || bal;
  document.querySelector(`.js-${pretTemp}`).classList.add('selected');

  if(!prevPret){
    prevPret = pret;
    prevPretTemp = pretTemp;
  }else if(prevPret !== pret){

    document.querySelector(`.js-${prevPretTemp}`).classList.remove('selected');
    prevPret = pret;
    prevPretTemp = pretTemp;

  }

  if(!pret)
  document.querySelector(`.announce`).innerHTML = 'Nu ai ce all in sa dai lil  bro, esti pe 0';
  if(pret > bal)
    document.querySelector(`.announce`).innerHTML = `Invalid, nu ai $${pret}, ai doar $${bal}`
  else if(alegere && bal && bal >= pret){
    gambleTime();
  }
}



function choice(alegereTemp){
  alegere = alegereTemp;
  document.querySelector(`.${alegere}`).classList.add('selected');

  if(!prevAlegere){
    prevAlegere = alegere;
  }else if(prevAlegere !== alegere){
    document.querySelector(`.${prevAlegere}`).classList.remove('selected');
    prevAlegere = alegere;
  }

  if(pret && bal && bal >=pret) 
    gambleTime();
}
