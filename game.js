/* ==========================================
ربات ریاضی | کلاس ششم
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
معرفی
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
صفحه بازی
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
صفحه پایان
=========================== */

const resultName =
document.getElementById("resultName");

const resultCode =
document.getElementById("resultCode");

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

const resultDate =
document.getElementById("resultDate");

const resultTime =
document.getElementById("resultTime");

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

const soundBackground =
new Audio("robot background.mp3");

const soundButton =
new Audio("button.mp3");

const soundCorrect =
new Audio("robot-correct.mp3");

const soundWrong =
new Audio("robot-wrong.mp3");

const soundBattery =
new Audio("battery.mp3");

const soundCoin =
new Audio("coin.mp3");

const soundStar =
new Audio("star.mp3");

const soundFinish =
new Audio("robot-finish.mp3");

const soundFireworks =
new Audio("fireworks.mp3");

/* اگر بعداً خواستیم
صدای خودت را اضافه کنیم */

let voiceCorrect = null;
let voiceWrong = null;
let voiceAnswer = null;

/* ===========================
تنظیم صداها
=========================== */

soundBackground.loop = true;
soundBackground.volume = 0.25;

soundButton.volume = 1;
soundCorrect.volume = 1;
soundWrong.volume = 1;
soundBattery.volume = 1;
soundCoin.volume = 1;
soundStar.volume = 1;
soundFinish.volume = 1;
soundFireworks.volume = 1;

/* ===========================
متغیرهای بازی
=========================== */

let currentQuestion = 0;

let correctAnswers = 0;
let wrongAnswers = 0;

let battery = 0;
let stars = 0;
let coins = 0;

let wrongTry = 0;

let timer = null;
let gameMinutes = 40;
let gameSeconds = 0;

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

    totalQuestionText.innerHTML = questions.length;

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

startBtn.addEventListener("click",checkLogin);

function checkLogin(){

    soundButton.currentTime = 0;
    soundButton.play();

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

    soundBackground.currentTime = 0;
    soundBackground.play().catch(()=>{});

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

    /* اگر فقط دو گزینه داشت */

    if(q.options.length == 2){

        answer3.style.display = "none";
        answer4.style.display = "none";

    }else{

        answer3.style.display = "block";
        answer4.style.display = "block";

    }

    /* ربات به حالت عادی */

    robot.src = "robot.png";

    speechBox.innerHTML = "جواب را انتخاب کن 🌸";

}
/* ==========================================
بخش ۴
پاسخ ها
========================================== */

answer1.onclick=function(){checkAnswer(0);}
answer2.onclick=function(){checkAnswer(1);}
answer3.onclick=function(){checkAnswer(2);}
answer4.onclick=function(){checkAnswer(3);}

function checkAnswer(selected){
function checkAnswer(selected){

    soundButton.currentTime = 0;
    soundButton.play();

    const q = questions[currentQuestion];

    // ----------------------
    // جواب صحیح
    // ----------------------

    if(selected === q.answer){

        wrongTry = 0;

        correctAnswers++;

        battery = Math.min(100, battery + 5);

        stars++;

        coins += 10;

        batteryValue.innerHTML = battery + "%";
        starValue.innerHTML = stars;
        coinValue.innerHTML = coins;

        batteryFill.style.width = battery + "%";

        robot.src = "robot-happy.png";

        speechBox.innerHTML = "آفرین 🌸";

        soundCorrect.currentTime = 0;
        soundCorrect.play();

        soundCoin.currentTime = 0;
        soundCoin.play();

        soundStar.currentTime = 0;
        soundStar.play();

        soundBattery.currentTime = 0;
        soundBattery.play();

        if(voiceCorrect){

            voiceCorrect.currentTime = 0;
            voiceCorrect.play();

        }

        setTimeout(function(){

            currentQuestion++;

            if(currentQuestion < questions.length){

                showQuestion();

            }else{

                finishGame();

            }

        },2500);

    }

    // ----------------------
    // جواب غلط
    // ----------------------

    else{

        wrongTry++;

        wrongAnswers++;

        robot.src = "robot-sad.png";

        soundWrong.currentTime = 0;
        soundWrong.play();

        // بار اول

        if(wrongTry == 1){

            speechBox.innerHTML = "دوباره فکر کن 😊";

            if(voiceWrong){

                voiceWrong.currentTime = 0;
                voiceWrong.play();

            }

        }

        // بار دوم

        else{

            speechBox.innerHTML =
            "پاسخ صحیح : " + q.options[q.answer];

            if(voiceAnswer){

                voiceAnswer.currentTime = 0;
                voiceAnswer.play();

            }

            setTimeout(function(){

                currentQuestion++;

                if(currentQuestion < questions.length){

                    showQuestion();

function checkAnswer(selected){

    soundButton.currentTime = 0;
    soundButton.play();

    const q = questions[currentQuestion];

    // ----------------------
    // جواب صحیح
    // ----------------------

    if(selected === q.answer){

        wrongTry = 0;

        correctAnswers++;

        battery = Math.min(100, battery + 5);

        stars++;

        coins += 10;

        batteryValue.innerHTML = battery + "%";
        starValue.innerHTML = stars;
        coinValue.innerHTML = coins;

        batteryFill.style.width = battery + "%";

        robot.src = "robot-happy.png";

        speechBox.innerHTML = "آفرین 🌸";

        soundCorrect.currentTime = 0;
        soundCorrect.play();

        soundCoin.currentTime = 0;
        soundCoin.play();

        soundStar.currentTime = 0;
        soundStar.play();

        soundBattery.currentTime = 0;
        soundBattery.play();

        if(voiceCorrect){

            voiceCorrect.currentTime = 0;
            voiceCorrect.play();

        }

        setTimeout(function(){

            currentQuestion++;

            if(currentQuestion < questions.length){

                showQuestion();

            }else{

                finishGame();

            }

        },2500);

    }

    // ----------------------
    // جواب غلط
    // ----------------------

    else{

        wrongTry++;

        wrongAnswers++;

        robot.src = "robot-sad.png";

        soundWrong.currentTime = 0;
        soundWrong.play();

        // بار اول

        if(wrongTry == 1){

            speechBox.innerHTML = "دوباره فکر کن 😊";

            if(voiceWrong){

                voiceWrong.currentTime = 0;
                voiceWrong.play();

            }

        }

        // بار دوم

        else{

            speechBox.innerHTML =
            "پاسخ صحیح : " + q.options[q.answer];

            if(voiceAnswer){

                voiceAnswer.currentTime = 0;
                voiceAnswer.play();

            }

            setTimeout(function(){

                currentQuestion++;

                if(currentQuestion < questions.length){

                    showQuestion();

                }else{

                    finishGame();

                }

            },3500);

        }

    }

}
    /* -----------------------
       جواب غلط
    ----------------------- */

    else{

        wrongTry++;

        wrongAnswers++;

        soundWrong.currentTime=0;
        soundWrong.play();

        robot.src="robot-sad.png";

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

            },2500);

        }

    }

}
/* ==========================================
بخش ۵
تایمر
========================================== */

function startTimer(){

    clearInterval(timer);

    gameMinutes = 40;
    gameSeconds = 0;

    timer = setInterval(function(){

        if(gameSeconds==0){

            if(gameMinutes==0){

                clearInterval(timer);

                finishGame();

                return;

            }

            gameMinutes--;
            gameSeconds=59;

        }

        else{

            gameSeconds--;

        }

    },1000);

}

/* ==========================================
پایان بازی
========================================== */

function finishGame(){

    clearInterval(timer);

    soundBackground.pause();

    soundFinish.currentTime=0;
    soundFinish.play();

    soundFireworks.currentTime=0;
    soundFireworks.play();

    gamePage.classList.add("hidden");

    finishPage.classList.remove("hidden");

    resultName.innerHTML=studentName.value;

    resultCode.innerHTML=studentCode.value;

    correctCount.innerHTML=correctAnswers;

    wrongCount.innerHTML=wrongAnswers;

    resultBattery.innerHTML=battery+"%";

    resultStars.innerHTML=stars;

    resultCoins.innerHTML=coins;

    const score=correctAnswers*5;

    resultScore.innerHTML=score;

    const percent=Math.round(
        (correctAnswers/questions.length)*100
    );

    resultPercent.innerHTML=percent+"%";

    if(percent>=90){

        resultMedal.src="medal-gold.png";

    }

    else if(percent>=70){

        resultMedal.src="medal-silver.png";

    }

    else{

        resultMedal.src="medal-bronze.png";

    }

    const now=new Date();

    resultDate.innerHTML=
    now.toLocaleDateString("fa-IR");

    resultTime.innerHTML=
    now.toLocaleTimeString("fa-IR");

}

/* ==========================================
بازی دوباره
========================================== */

playAgainBtn.onclick=function(){

    location.reload();

};

/* ==========================================
اسکرین شات
========================================== */

screenShotBtn.onclick=function(){

    alert("اسکرین شات در نسخه بعد فعال می‌شود.");

};
