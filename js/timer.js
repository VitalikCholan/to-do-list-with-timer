const activeTask = document.querySelector('.active-task');
const timerNumbers = document.querySelector('.timer-numbers');
const startStopBtn = document.querySelector('.startStopBtn');
const resetBtn = document.querySelector('.resetBtn');

let seconds = 0;
let minutes = 0;
let hours = 0;

let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

let timerInterval = null;
let timerStatus = 'stopped';

function timer() {
    seconds++;

    if(seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }

            if(hours / 24 === 1) {
                hours = 0;
            }
    }

    seconds < 10 ? leadingSeconds = `0${seconds.toString()}` : leadingSeconds = seconds;

    minutes < 10 ? leadingMinutes = `0${minutes.toString()}` : leadingMinutes = minutes;

    hours < 10 ? leadingHours = `0${hours.toString()}` : leadingHours = hours;


    timerNumbers.innerText = `${leadingHours}:${leadingMinutes}:${leadingSeconds}`;
}

startStopBtn.addEventListener('click', () => {
    if(activeTask.value.trim() === '') {
        return alert("Please enter an active task before starting the timer.");
    }

    if(timerStatus === 'stopped') {
        timerInterval = window.setInterval(timer, 1000);
        startStopBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        timerStatus = 'started';
    } else {
        window.clearInterval(timerInterval);
        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        timerStatus = 'stopped';
    }
})

resetBtn.addEventListener('click', () => {
    window.clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;

    timerNumbers.innerText = '00:00:00';
})