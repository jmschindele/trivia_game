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
    "What luxury car company introduced the boxster in 1996?",
    "Which Olympic sport was featured in the movie “Cool Runnings”?",
    "Which of the following was not a member of the Beatles?",
    "What was the name of The Lone Ranger’s horse that he saved from an enraged buffalo?",
    'In China, what number is considered unlucky because its pronunciation is similar to that for the word “death”?',
    "Which planet spins the fastest?",
    "Titan, Enceladus, Mimas & Iapetus are just some of the moons orbiting which planet?",
    "What is the most malleable metal?",
    "The State of Israel was founded in what year?",
    "In 1783, the first free flight of a hot air balloon carrying a human occurred in what city?"
  ];
  //create an array with a sub array of answers
  var $answer = [$a1, $a2, $a3, $a4];
  var answer = [
    ["Cadillac", "Lexus", "Porsche", "Ferarri", 2],
    ["Sprinting", "Bobsledding", "Curling", "Pole Vaulting", 1 ],
    ["Ringo Star", "Paul McCartney", "John Lennon", "Eric Clapton", 3],
    [
      "Silver",
      "Dasher",
      "Tonto",
      "Buck",
      0
    ],
    [4, 7, 8, 13, 0],
    ["Mars", "Earth", "Saturn", "Jupiter", 3],
      ["Jupiter", "Saturn", "Uranus", "Neptune", 1], 
       ["Gold", "Lead", "Silver", "Carbon", 0],

    [1932, 1948, 1954, 1966, 1],
    ["London", "Rotterdam", "Paris", "Rome", 2]
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
      $(document.body).on("click", "#play-again", replay);
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
