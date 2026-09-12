// ==========================================
// SHORTCUTLAB - QUIZ
// ==========================================


// ==========================================
// QUESTIONS
// ==========================================

const questions = [

    {
        question: "Quel raccourci permet de copier un élément ?",

        answers: [
            "CTRL + C",
            "CTRL + V",
            "CTRL + X",
            "CTRL + Z"
        ],

        correct: "CTRL + C"
    },


    {
        question: "Quel raccourci permet de coller un élément ?",

        answers: [
            "CTRL + A",
            "CTRL + V",
            "CTRL + S",
            "ALT + TAB"
        ],

        correct: "CTRL + V"
    },


    {
        question: "Quel raccourci permet d'annuler la dernière action ?",

        answers: [
            "CTRL + X",
            "CTRL + Z",
            "CTRL + C",
            "WIN + D"
        ],

        correct: "CTRL + Z"
    },


    {
        question: "Quel raccourci permet de tout sélectionner ?",

        answers: [
            "CTRL + A",
            "CTRL + S",
            "CTRL + C",
            "WIN + E"
        ],

        correct: "CTRL + A"
    },


    {
        question: "Quel raccourci permet d'enregistrer rapidement son travail ?",

        answers: [
            "CTRL + S",
            "CTRL + D",
            "ALT + S",
            "WIN + S"
        ],

        correct: "CTRL + S"
    },


    {
        question: "Quel raccourci ouvre l'Explorateur de fichiers ?",

        answers: [
            "WIN + E",
            "WIN + D",
            "WIN + F",
            "CTRL + E"
        ],

        correct: "WIN + E"
    },


    {
        question: "Quel raccourci permet de changer rapidement de fenêtre ?",

        answers: [
            "CTRL + TAB",
            "ALT + TAB",
            "WIN + TAB",
            "ALT + F4"
        ],

        correct: "ALT + TAB"
    },


    {
        question: "Quel raccourci affiche rapidement le bureau Windows ?",

        answers: [
            "WIN + E",
            "WIN + D",
            "WIN + B",
            "CTRL + D"
        ],

        correct: "WIN + D"
    },


    {
        question: "Quel raccourci ouvre directement le Gestionnaire des tâches ?",

        answers: [
            "CTRL + ALT + DEL",
            "CTRL + SHIFT + ESC",
            "ALT + ESC",
            "WIN + ESC"
        ],

        correct: "CTRL + SHIFT + ESC"
    },


    {
        question: "Quel raccourci permet de couper un élément ?",

        answers: [
            "CTRL + C",
            "CTRL + X",
            "CTRL + V",
            "CTRL + Z"
        ],

        correct: "CTRL + X"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;

let score = 0;

let quizQuestions = [];


// ==========================================
// ÉLÉMENTS HTML
// ==========================================

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const questionNumberElement =
    document.getElementById("questionNumber");

const scoreElement =
    document.getElementById("score");

const quizProgress =
    document.getElementById("quizProgress");

const nextButton =
    document.getElementById("nextButton");

const quiz =
    document.getElementById("quiz");

const result =
    document.getElementById("result");

const finalScore =
    document.getElementById("finalScore");

const resultText =
    document.getElementById("resultText");

const bestScore =
    document.getElementById("bestScore");

const restartButton =
    document.getElementById("restartButton");


// ==========================================
// MÉLANGER LES QUESTIONS
// ==========================================

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}


// ==========================================
// DÉMARRER LE QUIZ
// ==========================================

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    quizQuestions = shuffle(questions);

    quiz.style.display = "block";

    result.style.display = "none";

    scoreElement.textContent =
        "SCORE : 0";

    showQuestion();

}


// ==========================================
// AFFICHER UNE QUESTION
// ==========================================

function showQuestion() {

    const question =
        quizQuestions[currentQuestion];


    questionElement.textContent =
        question.question;


    questionNumberElement.textContent =
        `QUESTION ${currentQuestion + 1} / ${quizQuestions.length}`;


    const percentage =
        ((currentQuestion) / quizQuestions.length) * 100;


    quizProgress.style.width =
        percentage + "%";


    answersElement.innerHTML = "";


    nextButton.style.display = "none";


    // Mélanger les réponses

    const shuffledAnswers =
        shuffle(question.answers);


    shuffledAnswers.forEach(answer => {

        const button =
            document.createElement("button");


        button.className = "answer";


        button.textContent =
            answer;


        button.addEventListener(
            "click",
            () => selectAnswer(button, answer)
        );


        answersElement.appendChild(button);

    });

}


// ==========================================
// CHOISIR UNE RÉPONSE
// ==========================================

function selectAnswer(button, answer) {

    const question =
        quizQuestions[currentQuestion];


    const buttons =
        document.querySelectorAll(".answer");


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (answer === question.correct) {

        button.classList.add("correct");

        score++;

        scoreElement.textContent =
            "SCORE : " + score;

    } else {

        button.classList.add("wrong");


        buttons.forEach(btn => {

            if (
                btn.textContent === question.correct
            ) {

                btn.classList.add("correct");

            }

        });

    }


    nextButton.style.display = "block";

}


// ==========================================
// QUESTION SUIVANTE
// ==========================================

nextButton.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion < quizQuestions.length
        ) {

            showQuestion();

        } else {

            showResult();

        }

    }
);


// ==========================================
// AFFICHER LE RÉSULTAT
// ==========================================

function showResult() {

    quiz.style.display = "none";

    result.style.display = "block";


    finalScore.textContent =
        `${score} / ${quizQuestions.length}`;


    let message;


    if (score === 10) {

        message =
            "PERFECT ! Tu maîtrises les raccourcis 🔥";

    } else if (score >= 8) {

        message =
            "Excellent ! Tu connais vraiment bien les raccourcis 💪";

    } else if (score >= 5) {

        message =
            "Pas mal ! Continue à t'entraîner 🚀";

    } else {

        message =
            "Continue d'apprendre, tu vas progresser 🧠";

    }


    resultText.textContent =
        message;


    // Sauvegarder le meilleur score

    const oldBest =
        Number(
            localStorage.getItem("bestQuizScore")
        ) || 0;


    const newBest =
        Math.max(oldBest, score);


    localStorage.setItem(
        "bestQuizScore",
        newBest
    );


    bestScore.textContent =
        `Meilleur score : ${newBest} / ${quizQuestions.length}`;


    quizProgress.style.width =
        "100%";

}


// ==========================================
// REJOUER
// ==========================================

restartButton.addEventListener(
    "click",
    startQuiz
);


// ==========================================
// LANCEMENT
// ==========================================

startQuiz();

console.log("ShortcutLab Quiz chargé 🚀");