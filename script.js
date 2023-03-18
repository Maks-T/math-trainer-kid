const container = document.querySelector('#container');
const num1Elem = document.querySelector('.num1');
const num2Elem = document.querySelector('.num2');
const answerElem = document.querySelector('.answer');
const btnAnswer = document.querySelector('.btn-answer');
const btnNext = document.querySelector('.btn-next');
const keyPanel = document.querySelector('.keyPanel');

audioSuccess = new Audio('./assets/sounds/Unlock_level_Game_Sound.mp3');
audioMistakes = new Audio('./assets/sounds/Bot_Wrong_Answer_3.mp3');

keyPanel.addEventListener('click', (e) => {
  if (e.target.classList.contains('key')) {
    if (e.target.classList.contains('backspace')) {
      if (answerElem.innerHTML.length > 0) {
        answerElem.innerHTML = answerElem.innerHTML.slice(0, -1);
        answerElem.classList.add('successAnswer');
        answerElem.classList.remove('mistakeAnswer');
      }
    } else {
      answerElem.innerHTML += e.target.innerHTML;
    }
  }
});

btnAnswer.addEventListener('click', () => {
  if (answerElem.innerHTML == num1Elem.innerHTML - num2Elem.innerHTML) {
    answerElem.innerHTML = '✔ ' + answerElem.innerHTML;

    audioSuccess.play();

    btnAnswer.classList.add('hide');
    btnNext.classList.remove('hide');
  } else {
    answerElem.classList.add('mistakeAnswer');
    audioMistakes.play();
  }
});

btnNext.addEventListener('click', nextProblem);

function generateProblemData() {
  num1 = getRandomInt(150, 999);
  num2 = getRandomInt(150, getRandomInt(0.2 * num1, 0.8 * num1));

  return { num1, num2 };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

window.onload = () => {
  nextProblem();
};

function nextProblem() {
  const dataProblem = generateProblemData();

  num1Elem.innerHTML = dataProblem.num1;
  num2Elem.innerHTML = dataProblem.num2;
  answerElem.innerHTML = '';

  btnAnswer.classList.remove('hide');
  btnNext.classList.add('hide');
  answerElem.classList.remove('successAnswer');
  answerElem.classList.remove('mistakeAnswer');
}
