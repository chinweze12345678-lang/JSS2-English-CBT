let currentQuestion = 0;
let score = 0;
let answers = [];

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("start-screen");
const examScreen = document.getElementById("exam-screen");

const studentInfo = document.getElementById("studentInfo");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsDiv = document.getElementById("options");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

startBtn.addEventListener("click", startExam);

function startExam() {

    const name = document.getElementById("studentName").value;
    const studentClass = document.getElementById("studentClass").value;

    if(name === "" || studentClass === ""){
        alert("Please enter your Name and Class.");
        return;
    }

    studentInfo.innerHTML = `${name} | ${studentClass}`;

    startScreen.style.display = "none";
    examScreen.style.display = "block";

    loadQuestion();
}

function loadQuestion(){

    const q = questions[currentQuestion];

    questionNumber.innerHTML =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.innerHTML = q.question;

    optionsDiv.innerHTML = "";

    q.options.forEach((option,index)=>{

        const label = document.createElement("label");

        label.className = "option";

        label.innerHTML = `
            <input
                type="radio"
                name="option"
                value="${index}"
                ${answers[currentQuestion]==index ? "checked":""}
            >
            ${option}
        `;

        optionsDiv.appendChild(label);

    });

}

nextBtn.addEventListener("click",()=>{

    saveAnswer();

    if(currentQuestion < questions.length-1){

        currentQuestion++;

        loadQuestion();

    }else{

    if(confirm("Are you sure you want to submit your exam?")){
        finishExam();
    }

}

});

prevBtn.addEventListener("click",()=>{

    saveAnswer();

    if(currentQuestion>0){

        currentQuestion--;

        loadQuestion();

    }

});

function saveAnswer(){

    const selected =
        document.querySelector('input[name="option"]:checked');

    if(selected){

        answers[currentQuestion]=Number(selected.value);

    }

}

function finishExam(){

    score=0;

    questions.forEach((q,index)=>{

        if(answers[index]===q.answer){

            score++;

        }

    });

    document.body.innerHTML = `
<div style="max-width:600px;margin:40px auto;text-align:center;font-family:Arial;padding:20px;">
    <h1>FESBEVERLY HILLS ACADEMY</h1>

    <h2>JSS2 ENGLISH CBT RESULT</h2>

    <h3>Candidate: ${document.getElementById("studentName").value}</h3>

    <h2>${score} / ${questions.length}</h2>

    <h3>${Math.round((score/questions.length)*100)}%</h3>

    <button onclick="location.reload()">
        Take Exam Again
    </button>

</div>
`;
        }
