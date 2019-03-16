$(document).ready(function() {
  //Create timer
  var timer = 30;
  var $timer = $("#timer");
  $timer.text(timer);
  var timerRunning = false;
  var score = 0;
  var $a1 = $("#a1");
  var $a2 = $("#a2");
  var $a3 = $("#a3");
  var $a4 = $("#a4");
  //create an array of questions
  var $question = $("#question");

  var question = [
    "What color is the sky?",
    "Which of the following is a dog?",
    // "How many lunar cycles are in a year?",
    // "What is Deanna going to have to eat when she is old and toothless?",
    // "How many planets are in the solar system?",
    // "Which planet spins the fastest?",
    // "What is the most malleable metal?",
    // "Which planet is closest to the sun?",
    // "What is the square root of an onion?",
    // "What is the elemental symbol of Iron?"
  ];
  //create an array with a sub array of answers
  var $answer = [$a1, $a2, $a3, $a4];
  var answer = [
    ["red", "blue", "green", "white", 1],
    ["Husky", "Mount Lion", "Garden Snake", "Raccoon", 0],
    [3, 6, 9, 12, 3],
    [
      "pickle shakes",
      "not pickle shakes",
      "not pickle shakes",
      "not pickle shakes",
      0
    ],
    [6, 7, 8, 9, 2],
    ["Mars", "Earth", "Saturn", "Jupiter", 3],
    ["Gold", "Lead", "Silver", "Carbon", 0],
    ["Mercury", "Earth", "Mars", "Venus", 0],
    [42, "shallot", 90, 9, 1],
    ["Fe", "Fi", "Fo", "Fum", 0]
  ];
  //coordinate the answers with the questions

  //generate a random question from the array

  var num = 0;
  var randomQ = question[num];
  var randomA = answer[num];
  var rightA = randomA[randomA[4]];

  $(".start-button").on("click", function() {
    $("#state-1").toggleClass("hide");
    $("#state-2").toggleClass("hide");
    initialize();
  });
  // initialize();
  // create initialize function to reset timer and pull new question.
  function initialize() {
    if (num < question.length) {
      //update questions and answers

      randomQ = question[num];
      randomA = answer[num];
      rightA = randomA[randomA[4]];
      // reset button classes to not show answer

      $("#a1").removeClass("btn-danger btn-success");
      $("#a2").removeClass("btn-danger btn-success");
      $("#a3").removeClass("btn-danger btn-success");
      $("#a4").removeClass("btn-danger btn-success");
      $("#a1").toggleClass("btn-light");
      $("#a2").toggleClass("btn-light");
      $("#a3").toggleClass("btn-light");
      $("#a4").toggleClass("btn-light");

      //set timer running to true. This prevents duplicate inputs and score manipulation.

      timerRunning = true;
      // clear interval timer from showAnswer function
      clearInterval(reset);

      //resets timer to 30 seconds
      timer = 30;
      $timer.text(timer);
      //pull a new question
      $question.text(randomQ);

      //pull corresponding answers for question
      for (var i = 0; i <= 3; i++) {
        $answer[i].text(randomA[i]);
      }

      //start countdown timer
      num++;
      startTimer();
    } else {
      //display score screen
      clearInterval(count);

      $("#state-2").toggleClass("hide");
      $("#final-score").html(`Your Score: ${score}/${question.length}`);
      $("#state-3").toggleClass("hide");

      clearInterval(count);
      clearInterval(reset);
      $("#play-again").on("click", replay);
    }
  }

  function replay() {
    score = 0;
    num = 0;

    //update questions and answers

    randomQ = question[num];
    randomA = answer[num];
    rightA = randomA[randomA[4]];
    // reset button classes to not show answer

    $("#a1").removeClass("btn-danger btn-success");
    $("#a2").removeClass("btn-danger btn-success");
    $("#a3").removeClass("btn-danger btn-success");
    $("#a4").removeClass("btn-danger btn-success");
    $("#a1").toggleClass("btn-light");
    $("#a2").toggleClass("btn-light");
    $("#a3").toggleClass("btn-light");
    $("#a4").toggleClass("btn-light");

    //set timer running to true. This prevents duplicate inputs and score manipulation.

    timerRunning = true;
    // clear interval timer from showAnswer function
    clearInterval(reset);

    //resets timer to 30 seconds
    timer = 30;
    $timer.text(timer);
    //pull a new question
    $question.text(randomQ);

    //pull corresponding answers for question
    for (var i = 0; i <= 3; i++) {
      $answer[i].text(randomA[i]);
    }

    //start countdown timer
    num++;
    startTimer();

    $("#state-2").toggleClass("hide");
    $("#state-3").toggleClass("hide");
  }
  //create a timer that starts at 30 seconds and counts down to 0
  var count;
  function startTimer() {
    count = setInterval(countDown, 1000);
  }
  function countDown() {
    if (timer > 1) {
      timer--;
      $timer.text(timer);
    } else {
      // stop timer and reveal correct answer
      timerRunning = false;
      showAnswer();
      $timer.text("Time's up!");
    }
  }

  // add click event to show correct answer when any button is pushed. Will also start a five second timer before resetting timer and question/answers.

  //create statement that if timer === 0 question is missed
  // hightlight correct answer
  function showAnswer() {
    clearInterval(reset);
      $("#a1").toggleClass("btn-light");
      $("#a2").toggleClass("btn-light");
      $("#a3").toggleClass("btn-light");
      $("#a4").toggleClass("btn-light");
    if (a1.textContent == rightA) {
      $("#a1").addClass("btn-success");
      $("#a2").addClass("btn-danger");
      $("#a3").addClass("btn-danger");
      $("#a4").addClass("btn-danger");
    } else if (a2.textContent == rightA) {
      $("#a1").addClass("btn-danger");
      $("#a2").addClass("btn-success");
      $("#a3").addClass("btn-danger");
      $("#a4").addClass("btn-danger");
    } else if (a3.textContent == rightA) {
      $("#a1").addClass("btn-danger");
      $("#a2").addClass("btn-danger");
      $("#a3").addClass("btn-success");
      $("#a4").addClass("btn-danger");
    } else if (a4.textContent == rightA) {
      $("#a1").addClass("btn-danger");
      $("#a2").addClass("btn-danger");
      $("#a3").addClass("btn-danger");
      $("#a4").addClass("btn-success");
    }
    clearInterval(count);

    reset = setInterval(initialize, 1500);
    
  }

  var reset;

  $(".answer-btn").on("click", function() {
    //check to see if an input has already been given
    if (timerRunning !== false) {
      //change state to show an input has been given
      timerRunning = false;
      clearInterval(count);

      //discern between correct and incorrect answer
      if (this.textContent == rightA) {
        $timer.text("Correct!");
        score++;
        console.log(score);
      } else {
        $timer.text("WRONG!");
      }
      showAnswer();
    }
  });

  //create a function to reset the game without reloading the page
});
