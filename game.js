/* ==========================================
ربات ریاضی | کلاس ششم
game.js
==========================================*/

// ---------- صفحات ----------

const introPage = document.getElementById("introPage");
const loginPage = document.getElementById("loginPage");
const gamePage = document.getElementById("gamePage");
const finishPage = document.getElementById("finishPage");

// ---------- معرفی ----------

const introSpeech = document.getElementById("introSpeech");
const loadingFill = document.getElementById("loadingFill");

// ---------- متن‌های معرفی ----------

const introMessages = [

    "سلام دوست من 🌸",

    "من ربات ریاضی هستم 🤖",

    "امروز با هم بازی می‌کنیم.",

    "آماده شو..."

];

// ---------- شروع ----------

window.addEventListener("load", startIntro);

// ---------- صفحه معرفی ----------

function startIntro(){

    let messageIndex = 0;

    let percent = 0;

    introSpeech.textContent = introMessages[0];

    const messageTimer = setInterval(function(){

        messageIndex++;

        if(messageIndex < introMessages.length){

            introSpeech.textContent = introMessages[messageIndex];

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

// ---------- نمایش صفحه ورود ----------

function showLoginPage(){

    introPage.classList.add("hidden");

    loginPage.classList.remove("hidden");

}
