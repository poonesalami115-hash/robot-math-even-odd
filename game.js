/* ==========================================
ربات ریاضی کلاس ششم
game.js
نسخه نهایی
========================================== */

/* ===========================
صفحات
=========================== */

const introPage = document.getElementById("introPage");
const loginPage = document.getElementById("loginPage");
const gamePage = document.getElementById("gamePage");
const finishPage = document.getElementById("finishPage");

/* ===========================
صفحه معرفی
=========================== */

const introSpeech = document.getElementById("introSpeech");
const loadingFill = document.getElementById("loadingFill");

/* ===========================
ورود
=========================== */

const studentName = document.getElementById("studentName");
const studentCode = document.getElementById("studentCode");
const loginError = document.getElementById("loginError");
const startBtn = document.getElementById("startBtn");

/* ===========================
بازی
=========================== */

const robot = document.getElementById("robot");
const speechBox = document.getElementById("speechBox");

const questionBox = document.getElementById("questionBox");

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

const currentQuestionText =
document.getElementById("currentQuestion");

const totalQuestionText =
document.getElementById("totalQuestion");

const batteryValue =
document.getElementById("batteryValue");

const starValue =
document.getElementById("starValue");

const coinValue =
document.getElementById("coinValue");

const batteryFill =
document.getElementById("batteryFill");

/* ===========================
پایان بازی
=========================== */

const resultName =
document.getElementById("resultName");

const resultCode =
document.getElementById("resultCode");

const resultDate =
document.getElementById("resultDate");

const resultTime =
document.getElementById("resultTime");

const correctCount =
document.getElementById("correctCount");

const wrongCount =
document.getElementById("wrongCount");

const resultScore =
document.getElementById("resultScore");

const resultPercent =
document.getElementById("resultPercent");

const resultBattery =
document.getElementById("resultBattery");

const resultStars =
document.getElementById("resultStars");

const resultCoins =
document.getElementById("resultCoins");

const resultMedal =
document.getElementById("resultMedal");

const finishMessage =
document.getElementById("finishMessage");

const playAgainBtn =
document.getElementById("playAgainBtn");

const screenShotBtn =
document.getElementById("screenShotBtn");

/* ===========================
صداها
=========================== */

const correctSound =
document.getElementById("correctSound");

const wrongSound =
document.getElementById("wrongSound");

const coinSound =
document.getElementById("coinSound");

const winSound =
document.getElementById("winSound");

/* موسیقی پس زمینه */

const backgroundMusic =
new Audio("robot background.mp3");

/* صدای کلیک */

const buttonSound =
new Audio("button.mp3");

/* صدای افزایش باتری */

const batterySound =
new Audio("battery.mp3");

/* صدای ستاره */

const starSound =
new Audio("star.mp3");

/* صدای ربات */

const robotCorrect =
new Audio("robot-correct.mp3");

const robotWrong =
new Audio("robot-wrong.mp3");

const robotFinish =
new Audio("robot-finish.mp3");

const fireWorks =
new Audio("fireworks.mp3");

/* ===========================
تنظیمات صدا
=========================== */

backgroundMusic.loop = true;
backgroundMusic.volume = 0.25;

buttonSound.volume = 1;
batterySound.volume = 1;
starSound.volume = 1;
robotCorrect.volume = 1;
robotWrong.volume = 1;
robotFinish.volume = 1;
fireWorks.volume = 1;

/* ===========================
متغیرهای بازی
=========================== */

let currentQuestion = 0;

let battery = 0;

let stars = 0;

let coins = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let wrongTry = 0;

let timer = null;

let minute = 40;

let second = 0;

/* ===========================
متن معرفی
=========================== */

const introMessages = [

"سلام دوست من 🌸",

"من ربات ریاضی هستم 🤖",

"امروز با هم بازی می‌کنیم.",

"آماده شو..."

];

/* ===========================
شروع برنامه
=========================== */

window.onload = function(){

    totalQuestionText.innerHTML =
    questions.length;

    startIntro();

};
/* ==========================================
بخش ۲
معرفی + ورود + شروع بازی
========================================== */

function startIntro(){

    let percent = 0;
    let messageIndex = 0;

    introSpeech.innerHTML = introMessages[0];

    const speechTimer = setInterval(function(){

        messageIndex++;

        if(messageIndex < introMessages.length){

            introSpeech.innerHTML =
            introMessages[messageIndex];

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
ورود
========================================== */

startBtn.addEventListener("click", checkLogin);

function checkLogin(){

    buttonSound.currentTime = 0;
    buttonSound.play();

    loginError.innerHTML = "";

    const name = studentName.value.trim();
    const code = studentCode.value.trim();

    if(name === ""){

        loginError.innerHTML =
        "نام و نام خانوادگی را وارد کنید.";

        return;

    }

    if(code.length !== 10){

        loginError.innerHTML =
        "کد ملی باید ۱۰ رقم باشد.";

        return;

    }

    loginPage.classList.add("hidden");
    gamePage.classList.remove("hidden");

    startGame();

}

/* ==========================================
شروع بازی
========================================== */

function startGame(){

    currentQuestion = 0;

    correctAnswers = 0;
    wrongAnswers = 0;

    battery = 0;
    stars = 0;
    coins = 0;

    wrongTry = 0;

    batteryValue.innerHTML = "0%";
    starValue.innerHTML = "0";
    coinValue.innerHTML = "0";

    batteryFill.style.width = "0%";

    speechBox.innerHTML =
    "شروع کنیم 🌸";

    robot.src = "robot.png";

    backgroundMusic.currentTime = 0;
    backgroundMusic.play().catch(()=>{});

    totalQuestionText.innerHTML = questions.length;

    showQuestion();

    startTimer();

}
/* ==========================================
بخش ۳
نمایش سؤال
========================================== */

function showQuestion(){

    wrongTry = 0;

    const q = questions[currentQuestion];

    currentQuestionText.innerHTML = currentQuestion + 1;

    questionBox.innerHTML = q.question;

    answer1.innerHTML = q.options[0] || "";
    answer2.innerHTML = q.options[1] || "";
    answer3.innerHTML = q.options[2] || "";
    answer4.innerHTML = q.options[3] || "";

    /* اگر سؤال فقط دو گزینه داشت */

    if(q.options.length == 2){

        answer3.style.display = "none";
        answer4.style.display = "none";

    }else{

        answer3.style.display = "block";
        answer4.style.display = "block";

    }

    robot.src = "robot.png";

    speechBox.innerHTML = "جواب را انتخاب کن 🌸";

}
/* ==========================================
بخش ۴
پاسخ ها
========================================== */

answer1.addEventListener("click",()=>checkAnswer(0));
answer2.addEventListener("click",()=>checkAnswer(1));
answer3.addEventListener("click",()=>checkAnswer(2));
answer4.addEventListener("click",()=>checkAnswer(3));

function checkAnswer(selected){

    buttonSound.currentTime=0;
    buttonSound.play();

    const q=questions[currentQuestion];

    /* -----------------------
       جواب صحیح
    ----------------------- */

    if(selected===q.answer){

        wrongTry=0;

        correctAnswers++;

        battery=Math.min(100,battery+5);

        stars++;

        coins+=10;

        batteryValue.innerHTML=battery+"%";
        starValue.innerHTML=stars;
        coinValue.innerHTML=coins;

        batteryFill.style.width=battery+"%";

        correctSound.currentTime=0;
        correctSound.play();

        coinSound.currentTime=0;
        coinSound.play();

        batterySound.currentTime=0;
        batterySound.play();

        starSound.currentTime=0;
        starSound.play();

        robotCorrect.currentTime=0;
        robotCorrect.play();

        robot.src="robot.png";

        speechBox.innerHTML="آفرین 🌸";

        setTimeout(function(){

            currentQuestion++;

            if(currentQuestion<questions.length){

                showQuestion();

            }else{

                finishGame();

            }

        },2500);

    }

    /* -----------------------
       جواب غلط
    ----------------------- */

    else{

        wrongTry++;

        wrongAnswers++;

        wrongSound.currentTime=0;
        wrongSound.play();

        robotWrong.currentTime=0;
        robotWrong.play();

        /* بار اول */

        if(wrongTry==1){

            speechBox.innerHTML="دوباره فکر کن 😊";

        }

        /* بار دوم */

        else{

            speechBox.innerHTML=
            "پاسخ صحیح : "+q.options[q.answer];

            setTimeout(function(){

                currentQuestion++;

                if(currentQuestion<questions.length){

                    showQuestion();

                }else{

                    finishGame();

                }

            },3000);

        }

    }

}
/* ==========================================
بخش ۵
تایمر + پایان بازی
========================================== */

function startTimer(){

    clearInterval(timer);

    minute = 40;
    second = 0;

    const timerText = document.getElementById("timerText");

    timerText.innerHTML = "40:00";

    timer = setInterval(function(){

        if(second == 0){

            if(minute == 0){

                clearInterval(timer);

                finishGame();

                return;

            }

            minute--;
            second = 59;

        }

        else{

            second--;

        }

        const m = minute;

        const s = second < 10 ? "0"+second : second;

        timerText.innerHTML = m + ":" + s;

    },1000);

}

/* ==========================================
پایان بازی
========================================== */

function finishGame(){

    clearInterval(timer);

    backgroundMusic.pause();

    robotFinish.currentTime = 0;
    robotFinish.play();

    fireWorks.currentTime = 0;
    fireWorks.play();

    gamePage.classList.add("hidden");
    finishPage.classList.remove("hidden");

    resultName.innerHTML = studentName.value;
    resultCode.innerHTML = studentCode.value;

    correctCount.innerHTML = correctAnswers;
    wrongCount.innerHTML = wrongAnswers;

    resultBattery.innerHTML = battery + "%";
    resultStars.innerHTML = stars;
    resultCoins.innerHTML = coins;

    const score = correctAnswers * 5;

    resultScore.innerHTML = score;

    const percent = Math.round(
        (correctAnswers / questions.length) * 100
    );

    resultPercent.innerHTML = percent + "%";

    if(percent >= 90){

        resultMedal.src = "medal-gold.png";

    }

    else if(percent >= 70){

        resultMedal.src = "medal-silver.png";

    }

    else{

        resultMedal.src = "medal-bronze.png";

    }

    const now = new Date();

    resultDate.innerHTML =
    now.toLocaleDateString("fa-IR");

    resultTime.innerHTML =
    now.toLocaleTimeString("fa-IR");

}

/* ==========================================
دکمه ها
========================================== */

playAgainBtn.onclick = function(){

    location.reload();

};

screenShotBtn.onclick = function(){

    alert("نسخه بعدی اسکرین‌شات فعال می‌شود.");

};
