// only ECHO and HELP, too lazy to make more

import {helpList} from './help.js';
let inputP = document.querySelector('.input');
let userP = document.querySelector('.user');
let input;
let logs = document.querySelector('.logs');
let user = 'C:\\Users\\Anon>', separator = '<div style="height: 16px;"></div>', incorrect = 'The syntax of the command is incorrect';
let newLog;

userP.innerHTML = user;


inputP.focus();
document.addEventListener('click', (event) => {
  if (window.getSelection().toString()) {
    return;
  }

  inputP.focus();
});

document.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    event.preventDefault(); // Prevent new line
    newLog = document.createElement('div');
    input = inputP.value;
    inputP.value = '';
    inputP.style.height = 'auto'; // Reset height after clearing

    // help
    let matchHelp = input.match(/^help\s+/) || input.match(/^help$/);
    if(matchHelp){
      help(input);
      return;
    }

    // echo
    let matchEcho = input.match(/^echo\s+/) || input.match(/^echo$/);
    if(matchEcho){
      echo(input);
      return;
    }


    let firstWord = input.split(' ')[0];
    updateLog(`'${firstWord}' is not recognized as an internal or external command, <br> operable program or batch file.`);
  }}
);

inputP.addEventListener('input', () => {
  inputP.style.height = 'auto';
  inputP.style.height = inputP.scrollHeight + 'px';
});

function updateLog(message){
  if(message === '')
    newLog.innerHTML = `${userP.innerHTML+input} <br> ${separator}`;
  else
    newLog.innerHTML = `${userP.innerHTML+input} <br> ${message} <br> ${separator}`;
  logs.appendChild(newLog);
}

// help
function help(input){
  let matchHelpON = input.match(/^help$/);
  let matchHelpMessage = input.match(/^help\s+(.+)/)

  if(matchHelpON){
    let helpLine = '';
    helpList.forEach(command => {
      let line = command.commandName + "　　　　　　" + command.commandDesc;
      helpLine += line + '<br>';
    });
    updateLog(helpLine);
  }
  
  else if (matchHelpMessage){
    let words = matchHelpMessage[1].split(' ');
    let firstWord = words[0].toLowerCase();
    console.log(words.length);
    
    if(firstWord === 'echo'){
      let message =
      ` Displays messages, or turns command-echoing on or off. <br>
      　<br>
      　　ECHO [ON] | [OFF]<br>
      　　ECHO [message]<br>
      　<br>
      Type ECHO without parameters to display the current echo setting.
      `
      updateLog(message);
    }

    else if(firstWord === 'help' || words.length > 1){
      let message =
      `Provides help information for Windows commands.<br>
      　<br>
      HELP [command]<br>
      　<br>
      　　　command - displays help information on that command.
      `
      updateLog(message);
    }

    else {
      let message = `This command is not supported by the help utility. Try "${firstWord}/?".`
      updateLog(message);
    }
  }

  else {
    let helpLine = '';
    helpList.forEach(command => {
      let line = command.commandName + "　　　　　　" + command.commandDesc;
      helpLine += line + '<br>';
    });
    updateLog(helpLine);
  }
}

// echo
let echoState = 'on';
function echo(input){
  let matchEchoON = input.match(/^echo\s+$/);
  let matchEchoMessage = input.match(/^echo\s+(.+)/);

  if(matchEchoON){
    updateLog(`ECHO is ${echoState}.`)
  }

  else if(matchEchoMessage){
    if (/[<>]/.test(matchEchoMessage[1]))
      updateLog(incorrect);

    else if(['off', 'OFF'].includes(matchEchoMessage[1])){
      updateLog('');
      userP.innerHTML = '';
      echoState = 'off';
    }

    else if(['on', 'ON'].includes(matchEchoMessage[1])) {
      updateLog('');
      userP.innerHTML = user;
      echoState = 'on';
    }

    else
      updateLog(matchEchoMessage[1]);
  }

  else {
    console.log('test');
    updateLog(`ECHO is ${echoState}.`);
  }
}