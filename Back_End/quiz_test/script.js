const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultForm = document.getElementById('form-result');
const finishButton=document.getElementById('finish-btn');
const line2=document.getElementById('line2');

let countRightAnswers = 0; //1. let's count the right answers
let shuffledQuestions, currentQuestionIndex;
let currentQuestion = 1;

function mvmv(pf){

  if(pf == 'true'){
    var form = document.pass_to_level_up;
    form.submit();
  }else{
    window.location.href="http://49.50.162.178/"; //기존 창에서 열기
  }

}

//합불 여부에 따라 level_up.php 거치나 안거치나
function pass_or_fail_lv2(){
  var pf = localStorage.getItem('level2_pass');
  mvmv(pf);
}

startButton.addEventListener('click', startGame);
finishButton.addEventListener('click', pass_or_fail_lv2);


nextButton.addEventListener('click', () => {
  document.getElementById('answer-buttons').classList.remove('no-click');

  currentQuestionIndex++;
  setNextQuestion();

  currentQuestion++;
  document.getElementById('current-question').innerHTML = currentQuestion;
})


function startGame() {
  console.log('started');

  document.getElementById('answer-buttons').classList.remove('no-click');

  startButton.classList.add('hide');
  resultForm.classList.add('hide');

  shuffledQuestions = questions.sort (() => Math.random() - 0.5)
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();

  currentQuestion = 1;
  document.getElementById('current-question').innerHTML = currentQuestion;

  //3.  reset the counter after the test started
  countRightAnswers = 0;

  document.getElementById('all-questions2').innerHTML = questions.length;
  document.getElementById('all-questions').innerHTML = questions.length;
}


function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}


function resetState() {
  nextButton.classList.add('hide');
  finishButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {

    resultForm.classList.remove('hide');
    questionContainerElement.classList.add('hide');

    startButton.innerText = '다시 도전하기';
    startButton.classList.remove('hide');
    finishButton.classList.remove('hide');
  }

  //2. if the answer is correct
  if (selectedButton.dataset = correct) {
    countRightAnswers++; //+1
  }

  //5. to show the score inside <span>
  document.getElementById('right-answers').innerHTML = countRightAnswers; /*맞춘 답의 개수*/
  document.getElementById('answers-percent').innerHTML = ((100 * countRightAnswers)/questions.length).toFixed(0); /*정답 확률 퍼센트로 나타냄*/
  changeimg();
  //prevent multiclicking
  document.getElementById('answer-buttons').classList.add('no-click');
}


function colorchange(){
  line2.style.color="#FF8282";
}



function changeimg(){
  if(((100 * countRightAnswers)/questions.length)*1>=80){
    document.getElementById('sf').src="img/success.png";
    document.getElementById('line1').innerHTML="축하합니다!"
    colorchange();
    line2.innerHTML="LEVEL 2"
    line3.innerHTML="를 통과했습니다!"
    localStorage.setItem("level2_pass", "true");
  }
  else{
    document.getElementById('sf').src="img/fail.png";
    document.getElementById('line1').innerHTML="아쉽지만"
    colorchange();
    line2.innerHTML="통과하지 못했습니다!"
    localStorage.setItem("level2_pass", "false");

  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}


function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}


const questions = [
  {
    question: 'Question 1?',
    answers: [
      { text: '오답', correct: false },
      { text: '오답 ', correct: false },
      { text: '정답 ', correct: true },
      { text: '오답 ', correct: false },
    ]
  },
  {
    question: 'Question 2?',
    answers: [
      { text: '오답', correct: false },
      { text: '오답 ', correct: false },
      { text: '정답 ', correct: true },
      { text: '오답 ', correct: false },
    ]
  },
  {
    question: 'Question 3?',
    answers: [
      { text: '정답', correct: true },
      { text: '정답X', correct: false },
    ]
  },
  {
    question: 'Question 4?',
    answers: [
      { text: '정답', correct: true },
      { text: '오답 ', correct: false },
      { text: '오답 ', correct: false },
      { text: '오답 ', correct: false },
    ]
  },
  {
    question: 'Question 5?',
    answers: [
      { text: '오답', correct: false },
      { text: '오답 ', correct: false },
      { text: '정답 ', correct: true },
      { text: '오답 ', correct: false },
    ]
  },




]
