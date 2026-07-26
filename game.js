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
