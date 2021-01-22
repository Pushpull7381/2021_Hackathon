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
function pass_or_fail_lv2(){
  var pf = localStorage.getItem('level2_pass');
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
finishButton.addEventListener('click', pass_or_fail_lv2);
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
    line2.innerHTML="LEVEL 2"
    line3.innerHTML="를 통과했습니다!"
    localStorage.setItem("level2_pass", "true");
    localStorage.setItem("score", ((100 * countRightAnswers)/questions.length));
  }
  else{
    document.getElementById('sf').src="img/fail.png";
    document.getElementById('line1').innerHTML="아쉽지만"
    colorchange();
    line2.innerHTML="통과하지 못했습니다!"
    localStorage.setItem("level2_pass", "false");
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
    question: '반려견에게 포도, 사과와 같은 과일을 먹여도 된다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X ', correct: true },
    ]
  },
  {
    question: '나이가 들어 다리와 허리가 약해진 반려견은 산책을 안 하는 것이 좋다?',
    answers: [
      { text: 'O', correct: false },
      { text: 'X ', correct: true },
    ]
  },
  {
    question: '강아지는 어깨, 가슴보다 머리를 쓰다듬는 것을 더욱 좋아한다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X ', correct: true },
    ]
  },



  {
    question: '반려견을 구청에 등록하지 않았을 때의 과태료를 문다',
    answers: [
      { text: 'O', correct: true },
      { text: 'X ', correct: false },

    ]
  },
  {
    question: '강아지는 눈을 똑바로 쳐다보는 것을 좋아한다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X', correct: true },
    ]
  },
  {
    question: '강아지 양치질, 꼭 해야할까요?',
    answers: [
      { text: 'O', correct: true },
      { text: 'X', correct: false },
    ]
  },
  {
    question: '반려동물 유기시 법적인 문제는 없다.',
    answers: [
      { text: 'O', correct: false },
      { text: 'X', correct: true },
    ]
  },
  {
    question: '강아지를 입양하기 전에 왜 강아지의 품종을 신중히 고려해야 될까요?',
    answers: [
      { text: '특이한 품종으로 도그쇼에서 우승하기 위해', correct: false },
      { text: '품종별로 다른 성향이 주인과 맞는지 판단하기 위해', correct: true },
      { text: '품종에 따라 가격을 판단할 수 있으므로', correct: false },

    ]
  },
  {
    question: '인식표에 들어가야 될 정보로 알맞지 않은 것을 고르시오.(하지 않았을 땐 20만원 이하의 과태료)',
    answers: [
      { text: '소유자의 성명', correct: false },
      { text: '소유자의 전화번호 ', correct: false },
      { text: '소유자의 주소 ', correct: true },
      { text: '동물등록번호 ', correct: false },
    ]
  },
  {
    question: '다음 중 강아지가 먹어도 되는 음식은?',
    answers: [
      { text: '초콜릿', correct: false },
      { text: '생닭 ', correct: true },
      { text: '포도 ', correct: false },
      { text: '양파 ', correct: false },
    ]
  },




]
