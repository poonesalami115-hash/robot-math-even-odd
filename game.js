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
