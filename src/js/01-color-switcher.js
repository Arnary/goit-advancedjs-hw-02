function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector(".btn-start");
const stopBtn = document.querySelector(".btn-stop");
const body = document.querySelector("body");

startBtn.addEventListener("click", handlerClickStart);
stopBtn.addEventListener("click", handlerClickStop);

let timerId;

function handlerClickStart() {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startBtn.disabled = true;
};

function handlerClickStop() {
    clearInterval(timerId);
    startBtn.disabled = false;
};
