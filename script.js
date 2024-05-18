import { quizData } from './questions.js';

const questionsContainer = document.getElementById('questionsContainer');
const subBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

let score = 0;

(function renderQuiz() {
  resetBtn.style.display = 'none';
  subBtn.style.display = 'block';

  for (let i = 0; i < quizData.length; i++) {
    const queDiv = document.createElement('div');
    queDiv.className = 'question';
    queDiv.innerHTML = (i + 1) + ". " + quizData[i].question;

    const optionDiv = document.createElement('div');
    optionDiv.className = 'options';

    for (let j = 0; j < 4; j++) {
      const optionId = `${i}${j+1}`;
      optionDiv.innerHTML += 
        `<input type="radio" name="${i}" id="${optionId}" value="${quizData[i].options[j]}">
         <label for="${optionId}">${quizData[i].options[j]}</label><br>`;
    }

    const quesAndOps = document.createElement('div');
    quesAndOps.className = 'quesAndOps';

    quesAndOps.appendChild(queDiv);
    quesAndOps.appendChild(optionDiv);

    questionsContainer.appendChild(quesAndOps);
  }
})();

const calculateScore = () => {
  score = 0;
  for (let i = 0; i < quizData.length; i++) {
    const selectedOption = document.querySelector(`input[name='${i}']:checked`);

    if (selectedOption === null) {
      alert("Please select an option.");
      return;
    }

    const answer = selectedOption.value;
    if (answer === quizData[i].answer) {
      score++;
    }
  }

  questionsContainer.innerHTML = `<h3>Your Score is ${score}/${quizData.length}</h3>`;
  console.log(score);
  subBtn.style.display = 'none';
  resetBtn.style.display = 'block';

}

subBtn.addEventListener('click', calculateScore);

resetBtn.addEventListener('click', () => {
  window.location.reload();
});
