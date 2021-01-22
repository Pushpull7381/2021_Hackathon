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
function pass_or_fail_lv1(){
  var pf = localStorage.getItem('level1_pass');
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
finishButton.addEventListener('click', pass_or_fail_lv1);
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
    line2.innerHTML="LEVEL 1"
    line3.innerHTML="를 통과했습니다!"
    localStorage.setItem("level1_pass", "true");
    localStorage.setItem("score", ((100 * countRightAnswers)/questions.length));
  }
  else{
    document.getElementById('sf').src="img/fail.png";
    document.getElementById('line1').innerHTML="아쉽지만"
    colorchange();
    line2.innerHTML="통과하지 못했습니다!"
    localStorage.setItem("level1_pass", "false");
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
    question: '한밤 중에 개가 갑자기 열이 나며 구토를 하면 사람 해열제를 먹여도 된다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X', correct: true },
    ]
  },
  {
    question: '필수 예방접종이 끝나지 않아도 산책을 시켜줘야 한다.',
    answers: [
      { text: 'O', correct: true },
      { text: 'X', correct: false },
    ]
  },
  {
    question: '강아지의 눈곱을 관리해 주기 위해서는 눈 주위 털을 주기적으로 잘라 주어야 한다.',
    answers: [
      { text: 'O', correct: true },
      { text: 'X', correct: false },
    ]
  },
  {
    question: '본인이 기르는 개가 맹견에 포함될 때 필수로 착용해야 될 것으로 알맞지 않은 것은? (미 착용시 50만원 이하의 과태료)',
    answers: [
      { text: '배변봉투 ', correct: true },
      { text: '목줄 ', correct: false },
      { text: '입마개 ', correct: false },
    ]
  },
  {
    question: '반려동물 등록 방법으로 틀린 것은?',
    answers: [
      { text: '내장칩', correct: false },
      { text: '외장칩 ', correct: false },
      { text: '문신 ', correct: true },
      { text: '인식표 ', correct: false },
    ]
  },
  {
    question: '반려동물 전용 TV가 반려동물의 스트레스를 줄여준다?',
    answers: [
      { text: 'O', correct: true },
      { text: 'X', correct: false },
    ]
  },
  {
    question: '생후 2~3개월부터 길들이기를 시작하는 것이 좋다.',
    answers: [
      { text: 'O', correct: true },
      { text: 'X', correct: false },
    ]
  },
  {
    question: '칭찬을 많이 하는 것이 좋다.',
    answers: [
      { text: 'O', correct: true },
      { text: 'X', correct: false },
    ]
  },
  {
    question: '배가 고플 때 훈련 효과가 더 좋다',
    answers: [
      { text: 'O', correct: true },
      { text: 'X', correct: false },
    ]
  },
  {
    question: '반려동물과의 뽀뽀는 좋은 행위이다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X ', correct: true },
    ]
  },
]
