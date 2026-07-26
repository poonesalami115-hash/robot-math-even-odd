/* ==========================================
ربات ریاضی | کلاس ششم
game.js
========================================== */

/* ---------- صفحات ---------- */

const introPage = document.getElementById("introPage");
const loginPage = document.getElementById("loginPage");
const gamePage = document.getElementById("gamePage");
const finishPage = document.getElementById("finishPage");

/* ---------- صفحه معرفی ---------- */

const introSpeech = document.getElementById("introSpeech");
const loadingFill = document.getElementById("loadingFill");

/* ---------- صفحه ورود ---------- */

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

/* ---------- شروع برنامه ---------- */

window.addEventListener("load", startIntro);

/* ==========================================
معرفی ربات
========================================== */

function startIntro(){

    let messageIndex = 0;

    let percent = 0;

    introSpeech.innerHTML = introMessages[0];

    const messageTimer = setInterval(function(){

        messageIndex++;

        if(messageIndex < introMessages.length){

            introSpeech.innerHTML = introMessages[messageIndex];

        }

    },1500);

    const loadingTimer = setInterval(function(){

        percent++;

        loadingFill.style.width = percent + "%";

        if(percent >= 100){

            clearInterval(messageTimer);

            clearInterval(loadingTimer);

            showLoginPage();

        }

    },50);

}

/* ==========================================
نمایش صفحه ورود
========================================== */

function showLoginPage(){

    introPage.classList.add("hidden");

    loginPage.classList.remove("hidden");

}

/* ==========================================
ورود دانش آموز
========================================== */

startBtn.addEventListener("click",checkLogin);

function checkLogin(){

    loginError.innerHTML = "";

    const name = studentName.value.trim();

    const code = studentCode.value.trim();

    if(name === ""){

        loginError.innerHTML = "نام و نام خانوادگی را وارد کنید.";

        return;

    }

    if(code.length !== 10){

        loginError.innerHTML = "کد ملی باید ۱۰ رقم باشد.";

        return;

    }

    loginPage.classList.add("hidden");

    gamePage.classList.remove("hidden");

    startGame();

}
/* ==========================================
متغیرهای بازی
========================================== */

let currentQuestion = 0;
let score = 0;
let stars = 0;
let battery = 100;

/* ---------- عناصر بازی ---------- */

const questionNumber = document.getElementById("currentQuestion");
const questionBox = document.getElementById("questionBox");

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

/* ---------- نوار بالا ---------- */

const coinValue = document.getElementById("coinValue");
const starValue = document.getElementById("starValue");
const batteryValue = document.getElementById("batteryValue");

/* ---------- ربات ---------- */

const speechBox = document.getElementById("speechBox");

/* ==========================================
شروع بازی
========================================== */

function startGame(){

    currentQuestion = 0;

    score = 0;

    stars = 0;

    battery = 100;

    updateStatus();

    showQuestion();

}

/* ==========================================
نمایش سؤال
========================================== */

function showQuestion(){

    if(currentQuestion >= questions.length){

        finishGame();

        return;

    }

    const q = questions[currentQuestion];

    questionNumber.innerHTML = currentQuestion + 1;

    questionBox.innerHTML = q.question;

    answer1.innerHTML = q.options[0] || "";
    answer2.innerHTML = q.options[1] || "";
    answer3.innerHTML = q.options[2] || "";
    answer4.innerHTML = q.options[3] || "";

    speechBox.innerHTML = "آماده‌ای؟";

}

/* ==========================================
بروزرسانی نوار بالا
========================================== */

function updateStatus(){

    coinValue.innerHTML = score;

    starValue.innerHTML = stars;

    batteryValue.innerHTML = battery + "%";

}
