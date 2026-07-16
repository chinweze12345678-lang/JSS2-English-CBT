2// ======================================
// CBT ENGINE V3.0
// ======================================

let currentQuestion = 0;
let answers = [];
let score = 0;

let timeLeft = 40 * 60;
let timer = null;

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
    updatePalette();

    startTimer();

}

// =========================
// TIMER
// =========================

function startTimer() {

    console.log("Timer started");

    updateTimer();

    timer = setInterval(function(){

        console.log("Tick", timeLeft);

        timeLeft--;

        updateTimer();

        if(timeLeft <= 0){

            clearInterval(timer);

            alert("Time is up!");

            finishExam();

        }

    },1000);

}

function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerDisplay.innerHTML =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

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
            ${answers[currentQuestion] === index ? "checked" : ""}
        >
        ${option}
        `;

        optionsDiv.appendChild(label);

    });

    updateProgress();
    updatePalette();

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
// PROGRESS BAR
// =========================

function updateProgress() {

    const percent =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = percent + "%";

}

// =========================
// QUESTION PALETTE
// =========================

function createPalette() {

    palette.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {

        const btn = document.createElement("button");

        btn.innerHTML = i + 1;

        btn.className = "palette-btn";

        btn.onclick = function () {

            saveAnswer();

            currentQuestion = i;

            loadQuestion();

        };

        palette.appendChild(btn);

    }

}

function updatePalette() {

    const buttons = palette.querySelectorAll("button");

    buttons.forEach((btn, index) => {

        btn.className = "palette-btn";

        if (answers[index] !== undefined) {

            btn.classList.add("answered");

        }

        if (index === currentQuestion) {

            btn.classList.add("current");

        }

    });

}

// =========================
// NEXT
// =========================

nextBtn.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        if (confirm("Submit examination?")) {

            finishExam();

        }

    }

});

// =========================
// PREVIOUS
// =========================

prevBtn.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});

// =========================
// SUBMIT
// =========================

submitBtn.addEventListener("click", () => {

    saveAnswer();

    if (confirm("Are you sure you want to submit?")) {

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

    const percentage =
        Math.round((score / questions.length) * 100);

    document.body.innerHTML = `

<div style="max-width:700px;margin:40px auto;padding:25px;text-align:center;font-family:Arial;">

<h1>FESBEVERLY HILLS ACADEMY</h1>

<h2>JSS2 ENGLISH LANGUAGE CBT RESULT</h2>

<hr>

<h3>Candidate</h3>

<p>${document.getElementById("studentName").value}</p>

<h2>${score} / ${questions.length}</h2>

<h2>${percentage}%</h2>

<button onclick="location.reload()">
Take Examination Again
</button>

</div>

`;

        }
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
    updatePalette();

    startTimer();

}

// =========================
// TIMER
// =========================

function startTimer() {

    updateTimer();

    timer = setInterval(() => {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timer);

            alert("Time is up!");

            finishExam();

        }

    }, 1000);

}

function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerDisplay.innerHTML =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

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
            ${answers[currentQuestion] === index ? "checked" : ""}
        >
        ${option}
        `;

        optionsDiv.appendChild(label);

    });

    updateProgress();
    updatePalette();

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
// PROGRESS BAR
// =========================

function updateProgress() {

    const percent =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = percent + "%";

}

// =========================
// QUESTION PALETTE
// =========================

function createPalette() {

    palette.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {

        const btn = document.createElement("button");

        btn.innerHTML = i + 1;

        btn.className = "palette-btn";

        btn.onclick = function () {

            saveAnswer();

            currentQuestion = i;

            loadQuestion();

        };

        palette.appendChild(btn);

    }

}

function updatePalette() {

    const buttons = palette.querySelectorAll("button");

    buttons.forEach((btn, index) => {

        btn.className = "palette-btn";

        if (answers[index] !== undefined) {

            btn.classList.add("answered");

        }

        if (index === currentQuestion) {

            btn.classList.add("current");

        }

    });

}

// =========================
// NEXT
// =========================

nextBtn.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        if (confirm("Submit examination?")) {

            finishExam();

        }

    }

});

// =========================
// PREVIOUS
// =========================

prevBtn.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});

// =========================
// SUBMIT
// =========================

submitBtn.addEventListener("click", () => {

    saveAnswer();

    if (confirm("Are you sure you want to submit?")) {

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

    const percentage =
        Math.round((score / questions.length) * 100);

    document.body.innerHTML = `

<div style="max-width:700px;margin:40px auto;padding:25px;text-align:center;font-family:Arial;">

<h1>FESBEVERLY HILLS ACADEMY</h1>

<h2>JSS2 ENGLISH LANGUAGE CBT RESULT</h2>

<hr>

<h3>Candidate</h3>

<p>${document.getElementById("studentName").value}</p>

<h2>${score} / ${questions.length}</h2>

<h2>${percentage}%</h2>

<button onclick="location.reload()">
Take Examination Again
</button>

</div>

`;

}
