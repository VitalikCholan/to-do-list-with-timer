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

const alertBox = document.querySelector('.alert');
const closeBtn = document.querySelector('.close-btn');

startStopBtn.addEventListener('click', () => {
    if(timerStatus === 'stopped') {
        if(activeTask.value.trim() === '') {
            alertBox.classList.add('show');
            alertBox.classList.remove('hide');
            alertBox.classList.add('showAlert');
            setTimeout(() => {
                alertBox.classList.remove('show');
                alertBox.classList.add('hide');
            }, 5000);
            return;        
        } else {
            alertBox.classList.remove('show');
            alertBox.classList.add('hide');
        }

        timerInterval = setInterval(timer, 1000);
        startStopBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        timerStatus = 'started';
    } else {
        clearInterval(timerInterval);
        startStopBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        timerStatus = 'stopped';
    }
})

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;

    timerNumbers.innerText = '00:00:00';
})

closeBtn.addEventListener('click', () => {
    alertBox.classList.remove('show');
    alertBox.classList.add('hide');
})