// =========================
// CBT ENGINE V2.0
// =========================

let currentQuestion = 0;
let answers = [];
let score = 0;

let timeLeft = 40 * 60; // 40 minutes
let timer;

// =========================
// HTML ELEMENTS
// =========================

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("start-screen");
const examScreen = document.getElementById("exam-screen");

const studentInfo = document.getElementById("studentInfo");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsDiv = document.getElementById("options");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const palette = document.getElementById("palette");

// =========================
// START EXAM
// =========================

startBtn.addEventListener("click", startExam);

function startExam() {

    const name = document.getElementById("studentName").value.trim();

    if (name === "") {
        alert("Please enter your full name.");
        return;
    }

    studentInfo.innerHTML = "Candidate: " + name;

    startScreen.style.display = "none";
    examScreen.style.display = "block";

    createPalette();
    loadQuestion();
    updateProgress();
    startTimer();

}

// =========================
// TIMER
// =========================

function startTimer() {

    timer = setInterval(function () {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerDisplay.innerHTML =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        timeLeft--;

        if (timeLeft < 0) {

            clearInterval(timer);

            alert("Time is up!");

            finishExam();

        }

    }, 1000);

}

// =========================
// PLACEHOLDERS
// =========================

function createPalette() {

    // Will be added later

}

function updateProgress() {

    // Will be added later

}

// =========================
// LOAD QUESTION
// =========================

function loadQuestion() {

    const q = questions[currentQuestion];

    questionNumber.innerHTML =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.innerHTML = q.question;

    optionsDiv.innerHTML = "";

    q.options.forEach((option, index) => {

        const label = document.createElement("label");

        label.className = "option";

        label.innerHTML = `
            <input
                type="radio"
                name="option"
                value="${index}"
                ${answers[currentQuestion] == index ? "checked" : ""}
            >
            ${option}
        `;

        optionsDiv.appendChild(label);

    });

}

// =========================
// SAVE ANSWER
// =========================

function saveAnswer() {

    const selected =
        document.querySelector('input[name="option"]:checked');

    if (selected) {

        answers[currentQuestion] = Number(selected.value);

    }

}

// =========================
// NEXT BUTTON
// =========================

nextBtn.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

        updateProgress();

    } else {

        if (confirm("Are you sure you want to submit your examination?")) {

            finishExam();

        }

    }

});

// =========================
// PREVIOUS BUTTON
// =========================

prevBtn.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

        updateProgress();

    }

});

// =========================
// SUBMIT BUTTON
// =========================

submitBtn.addEventListener("click", () => {

    saveAnswer();

    if (confirm("Are you sure you want to submit your examination?")) {

        finishExam();

    }

});

// =========================
// FINISH EXAM
// =========================

function finishExam() {

    clearInterval(timer);

    score = 0;

    questions.forEach((q, index) => {

        if (answers[index] === q.answer) {

            score++;

        }

    });

    document.body.innerHTML = `
<div style="max-width:600px;margin:40px auto;text-align:center;font-family:Arial;padding:20px;">

<h1>FESBEVERLY HILLS ACADEMY</h1>

<h2>JSS2 ENGLISH LANGUAGE CBT RESULT</h2>

<h3>Candidate: ${document.getElementById("studentName").value}</h3>

<h2>Score: ${score} / ${questions.length}</h2>

<h3>Percentage: ${Math.round((score / questions.length) * 100)}%</h3>

<button onclick="location.reload()">
Take Examination Again
</button>

</div>
`;

}
