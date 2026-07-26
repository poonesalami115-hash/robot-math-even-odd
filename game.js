/* ==========================================
ربات ریاضی | کلاس ششم
نسخه جدید
========================================== */

/* ---------- صفحات ---------- */

const introPage = document.getElementById("introPage");
const loginPage = document.getElementById("loginPage");
const gamePage = document.getElementById("gamePage");
const finishPage = document.getElementById("finishPage");

/* ---------- معرفی ---------- */

const introSpeech = document.getElementById("introSpeech");
const loadingFill = document.getElementById("loadingFill");

/* ---------- ورود ---------- */

const studentName = document.getElementById("studentName");
const studentCode = document.getElementById("studentCode");
const loginError = document.getElementById("loginError");
const startBtn = document.getElementById("startBtn");

/* ---------- متن معرفی ---------- */

const introMessages = [

    "سلام دوست من 🌸",

    "من ربات ریاضی هستم 🤖",

    "امروز با هم بازی می‌کنیم.",

    "آماده شو..."

];

/* ---------- شروع ---------- */

window.addEventListener("load", startIntro);

/* ==========================================
صفحه معرفی
========================================== */

function startIntro(){

    let index = 0;

    let percent = 0;

    introSpeech.innerHTML = introMessages[0];

    const messageTimer = setInterval(function(){

        index++;

        if(index < introMessages.length){

            introSpeech.innerHTML = introMessages[index];

        }

    },1500);

    const loadingTimer = setInterval(function(){

        percent++;

        loadingFill.style.width = percent + "%";

        if(percent >= 100){

            clearInterval(messageTimer);

            clearInterval(loadingTimer);

            introPage.classList.add("hidden");

            loginPage.classList.remove("hidden");

        }

    },50);

}
/* ==========================================
متغیرهای بازی
========================================== */

let currentQuestion = 0;

let score = 0;

let stars = 0;

let coins = 0;

let battery = 0;

let timeLeft = 40 * 60; // ۴۰ دقیقه

/* ---------- عناصر صفحه ---------- */

const questionBox = document.getElementById("questionBox");

const currentQuestionSpan = document.getElementById("currentQuestion");

const totalQuestionSpan = document.getElementById("totalQuestion");

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

const speechBox = document.getElementById("speechBox");

/* ==========================================
شروع بازی
========================================== */

function startGame(){

    currentQuestion = 0;

    totalQuestionSpan.innerHTML = questions.length;

    showQuestion();

}

/* ==========================================
نمایش سؤال
========================================== */

function showQuestion(){

    const q = questions[currentQuestion];

    currentQuestionSpan.innerHTML = currentQuestion + 1;

    questionBox.innerHTML = q.question;

    answer1.innerHTML = q.options[0] || "";

    answer2.innerHTML = q.options[1] || "";

    answer3.innerHTML = q.options[2] || "";

    answer4.innerHTML = q.options[3] || "";

    speechBox.innerHTML = "پاسخ درست را انتخاب کن 🌸";

}
/* ==========================================
بررسی پاسخ
========================================== */

answer1.onclick = ()=>checkAnswer(0);
answer2.onclick = ()=>checkAnswer(1);
answer3.onclick = ()=>checkAnswer(2);
answer4.onclick = ()=>checkAnswer(3);

function checkAnswer(index){

    const q = questions[currentQuestion];

    if(index === q.answer){

        speechBox.innerHTML = "آفرین 🌸";

        score++;

        stars++;

    }else{

        speechBox.innerHTML = "اشتباه بود 😊";

    }

    setTimeout(function(){

        currentQuestion++;

        if(currentQuestion < questions.length){

            showQuestion();

        }else{

            alert("آزمون تمام شد.");

        }

    },1000);

}
