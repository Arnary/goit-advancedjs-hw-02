import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('button');
btn.addEventListener('click', handlerClick);
btn.disabled = true;
const input = document.querySelector('input');

let selected;
let current;

setInterval(() => {
    current = new Date().getTime();
}, 1000);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
        onClose(selectedDates) {
            selected = selectedDates[0].getTime();
            if (selected - current <= 0) {
                iziToast.warning({
                    backgroundColor: 'rgb(236, 89, 46)',
                    position: 'topCenter',
                    timeout: 2000,
                    message: 'Please choose a date in the future.'
                });
                btn.disabled = true;
            } else {
                btn.disabled = false;
            }
},
};

flatpickr('#datetime-picker', options);

const selectors = {
    days: document.querySelector(".days-js"),
    hours: document.querySelector(".hours-js"),
    minutes: document.querySelector(".minutes-js"),
    seconds: document.querySelector(".seconds-js"),
};

function handlerClick() {
    let timeDifference = selected - current;

    const intervalID = setInterval(() => {
        if (timeDifference < 1000) {
            input.disabled = false;

            console.log(timeDifference);
            clearInterval(intervalID);
            return;
        }
        timeDifference -= 1000;
        const convertedTimes = convertMs(timeDifference);
        selectors.days.textContent = addLeadingZero(convertedTimes.days);
        selectors.hours.textContent = addLeadingZero(convertedTimes.hours);
        selectors.minutes.textContent = addLeadingZero(convertedTimes.minutes);
        selectors.seconds.textContent = addLeadingZero(convertedTimes.seconds);
    }, 1000);

    btn.disabled = true;
    input.disabled = true;
    
};

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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
