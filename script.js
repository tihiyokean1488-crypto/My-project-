let score = 0;
let currentAnswer = 0;
let currentQuestion = '';

const startBtn = document.getElementById('startBtn');
const classSelect = document.getElementById('classSelect');
const operationSelect = document.getElementById('operationSelect');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const question = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const submitAnswer = document.getElementById('submitAnswer');
const scoreDisplay = document.getElementById('scoreDisplay');
const scoresList = document.getElementById('scoresList');

startBtn.onclick = () => {
  menu.style.display = 'none';
  game.style.display = 'block';
  score = 0;
  scoreDisplay.textContent = 'Очки: ' + score;
  nextQuestion();
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextQuestion() {
  const klass = parseInt(classSelect.value);
  let op = operationSelect.value;
  let a, b;

  if(klass <= 4){
    a = randomInt(1, klass*10);
    b = randomInt(1, klass*10);
    if(op === '/') a = a * b;
    currentAnswer = eval(`${a} ${op} ${b}`);
    currentQuestion = `${a} ${op} ${b} = ?`;
  } else if(klass <= 7){
    a = randomInt(1, 20);
    b = randomInt(1, 10);
    op = ['+', '-', '*'][randomInt(0,2)];
    currentAnswer = eval(`${a} ${op} ${b}`);
    currentQuestion = `${a} ${op} ${b} = ?`;
  } else if(klass <= 9){
    const type = randomInt(0,1);
    if(type === 0){
      a = randomInt(2, 10);
      b = randomInt(2, 3);
      currentAnswer = Math.pow(a, b);
      currentQuestion = `${a}^${b} = ?`;
    } else {
      a = randomInt(2, 100);
      currentAnswer = Math.sqrt(a);
      currentQuestion = `√${a} ≈ ? (округлить до целого)`;
      currentAnswer = Math.round(currentAnswer);
    }
  }

  question.textContent = currentQuestion;
  answerInput.value = '';
  answerInput.focus();
}

submitAnswer.onclick = () => {
  const userAnswer = parseFloat(answerInput.value);
  if(userAnswer === currentAnswer) score++;
  scoreDisplay.textContent = 'Очки: ' + score;
  saveScore(score);
  updateLeaderboard();
  nextQuestion();
};

// Лидерборд через localStorage
function saveScore(score){
  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push(score);
  scores.sort((a,b)=>b-a);
  if(scores.length>10) scores = scores.slice(0,10);
  localStorage.setItem('scores', JSON.stringify(scores));
}

function updateLeaderboard(){
  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  scoresList.innerHTML = '';
  scores.forEach(s=>{
    const li = document.createElement('li');
    li.textContent = s;
    scoresList.appendChild(li);
  });
}

updateLeaderboard();
    
