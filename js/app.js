const screen = document.getElementById("screen");

let step = 0;
let noClicks = 0;

const answers = {
    date: "",
    food: "",
    time: ""
};

const noTexts = [
    "No",
    "Sicura? 🥺",
    "Daiii 😭",
    "Ripensaci 🥹",
    "Sei proprio sicura?",
    "Non vale 😔"
];

function nextStep() {
    step++;
    render();
}

function render() {

    switch(step) {

        case 0:
            renderIntro();
            break;

        case 1:
            renderQuestion();
            break;

        case 2:
            renderDate();
            break;

        case 3:
            renderFood();
            break;

        case 4:
            renderTime();
            break;

        case 5:
            renderSummary();
            break;
    }
}

function renderIntro() {

    screen.innerHTML = `
        <h1>Ehi 🥹</h1>

        <p>
            Ho una piccola domanda da farti...
            Prometto che è innocente ❤️
        </p>

        <button
            class="primary"
            onclick="nextStep()">
            Apri 💌
        </button>
    `;
    animateScreen();
}

function renderQuestion() {

    screen.innerHTML = `
        <h1>Ti va di uscire con me? 🌸</h1>

        <p>
            Prometto una bella serata,
            tante chiacchiere e zero interrogazioni 😌
        </p>

        <div class="buttons">
            <button id="noBtn" class="secondary">
                No
            </button>

            <button
                id="yesBtn"
                class="primary"
                onclick="nextStep()">

                Sì ❤️

            </button>
        </div>
    `;

    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    function moveNo() {

        noClicks++;

        noBtn.textContent =
            noTexts[
                Math.min(
                    noClicks,
                    noTexts.length - 1
                )
            ];

        const x = Math.random() * 180 - 90;
        const y = Math.random() * 120 - 60;

        noBtn.style.transform =
            `translate(${x}px, ${y}px)`;

        yesBtn.style.transform =
            `scale(${1 + noClicks * 0.08})`;
    }

    noBtn.addEventListener("mouseover", moveNo);
    noBtn.addEventListener("click", moveNo);

    animateScreen();
}

function renderDate() {

    screen.innerHTML = `
        <h1>Quando sei libera? 📅</h1>

        <input
            type="date"
            id="date">

        <button
            class="primary"
            onclick="saveDate()">

            Continua

        </button>
    `;

    animateScreen();
}

function saveDate() {

    const value =
        document.getElementById("date").value;

    if (!value) {
        cuteAlert("Aspetta 😌", "Prima scegli una data.");
        return;
    }

    answers.date = value;

    nextStep();
}

function renderFood() {

    screen.innerHTML = `
        <h1>Cosa ti va? ✨</h1>

        <div class="options">

            <div class="option"
                onclick="selectFood('Sushi', this)">
                🍣 Sushi
            </div>

            <div class="option"
                onclick="selectFood('Pizza', this)">
                🍕 Pizza
            </div>

            <div class="option"
                onclick="selectFood('Aperitivo', this)">
                🍹 Aperitivo
            </div>

            <div class="option"
                onclick="selectFood('Caffè', this)">
                ☕ Caffè
            </div>

            <div class="option"
                onclick="selectFood('Cena', this)">
                🍝 Cena
            </div>

            <div class="option"
                onclick="selectFood('Sorpresa', this)">
                🎲 Sorpresa
            </div>

        </div>

        <br>

        <button
            class="primary"
            onclick="goTime()">

            Continua

        </button>
    `;
    animateScreen();
}

function selectFood(value, element) {
    answers.food = value;
    document
        .querySelectorAll(".option")
        .forEach(opt =>
            opt.classList.remove("selected")
        );
    element.classList.add("selected");
}

function goTime() {

    if (!answers.food) {
        cuteAlert("Aspetta 😌", "Prima scegli un'opzione.");
        return;
    }

    nextStep();
}

function renderTime() {

    screen.innerHTML = `
        <h1>A che ora? ⏰</h1>

        <input
            type="time"
            id="time">

        <button
            class="primary"
            onclick="saveTime()">

            Continua

        </button>
    `;

    animateScreen();
}

function saveTime() {

    const value =
        document.getElementById("time").value;

    if (!value) {
        cuteAlert("Aspetta 😌", "Prima scegli un orario.");
        return;
    }

    answers.time = value;

    nextStep();
}

function renderSummary() {

    screen.innerHTML = `
        <h1>Perfetto 💌</h1>

        <p>
            Prima confermiamo ufficialmente
            questa bellissima decisione 😌<br>Ecco a te un breve riepilogo!
        </p>

        <div class="summary">
            📅 ${formatDate(answers.date)}<br>
            ⏰ ${answers.time}<br>
            ${answers.food}
        </div>

        <button
            class="primary"
            type="button"
            onclick="sendEmail()">

            Conferma ❤️

        </button>
    `;
    animateScreen();
}

function createHearts() {

    const hearts =
        document.getElementById("hearts");

    setInterval(() => {
        createFloatingHeart();
    }, 600);
}

function createFloatingHeart(isFinal = false) {

    const hearts =
        document.getElementById("hearts");

    const heart =
        document.createElement("div");

    heart.className = isFinal ? "heart final-heart" : "heart";

    heart.innerHTML =
        ["♡","♥","❀","✦","💗","🥹"][
            Math.floor(Math.random()*6)
        ];

    heart.style.left =
        Math.random()*100 + "vw";

    if (isFinal) {
        heart.style.animationDuration =
            4 + Math.random()*3 + "s";
    }

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

function celebrateFinal() {

    for (let i = 0; i < 24; i++) {
        setTimeout(() => {
            createFloatingHeart(true);
        }, i * 90);
    }
}

function sendEmail() {
    fetch("ajax/sendEmail.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            date: answers.date,
            time: answers.time,
            food: answers.food
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {

            createCelebrationHearts();

        screen.innerHTML = `
            <h1>Missione compiuta 🥹❤️</h1>

            <p>
                Adesso manca solo aspettare quel giorno ✨
            </p>

            <div class="summary">
                📅 ${formatDate(answers.date)}<br>
                ⏰ ${answers.time}<br>
                ${answers.food}
            </div>

            <p class="tiny-note">
                (E meno male che non sei riuscita a premere "No" 🤭)
            </p>
        `;

            celebrateFinal();
        } else {

            cuteAlert("Ops 😭", "Qualcosa è andato storto. Riprova più tardi.");
        }
    })
    .catch(error => {
        console.error(error);

        cuteAlert("Ops 😭", "Qualcosa è andato storto. Riprova più tardi.");

    });
}

function cuteAlert(title, text) {
    Swal.fire({
        title,
        text,
        icon: "warning",
        confirmButtonText: "Va bene 💕",
        width: 500,
        padding: "2em",
        color: "#5c4152",
        background: "#fff5f8",
        confirmButtonColor: "#ff7296",
        backdrop: `rgba(255,114,150,0.35)`,
        customClass: {
            popup: "swal-romantic-popup",
            title: "swal-romantic-title",
            confirmButton: "swal-romantic-confirm"
        },
    });
}

function animateScreen() {
    screen.classList.remove("screen-enter");
    void screen.offsetWidth;
    screen.classList.add("screen-enter");
}


function formatDate(dateString) {

    return new Date(dateString)
        .toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

function createCelebrationHearts() {
    let count = 0;
    const interval = setInterval(() => {
        const heart =
            document.createElement("div");
        heart.className = "heart";
        heart.innerHTML =
            ["❤️", "💖", "💕", "💗"][
                Math.floor(Math.random() * 4)
            ];
        heart.style.left =
            Math.random() * 100 + "vw";
        heart.style.fontSize =
            (20 + Math.random() * 20) + "px";
        heart.style.animationDuration =
            (3 + Math.random() * 2) + "s";
        document
            .getElementById("hearts")
            .appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 5000);
        count++;
        if(count > 40){
            clearInterval(interval);
        }
    }, 120);
}

createHearts();
render();