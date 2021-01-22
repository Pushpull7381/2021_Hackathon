const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultForm = document.getElementById('form-result');
const finishButton=document.getElementById('finish-btn');
const line2=document.getElementById('line2');
const retryButton = document.getElementById('retry-btn');
//const tttt = document.getElementById('tttt');

let countRightAnswers = 0; //1. let's count the right answers
let shuffledQuestions, currentQuestionIndex;
let currentQuestion = 1;

function mvmv(pf){

  if(pf == 'true'){
    var form = document.pass_to_level_up;
    document.getElementById('score').value = localStorage.getItem('score');
    form.submit();
  }else{
    fin_fail();
  }

}

//합불 여부에 따라 level_up.php 거치나 안거치나
function pass_or_fail_lv3(){
  var pf = localStorage.getItem('level3_pass');
  mvmv(pf);
}

function retry(){
  var score = localStorage.getItem('score');
  var form = document.sending_score;
  document.getElementById('retry_fin').value = "0"
  document.getElementById('score2').value = score;
  form.submit();
}
function fin_fail(){
  var score = localStorage.getItem('score');
  var form = document.sending_score;
  document.getElementById('retry_fin').value = "1"
  document.getElementById('score2').value = score;
  form.submit();
}

startButton.addEventListener('click', startGame);
finishButton.addEventListener('click', pass_or_fail_lv3);
retryButton.addEventListener('click', retry);

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
  retryButton.classList.add('hide');
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
  retryButton.classList.add('hide');
  //tttt.classList.add('hide');
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

    retryButton.innerText = '다시하기';
    retryButton.classList.remove('hide');
    finishButton.classList.remove('hide');
    //tttt.classList.remove('hide');
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
    line0.innerHTML="'마치기'버튼을 누르셔야 레벨 상승이 적용됩니다.";
    line2.innerHTML="LEVEL 3"
    line3.innerHTML="를 통과했습니다!"
    localStorage.setItem("level3_pass", "true");
    localStorage.setItem("score", ((100 * countRightAnswers)/questions.length));
  }
  else{
    document.getElementById('sf').src="img/fail.png";
    document.getElementById('line1').innerHTML="아쉽지만"
    colorchange();
    line2.innerHTML="통과하지 못했습니다!"
    localStorage.setItem("level3_pass", "false");
    localStorage.setItem("score", ((100 * countRightAnswers)/questions.length));
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
    question: '강아지 뒷발의 발가락은 몇 개일까요?',
    answers: [
      { text: '2개', correct: false },
      { text: '3개 ', correct: false },
      { text: '4개' , correct: true },
      { text: '5개 ', correct: false },
    ]
  },
  {
    question: '강아지가 먹어도 되는 음식은?',
    answers: [
      { text: '초콜릿', correct: false },
      { text: '포도 ', correct: false },
      { text: '카페인 음료(커피, 홍차) ', correct: false },
      { text: '양파, 마늘 ', correct: false },
      { text: '배, 멜론 ', correct: true },
    ]
  },
  {
    question: '강아지는 뒷다리 발톱보다 앞다리 발톱이 더 짧다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X', correct: true },
    ]
  },
  {
    question: '강아지의 노란색 토는 배가 고파서 위액을 토한 것이다.',
    answers: [
      { text: 'O', correct: true },
      { text: 'X ', correct: false },
    ]
  },
  {
    question: '강아지의 분홍색 토는 입안이나 식도에 작은 출혈 때문이다.',
    answers: [
      { text: 'O', correct: true },
      { text: 'X ', correct: false },
    ]
  },
  {
    question: '강아지를 혼낼 때 강아지가 하품하는 이유는 졸리고 지루하기 때문이다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X ', correct: true },
    ]
  },
  {
    question: '애견의 수면 시간은 대부분 12시간이다',
    answers: [
      { text: 'O', correct: false },
      { text: 'X ', correct: true },
    ]
  },
  {
    question: '강아지는 똥을 먹는 이유는 영양소가 부족해서 먹는것이다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X ', correct: true },
    ]
  },
  {
    question: '여름에 날씨가 더워서 애견의 털을 깍아주는 것이 좋다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X ', correct: true },
    ]
  },

  {
    question: '강아지가 인식할 수 없는 색상 스펙트럼은 다음 중 무엇일까요?',
    answers: [
      { text: '녹색-빨강', correct: false },
      { text: '녹색-파랑', correct: true },
      { text: '노랑-빨강', correct: false },
    ]
  },




]
