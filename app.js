let alreadyGeneratedNumbers = []
let limitNumber = 10
let randomNumber = generateRandomNumber();
let tries = 0

function exibirTextoNaTela(tag, text) {
  let a = document.querySelector(tag);
  a.innerHTML = text;
  responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});
}
 
function inicalmessage () {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${limitNumber}`);  
}

inicalmessage()

function verificarChute() {
  let chute = document.querySelector('input').value;
  tries++
  let palavraTentativa = tries == 1 ? 'tentativa' : 'tentativas';

  if (chute == randomNumber) {
    exibirTextoNaTela('h1', 'Acertou!');
    exibirTextoNaTela('p', `Você descobriu o número secreto com ${tries} ${palavraTentativa}`);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else if (chute > randomNumber) {
    exibirTextoNaTela('p', `O número secreto é menor que ${chute} | Número de tentativas: ${tries}`);
    inputClean();
  } else {
    exibirTextoNaTela('p', `O número secreto é maior que ${chute} | Número de tentativas: ${tries}`);
    inputClean();
  }
}

function generateRandomNumber() {
  generatedNumber = parseInt(Math.random() * limitNumber + 1);
  let totalListNumbers = alreadyGeneratedNumbers.length;
  if (totalListNumbers == limitNumber) {
    alreadyGeneratedNumbers = [];
  }
 if (alreadyGeneratedNumbers.includes(generatedNumber)) {
    return generateRandomNumber();
  } else {
    alreadyGeneratedNumbers.push(generatedNumber);
    return generatedNumber;
  } 
}
 
function inputClean() {
  chute = document.querySelector('input');
  chute.value = '';
}

function restartGame() {
  randomNumber = generateRandomNumber();
  inputClean();
  inicalmessage();
  tries = 0;
  document.getElementById('reiniciar').setAttribute('disabled','');
}  

function arrayCleaner() {
  while (alreadyGeneratedNumbers.length != 0) {
    alreadyGeneratedNumbers.pop();
  }
}