//Create timer
var timer = 30;
var $timer = $("#timer");
$timer.text(timer);
var timerRunning = false;
var $a1 = $("#a1");
var $a2 = $("#a2");
var $a3 = $("#a3");
var $a4 = $("#a4");
//create an array of questions
var $question = $("#question");
var question = [
    "What color is the sky?", 
    "Which of the following is a dog?", 
    "How many lunar cycles are in a year?",
    // "question 4",
    // "question 5", 
    // "question 6",
    // "question 7",
    // "question 8", 
    // "question 9",
    // "question 10",
    ];
//create an array with a sub array of answers
var $answer = [$a1, $a2, $a3, $a4];
var answer = [
    ["red", "blue", "green", "white", 1], 
    ["Husky", "Mount Lion", "Garden Snake", "Raccoon", 0], 
    [3, 6, 9, 12, 3],
    // [4, 4, 4, 4], 
    // [5, 5, 5, 5],
    // [6, 6, 6, 6], 
    // [7, 7, 7, 7],
    // [8, 8, 8, 8], 
    // [9, 9, 9, 9],
    // [10, 10, 10, 10],
];
//coordinate the answers with the questions

//generate a random question from the array
numGen = Math.floor(Math.random() * question.length);
console.log(numGen);
//populate the questions div with the question
$question.text(question[numGen]);
//populate the answer divs with the corresponding answers
for (var i = 0; i <= 3; i++) {
  $answer[i].text(answer[numGen][i]);
  if (answer[numGen].indexOf(answer[numGen][i]) === answer[numGen][4]) {
    console.log("yes");}
    else {console.log("no");
  }
  }

//start countdown timer from 30 seconds
var count;
function startTimer() {
   count = setInterval(countDown, 1000)
}
function countDown() {
  if (timer > 0) {
  timer--;
  $timer.text(timer);}
  else {
    clearInterval(count);
    showAnswer
  }
}
startTimer();



//create statement that if timer === 0 question is missed
// hightlight correct answer

// dim out incorrect answers
// reload a question after 5 seconds


$a1.on("click", function() {console.log("weeeee")});
// $a2.on("click", console.log("weeeee"));







