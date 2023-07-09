import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const startBtn = document.querySelector("[data-start]");
const flatpickrInput = document.querySelector("#datetime-picker");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

let countdownInterval;

startBtn.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtn.dissabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

setInterval(() => {}, 1000);

startBtn.addEventListener("click", startTimer);

function startTimer() {
  const selectedDate = flatpickrInput._flatpickr.selectedDates[0];
  const countdownTime = selectedDate.getTime();

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = countdownTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimerDisplay(days, hours, minutes, seconds);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
