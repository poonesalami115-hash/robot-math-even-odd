/* =========================================
ربات ریاضی | کلاس ششم
game.js
========================================= */

// صفحات

const introPage = document.getElementById("introPage");
const loginPage = document.getElementById("loginPage");
const gamePage = document.getElementById("gamePage");
const finishPage = document.getElementById("finishPage");

// معرفی

const introSpeech = document.getElementById("introSpeech");
const loadingFill = document.getElementById("loadingFill");

// ورود

const studentName = document.getElementById("studentName");
const studentCode = document.getElementById("studentCode");
const loginError = document.getElementById("loginError");
const startBtn = document.getElementById("startBtn");

// وضعیت بازی

let battery = 0;
let stars = 0;
let coins = 0;
let score = 0;

let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;

// شروع برنامه

window.onload = startIntro;
/* =========================================
شروع صفحه معرفی
========================================= */

const introMessages = [

    "سلام دوست من 🌸",
    "من ربات ریاضی هستم 🤖",
    "امروز با هم بازی می‌کنیم.",
    "آماده شو..."

];

let introIndex = 0;
let loading = 0;

function startIntro(){

    introSpeech.innerHTML = introMessages[0];

    const messageTimer = setInterval(()=>{

        introIndex++;

        if(introIndex < introMessages.length){

            introSpeech.innerHTML = introMessages[introIndex];

        }

    },1500);

    const loadingTimer = setInterval(()=>{

        loading++;

        loadingFill.style.width = loading + "%";

        if(loading >= 100){

            clearInterval(loadingTimer);
            clearInterval(messageTimer);

            showLoginPage();

        }

    },50);

}
