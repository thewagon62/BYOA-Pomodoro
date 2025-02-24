let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const modeToggleButton = document.getElementById('mode-toggle');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    statusText.textContent = isWorkTime ? 'Time to focus!' : 'Time for a break!';
    modeToggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    
    // Add button color changes
    if (isWorkTime) {
        startButton.classList.remove('break-mode');
        startButton.classList.add('work-mode');
        modeToggleButton.classList.remove('break-mode');
        modeToggleButton.classList.add('work-mode');
    } else {
        startButton.classList.remove('work-mode');
        startButton.classList.add('break-mode');
        modeToggleButton.classList.remove('work-mode');
        modeToggleButton.classList.add('break-mode');
    }
    
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    startButton.textContent = 'Pause';
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            startButton.textContent = 'Start';
            new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
            switchMode();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    startButton.textContent = 'Start';
    statusText.textContent = isWorkTime ? 'Time to focus!' : 'Time for a break!';
    updateDisplay(timeLeft);
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

modeToggleButton.addEventListener('click', () => {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    switchMode();
});

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(timeLeft);

// Initialize button colors
startButton.classList.add('work-mode');
modeToggleButton.classList.add('work-mode'); 