const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyElement = document.querySelector("body");

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);

let intervalId = null;

function onStartBtnClick() {
  startBtn.disabled = true;
  intervalId = setInterval(bodyColorize, 1000);
}
function onStopBtnClick() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}
function bodyColorize() {
  bodyElement.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}
