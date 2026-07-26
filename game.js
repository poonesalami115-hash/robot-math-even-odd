/* ==========================================
ربات ریاضی کلاس ششم
game.js
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

/* ---------- صفحه بازی ---------- */

const robot = document.getElementById("robot");
const speechBox = document.getElementById("speechBox");

const questionBox = document.getElementById("questionBox");

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

const currentQuestionText = document.getElementById("currentQuestion");
const totalQuestionText = document.getElementById("totalQuestion");

const batteryValue = document.getElementById("batteryValue");
const starValue = document.getElementById("starValue");
const coinValue = document.getElementById("coinValue");

const batteryFill = document.getElementById("batteryFill");

/* ---------- صداها ---------- */

const robotBackground = new Audio("robot background.mp3");
const robotCorrect = new Audio("robot-correct.mp3");
const robotWrong = new Audio("robot-wrong.mp3");
const robotFinish = new Audio("robot-finish.mp3");

const buttonSound = new Audio("button.mp3");
const batterySound = new Audio("battery.mp3");
const coinSound = new Audio("coin.mp3");
const starSound = new Audio("star.mp3");
const fireworksSound = new Audio("fireworks.mp3");

/* ---------- متن معرفی ---------- */

const introMessages = [
    "سلام دوست من 🌸",
    "من ربات ریاضی هستم 🤖",
    "امروز با هم بازی می‌کنیم.",
    "آماده شو..."
];

/* ---------- متغیرهای بازی ---------- */

let currentQuestion = 0;

let battery = 0;
let stars = 0;
let coins = 0;

let correctAnswers = 0;
let wrongAnswers = 0;

/* ==========================================
شروع برنامه
========================================== */

window.onload = function () {

    totalQuestionText.innerHTML = questions.length;

    startIntro();

};

/* ==========================================
صفحه معرفی
========================================== */

function startIntro(){

    let percent = 0;
    let messageIndex = 0;

    introSpeech.innerHTML = introMessages[0];

    const speechTimer = setInterval(function(){

        messageIndex++;

        if(messageIndex < introMessages.length){

            introSpeech.innerHTML = introMessages[messageIndex];

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

    buttonSound.play();

    loginError.innerHTML = "";

    const name = studentName.value.trim();
    const code = studentCode.value.trim();

    if(name === ""){

        loginError.innerHTML = "نام را وارد کنید";
        return;

    }

    if(code.length !== 10){

        loginError.innerHTML = "کد ملی باید ۱۰ رقم باشد";
        return;

    }

    loginPage.classList.add("hidden");
    gamePage.classList.remove("hidden");

    robotBackground.loop = true;
    robotBackground.volume = 0.35;
    robotBackground.play();

    startGame();

}
/* ==========================================
شروع بازی
========================================== */

function startGame(){

    currentQuestion = 0;

    battery = 0;
    stars = 0;
    coins = 0;

    correctAnswers = 0;
    wrongAnswers = 0;

    batteryValue.innerHTML = battery + "%";
    starValue.innerHTML = stars;
    coinValue.innerHTML = coins;

    batteryFill.style.width = battery + "%";

    showQuestion();

}

/* ==========================================
نمایش سؤال
========================================== */

function showQuestion(){

    const q = questions[currentQuestion];

    currentQuestionText.innerHTML = currentQuestion + 1;

    questionBox.innerHTML = q.question;

    answer1.style.display = "none";
    answer2.style.display = "none";
    answer3.style.display = "none";
    answer4.style.display = "none";

    if(q.options[0] !== undefined){

        answer1.style.display = "block";
        answer1.innerHTML = q.options[0];

    }

    if(q.options[1] !== undefined){

        answer2.style.display = "block";
        answer2.innerHTML = q.options[1];

    }

    if(q.options[2] !== undefined){

        answer3.style.display = "block";
        answer3.innerHTML = q.options[2];

    }

    if(q.options[3] !== undefined){

        answer4.style.display = "block";
        answer4.innerHTML = q.options[3];

    }

    speechBox.innerHTML = "به سؤال پاسخ بده 😊";

    robot.src = "robot.png";

}
/* ==========================================
بخش ۳
پاسخ‌ها
========================================== */

answer1.addEventListener("click", function(){
    buttonSound.play();
    checkAnswer(0);
});

answer2.addEventListener("click", function(){
    buttonSound.play();
    checkAnswer(1);
});

answer3.addEventListener("click", function(){
    buttonSound.play();
    checkAnswer(2);
});

answer4.addEventListener("click", function(){
    buttonSound.play();
    checkAnswer(3);
});

function checkAnswer(selected){

    const q = questions[currentQuestion];

    // -----------------------------
    // پاسخ صحیح
    // -----------------------------

    if(selected === q.answer){

        robotCorrect.play();

        speechBox.innerHTML = "آفرین 🌸";

        robot.src = "robot-happy.png";

        correctAnswers++;

        battery += 5;
        if(battery > 100) battery = 100;

        stars++;
        coins++;

        batteryValue.innerHTML = battery + "%";
        starValue.innerHTML = stars;
        coinValue.innerHTML = coins;

        batteryFill.style.width = battery + "%";

        coinSound.play();
        starSound.play();
        batterySound.play();

        setTimeout(function(){

            currentQuestion++;

            if(currentQuestion < questions.length){

                showQuestion();

            }else{

                finishGame();

            }

        },1000);

    }

    // -----------------------------
    // پاسخ غلط
    // -----------------------------

    else{

        robotWrong.play();

        speechBox.innerHTML = "دوباره فکر کن 😊";

        robot.src = "robot-sad.png";

        wrongAnswers++;

        // روی همان سؤال می‌ماند
    }

}
/* ==========================================
بخش ۴
تایمر + پایان بازی
========================================== */

let gameMinutes = 40;
let gameSeconds = 0;
let timer;

function startTimer(){

    timer = setInterval(function(){

        if(gameSeconds === 0){

            if(gameMinutes === 0){

                clearInterval(timer);

                finishGame();

                return;

            }

            gameMinutes--;
            gameSeconds = 59;

        }else{

            gameSeconds--;

        }

    },1000);

}

/* ==========================================
پایان بازی
========================================== */

function finishGame(){

    clearInterval(timer);

    robotBackground.pause();

    robotFinish.play();

    fireworksSound.play();

    gamePage.classList.add("hidden");

    finishPage.classList.remove("hidden");

    document.getElementById("resultName").innerHTML =
        studentName.value;

    document.getElementById("resultCode").innerHTML =
        studentCode.value;

    document.getElementById("correctCount").innerHTML =
        correctAnswers;

    document.getElementById("wrongCount").innerHTML =
        wrongAnswers;

    document.getElementById("resultBattery").innerHTML =
        battery + "%";

    document.getElementById("resultStars").innerHTML =
        stars;

    document.getElementById("resultCoins").innerHTML =
        coins;

    const score = correctAnswers * 5;

    document.getElementById("resultScore").innerHTML =
        score;

    const percent =
        Math.round((correctAnswers / questions.length) * 100);

    document.getElementById("resultPercent").innerHTML =
        percent + "%";

    const now = new Date();

    document.getElementById("resultDate").innerHTML =
        now.toLocaleDateString("fa-IR");

    document.getElementById("resultTime").innerHTML =
        now.toLocaleTimeString("fa-IR");

}
/* ==========================================
بخش ۵
مدال + اسکرین‌شات + بازی دوباره
========================================== */

const screenShotBtn = document.getElementById("screenShotBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const resultMedal = document.getElementById("resultMedal");
const finishMessage = document.getElementById("finishMessage");

/* ---------- انتخاب مدال ---------- */

function setMedal(percent){

    if(percent >= 90){

        resultMedal.src = "medal-gold.png";

        finishMessage.innerHTML =
        "🌟 عالی بود! مدال طلا گرفتی.";

    }

    else if(percent >= 70){

        resultMedal.src = "medal-silver.png";

        finishMessage.innerHTML =
        "👏 آفرین! مدال نقره گرفتی.";

    }

    else{

        resultMedal.src = "medal-bronze.png";

        finishMessage.innerHTML =
        "😊 آفرین! مدال برنز گرفتی.";

    }

}

/* ---------- پایان بازی ---------- */

const oldFinishGame = finishGame;

finishGame = function(){

    oldFinishGame();

    const percent =
    Math.round((correctAnswers / questions.length) * 100);

    setMedal(percent);

};

/* ---------- بازی دوباره ---------- */

playAgainBtn.addEventListener("click", function(){

    location.reload();

});

/* ---------- اسکرین‌شات ---------- */

screenShotBtn.addEventListener("click", function(){

    alert("فعلاً اسکرین‌شات در نسخه بعدی فعال می‌شود.");

});
