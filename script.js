const questions = [
    {
        question: "Vad är huvudstaden i Sverige?",
        answers: ["Göteborg", "Stockholm", "Malmö"],
        correctAnswer: 2
    },
    {
        question: "Vilket år började andra världskriget?",
        answers: ["1939", "1941", "1945"],
        correctAnswer: 1
    },
    {
        question: "Vad är meningen med livet?",
        answers: ["Pengar", "42", "Familj"],
        correctAnswer: 2 
    },
    {
        question: "Vilken färg får man om man blandar blått och gult?",
        answers: ["Grön", "Lila", "Orange"],
        correctAnswer: 1 
    },
    {
        question: "Vad heter Sveriges kung?",
        answers: ["Carl XVI Gustaf", "Gustav V", "Karl XII"],
        correctAnswer: 1 
    },
    {
        question: "Vilken planet är känd som den röda planeten?",
        answers: ["Jorden", "Mars", "Venus"],
        correctAnswer: 2 
    },
    {
        question: "Vad är huvudstaden i Norge?",
        answers: ["Oslo", "Köpenhamn", "Helsingfors"],
        correctAnswer: 1 
    },
    {
        question: "Vilket språk talas i Brasilien?",
        answers: ["Spanska", "Portugisiska", "Engelska"],
        correctAnswer: 2 
    },
    {
        question: "Vad är den kemiska formeln för vatten?",
        answers: ["H2O", "CO2", "O2"],
        correctAnswer: 1 
    },
    {
        question: "Vilken kontinent ligger Egypten på?",
        answers: ["Asien", "Afrika", "Europa"],
        correctAnswer: 2 
    }
];

document.getElementById('start-game-btn').addEventListener('click', startQuiz);

let currentQuestionIndex = 0; 
let currentScore = 0; 

function startQuiz() {
    // Save user name
    const userName = document.getElementById('name-input').value; 

    // Check if the userr has entered a name
    if (!userName) {
        alert("Vänligen skriv in ditt namn!"); 
        return; 
    }

    localStorage.setItem('player-name', userName);

    // Display the players name in the game
    document.getElementById('player-name').textContent = userName;

    // Hide start screen
    document.getElementById('game-start').style.display = 'none'; 

    //Show quiz screen
    document.getElementById('game-in-progress').style.display = 'block'; 

    // Initialize scoure display and make it show 0 first
    document.getElementById('final-player-points').textContent = '0';

    //Run populateQuestionFieldss with the first question in the questions
    populateQuestionFields(currentQuestionIndex);
}

function populateQuestionFields(currentQuestion) {
    // Make sure currentQuestion is valid 
    if (currentQuestion < 0 || currentQuestion >= questions.length) {
        console.error("Invalid question index");
        return;
    }

    //Get the current question data
    const questionData = questions[currentQuestion];

    // Update the question field
    document.getElementById('question-field').textContent = `Fråga ${currentQuestion + 1}: ${questionData.question}`;

    //Update the answer fields
    document.getElementById('answer-1-field').textContent = questionData.answers[0];
    document.getElementById('answer-2-field').textContent = questionData.answers[1];
    document.getElementById('answer-3-field').textContent = questionData.answers[2];

    const checkedAnswer = document.querySelector('input[name="answers"]:checked');
    if (checkedAnswer) {
    checkedAnswer.checked = false; 
    }
}

document.getElementById('user-answer-btn').addEventListener('click', () => {
    changeQuestion(currentQuestionIndex);
});

function changeQuestion(currentQuestion) {
    // Bind the selecrted answers to a variable 
    const checkedAnswer = document.querySelector('input[name="answers"]:checked');
    const selectedAnswer = checkedAnswer ? checkedAnswer.value : null;

    // Is an answer selected?
    if (!selectedAnswer) {
        alert("Vänligen välj ett svar!"); 
        return; 
    }
    const rightAnswer = questions[currentQuestion].correctAnswer;

    //Validate users answer
    if (Number(selectedAnswer) === rightAnswer) {
        currentScore++; 
    }
    
    //Update the score display
    document.getElementById('player-points').textContent = currentScore; 
    currentQuestionIndex += 1;

    // Check if there are questions left in the array
    if (currentQuestionIndex < questions.length) {
        populateQuestionFields(currentQuestionIndex);
    } else {
        endQuiz();
    }
}
function endQuiz() {
    // Hide quiz screen
    document.getElementById('game-in-progress').style.display = 'none';

    // Show end screen
    document.getElementById('game-feedback').style.display = 'block';

    // Populate name, score, and feedback fields
    populateEndScreen(currentScore);

    // Check if perfect score
    if (currentScore === questions.length) {
        startConfetti(); 
    }
}
function populateEndScreen(totalScore) {
    const userName = localStorage.getItem('player-name'); 

    //Show name field
    document.getElementById('player-name').textContent = userName;
    
    //Show point field
    document.getElementById('final-player-points').textContent = totalScore;

    // Get feedback based on the score
    const feedbackMessage = validateUserScore(totalScore);
    
    //Updatefeedback message in the end screen
    const feedbackHeader = document.getElementById('game-feedback').querySelector('h2'); 
    if (feedbackHeader) {
        feedbackHeader.textContent = feedbackMessage;
    } else {
        console.error("Feedback header element not found.");
    }
}

    //else-if statement for each result 
function validateUserScore(score) {
    if (score >= 0 && score <= 3) {
        return "Förbättra dina kunskaper!"; 
    } else if (score >= 4 && score <= 6) {
        return "Bra jobbat! Du kan mer!"; 
    } else if (score >= 7 && score <= 9) {
        return "Mycket bra! Nästan perfekt!"; 
    } else if (score === 10) {
        return "Perfekt poäng! 🎉"; 
    } else {
        return "Ogiltig poäng."; 
    }
}
document.getElementById('restart-game-btn').addEventListener('click', restartGame);

function restartGame() {
    // reset the current question index and score
    currentQuestionIndex = 0;
    currentScore = 0;

    //clear the player name from local storage
    localStorage.removeItem('player-name');

    // Restart UI elements
    document.getElementById('game-feedback').style.display = 'none'; 
    document.getElementById('game-start').style.display = 'block'; 
    document.getElementById('player-name').textContent = ''; 
    document.getElementById('player-points').textContent = '0'; 
    
    stopConfetti();
}
