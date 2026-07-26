/* ==========================================
ربات ریاضی | کلاس ششم
game.js
بخش ۱
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

/* ==========================================
شروع برنامه
========================================== */

window.addEventListener("load", startIntro);

/* ==========================================
صفحه معرفی
========================================== */

function startIntro(){

    let percent = 0;
    let messageIndex = 0;

    introSpeech.textContent = introMessages[0];

    const speechTimer = setInterval(function(){

        messageIndex++;

        if(messageIndex < introMessages.length){

            introSpeech.textContent = introMessages[messageIndex];

        }

    },1500);

    const loadingTimer = setInterval(function(){

        percent++;

        loadingFill.style.width = percent + "%";

        if(percent >= 100){

            clearInterval(speechTimer);
            clearInterval(loadingTimer);

            introPage.classList.add("hidden");
            loginPage.classList.remove("hidden");

        }

    },50);

}

/* ==========================================
ورود دانش‌آموز
========================================== */

startBtn.addEventListener("click", checkLogin);

function checkLogin(){

    loginError.textContent = "";

    const name = studentName.value.trim();
    const code = studentCode.value.trim();

    if(name === ""){

        loginError.textContent = "نام و نام خانوادگی را وارد کنید.";

        return;

    }

    if(code.length !== 10){

        loginError.textContent = "کد ملی باید ۱۰ رقم باشد.";

        return;

    }

    loginPage.classList.add("hidden");
    gamePage.classList.remove("hidden");

    // بخش دوم این تابع را کامل می‌کند
    startGame();

}

/* ==========================================
تابع موقت
(در بخش ۲ کامل می‌شود)
========================================== */

function startGame(){

    console.log("شروع بازی");

}
/* ==========================================
بخش ۲
نمایش سؤال
========================================== */

// وضعیت بازی

let currentQuestion = 0;

// عناصر صفحه

const questionBox = document.getElementById("questionBox");

const currentQuestionSpan = document.getElementById("currentQuestion");

const totalQuestionSpan = document.getElementById("totalQuestion");

const speechBox = document.getElementById("speechBox");

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

/* ==========================================
شروع واقعی بازی
========================================== */

function startGame(){

    currentQuestion = 0;

    totalQuestionSpan.textContent = questions.length;

    showQuestion();

}

/* ==========================================
نمایش سؤال
========================================== */

function showQuestion(){

    const q = questions[currentQuestion];

    currentQuestionSpan.textContent = currentQuestion + 1;

    questionBox.textContent = q.question;

    speechBox.textContent = "پاسخ درست را انتخاب کن 🌸";

    answer1.textContent = q.options[0] || "";

    answer2.textContent = q.options[1] || "";

    answer3.textContent = q.options[2] || "";

    answer4.textContent = q.options[3] || "";

}
