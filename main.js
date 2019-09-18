'use strict';

const STORE = [
    {'image': 'images/beethoven-2.png',
    'question': 'In what year was Beethoven born?',
    'option1': '1750',
    'option2': '1762',
    'option3': '1770',
    'option4': '1790',
    'correctAnswer': '1770'},

    { 'image': 'images/beethoven-3.jpg',
    'question': 'Who was Beethoven’s teacher in Vienna?',
    'option1': 'Salieri',
    'option2': 'Haydn',
    'option3': 'Mozart',
    'option4': 'Neefe',
    'correctAnswer': 'Haydn'},

    { 'image': 'images/beethoven-4.jpg',
    'question': 'Who played Beethoven in the 1994 movie <em>Immortal Beloved</em>?',
    'option1': 'Brad Pitt',
    'option2': 'Arnold Schwarzenegger',
    'option3': 'Nicolas Cage',
    'option4': 'Gary Oldman',
    'correctAnswer': 'Gary Oldman'},

    { 'image': 'images/beethoven-5.jpg',
    'question': 'To whom was the Symphony no. 3, “Eroica”, originally dedicated?',
    'option1': 'Napoleon Bonaparte',
    'option2': 'Emperor Leopold II',
    'option3': 'Clemens von Metternich',
    'option4': 'Barack Obama',
    'correctAnswer': 'Napoleon Bonaparte'}, 

    { 'image': 'images/beethoven-6.jpg',
    'question': 'How many piano sonatas did Beethoven write?',
    'option1': '16',
    'option2': '21',
    'option3': '32',
    'option4': '43',
    'correctAnswer': '32'},
    
    { 'image': 'images/beethoven-7.jpg',
    'question': 'Who wrote the text for the “Ode to Joy”?',
    'option1': 'Goethe',
    'option2': 'Oprah Winfrey',
    'option3': 'Heine',
    'option4': 'Schiller',
    'correctAnswer': 'Schiller'},

    { 'image': 'images/beethoven-1.png',
    'question': "What was the name of Beethoven’s nephew?",
    'option1': 'Georg',
    'option2': 'Karl',
    'option3': 'Johann',
    'option4': 'Dweezil',
    'correctAnswer': 'Karl'},

    { 'image': 'images/beethoven-2.png',
    'question': "What was Beethoven's disability?",
    'option1': 'Deafness',
    'option2': 'Blindness',
    'option3': 'Paralysis',
    'option4': 'Dyslexia',
    'correctAnswer': 'Deafness'},

    { 'image': 'images/beethoven-3.jpg',
    'question': "Which symphony did Leonard Bernstein conduct when the Berlin Wall fell in 1989?",
    'option1': '3',
    'option2': '5',
    'option3': '8',
    'option4': '9',
    'correctAnswer': '9'},

    { 'image': 'images/beethoven-4.jpg',
    'question': "In what city did Beethoven spend most of his adult life?",
    'option1': 'Berlin',
    'option2': 'Bonn',
    'option3': 'Vienna',
    'option4': 'Tokyo',
    'correctAnswer': 'Vienna'}
];

let questionNumber = 0;
let currentScore = 0;

function generateQuizQuestionString() {
    //This function will generate the HTML for whatever question the user needs to answer next.
    console.log('Generating quiz question string');
    
    console.log(questionNumber);
    const quizQuestionString = `
    <div>
        <form id="question-form">
            <legend>${STORE[questionNumber].question}</legend>
            <div class="radio-buttons-enclose">
                <div class="radio-enclose">
                    <input type="radio" id='${STORE[questionNumber].option1} ' name="question" value='${STORE[questionNumber].option1}'>
                    <label for='${STORE[questionNumber].option1}'>${STORE[questionNumber].option1}</label>
                </div> 
                <div class="radio-enclose">
                    <input type="radio" id='${STORE[questionNumber].option2} ' name="question" value='${STORE[questionNumber].option2}'><label for='${STORE[questionNumber].option2}'>${STORE[questionNumber].option2}</label>
                </div>
                  <div class="radio-enclose">
                      <input type="radio" id='${STORE[questionNumber].option3}' name="question" value='${STORE[questionNumber].option3}'><label for='${STORE[questionNumber].option3}'>${STORE[questionNumber].option3}</label>
                  </div>
                  <div class="radio-enclose js-last-option">
                      <input type="radio" id='${STORE[questionNumber].option4}' name="question" value='${STORE[questionNumber].option4}'><label for='${STORE[questionNumber].option4}'>${STORE[questionNumber].option4}</label>
                  </div>
                </div>
                <div class="answerbutton">
                    <button type="submit" id="#answerButton">Check Answer</button>
                </div>
            </form>
        </div>`;
    return quizQuestionString;
}

function startQuiz() {
    //this function will render the start page or current question page of the quiz when the start or continue button is clicked
    console.log('`startQuiz` ran');
    let quizQuestionString = generateQuizQuestionString();
    $('.container').on('click', "#startButton", function(event) {
        event.preventDefault();
        $('h1').html(`Question ${questionNumber + 1}`);
        let imageSource = STORE[0].image;
        $('div.container > img').attr('src', imageSource);
        $('div.container > img').attr('alt', 'Beethoven face');
        $('.start-quiz').hide();
        $('.question').html(quizQuestionString);    
    });
}

function showAnswer() {
    // when the user clicks the submit button, this function will show the user whether or not they got the question right and what the correct answer is
    console.log('`showAnswer` ran');
    $('.question').on('submit', function() {
        event.preventDefault();
        console.log('You clicked the answer button!');
        if(!$('input[name="question"]').is(':checked')) {
          alert('Please select an option');
        } else {
        $('.answer').show();
        let radioValue = $('input[name="question"]:checked').val();
        console.log(radioValue);
        if (radioValue === STORE[questionNumber].correctAnswer) {
            currentScore++;
            console.log('Correct!');
            $('.answer').html(`<p>Yes! That is the correct answer.</p><button type='button' id='nextQuestion'>Next Question</button>`);
        } else {
            console.log('Incorrect!');
            $('.answer').html(`<p>Sorry, the correct answer was ${STORE[questionNumber].correctAnswer}.</p><button type='button' id='nextQuestion'>Next Question</button>`);
        }
        questionNumber++;
        }
    });
     

      
    }



function nextQuestion() {
  console.log(`'nextQuestion' ran`);
   $('.answer').on('click', '#nextQuestion', function() {
        event.preventDefault();
        if (questionNumber >= 10) {
  completeQuiz();
  } else {
         $('.answer').val = '';
         $('.answer').hide();
        console.log("You clicked the next question button!");
        let quizQuestionString = generateQuizQuestionString();
        updateScore();
        let imageSource = STORE[questionNumber].image;
        $('div.container > img').attr('src', imageSource);
        $('.question').html(quizQuestionString);
  }    
   });
}

function updateScore() {
  console.log(`'updateScore' ran`);
  $('h1').html(`Question ${questionNumber + 1}`);
  $('.currentScore').html(`<p>Current Score: ${currentScore}/10</p>`)
}

function scoreLevel() {
  console.log(`'scoreLevel' ran`);
  console.log(currentScore);
  $
}

function completeQuiz() {
  console.log(`'completeQuiz' ran`);
  $('h1').html(`You got ${currentScore} out of 10!`)
  $('.currentScore').hide();
  let scoreLevelString = '';
  if (currentScore < 5) {
    scoreLevelString = `<p>You need to brush up on your Beethoven!</p>`
  } else if (currentScore >=5 && currentScore < 8) {
    scoreLevelString = `<p>Not bad! Keep listening and reading to boost your Beethoven-fu.</p>`
  } else if (currentScore >=8) {
    scoreLevelString = `<p>Ode to Joy!  You are a Beethoven maestro.</p>`
  }
  $('.question').html(scoreLevelString);
  $('.question').append('<button type="button" id="restartQuiz">Try Quiz Again</button>');
  scoreLevel();
  $('.answer').hide();
  $('.question').on('click','#restartQuiz', function() {
    event.preventDefault();
    currentScore = 0;
    questionNumber = 0;
    console.log(`You clicked the restart button!`);
    $('.container').html(`<header>
            <h1>Beethoven Trivia Quiz</h1>
        </header>
        <img class="main-img" src="images/beethoven-1.png" alt="Beethoven cartoon composing with pen">
        <div class="start-quiz">
            <p>Are you ready to test your Beethoven know-how?  Try our quiz and find out just how much you know about one of history's most famous composers! </p>
            <button id="startButton" type="button">Start Quiz</button>
        </div>
        <div class="question"></div>
        <div class="answer"></div>
    </div>`);
   handleQuiz();
  });

}


function runQuiz() {
  showAnswer();
  nextQuestion(); 
}

function handleQuiz() {
startQuiz();
runQuiz();
}

handleQuiz();


