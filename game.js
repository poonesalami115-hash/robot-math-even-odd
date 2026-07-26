/* ==========================================
ربات ریاضی کلاس ششم
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

// ---------- ورود ----------
const studentName = document.getElementById("studentName");
const studentCode = document.getElementById("studentCode");
const loginError = document.getElementById("loginError");
const startBtn = document.getElementById("startBtn");

// ---------- متن معرفی ----------
const introMessages = [
    "سلام دوست من 🌸",
    "من ربات ریاضی هستم 🤖",
    "امروز با هم بازی می‌کنیم.",
    "آماده شو..."
];

// ---------- شروع ----------
window.onload = function () {
    startIntro();
};

function startIntro(){

    let percent = 0;
    let msg = 0;

    introSpeech.innerHTML = introMessages[0];

    const speechTimer = setInterval(function(){

        msg++;

        if(msg < introMessages.length){

            introSpeech.innerHTML = introMessages[msg];

        }

    },1500);

    const loadTimer = setInterval(function(){

        percent++;

        loadingFill.style.width = percent + "%";

        if(percent >= 100){

            clearInterval(loadTimer);
            clearInterval(speechTimer);

            introPage.classList.add("hidden");
            loginPage.classList.remove("hidden");

        }

    },50);

}

// ---------- ورود ----------
startBtn.onclick = function(){

    loginError.innerHTML = "";

    if(studentName.value.trim()==""){

        loginError.innerHTML="نام را وارد کنید";

        return;

    }

    if(studentCode.value.trim().length!=10){

        loginError.innerHTML="کد ملی باید ۱۰ رقم باشد";

        return;

    }

    loginPage.classList.add("hidden");
    gamePage.classList.remove("hidden");

};
