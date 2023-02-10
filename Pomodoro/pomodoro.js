const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

//Declaration
let baseTime = 1500;  //1500 sec = 25 perc 300 = 5 perc
let shortBreak = 300;
let longBreak = 1500;
let timePassed = 0;
let timeLeft = baseTime;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let countdown = 1;
let isPaused = true;
const audio = new Audio('./logos/beep.mp3');

//implement the timer
document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="timer-title" class="base-timer__label_title">Pomodoro 1</span>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

document.getElementById("pomtime").textContent = baseTime/60;
document.getElementById("shorttime").textContent = shortBreak/60;
document.getElementById("longtime").textContent = longBreak/60;

function enableBtn(){
  const images=document.getElementsByTagName('img');
  for (i = 0; i < images.length; i++){
    images[i].style.display = "inline";
  }
}
function disableBtn(){
  const images=document.getElementsByTagName('img');
  for (i = 0; i < images.length; i++){
    images[i].style.display = "none";
  }
}

function paused(){
  isPaused = !isPaused;
  if(isPaused == false){
    main(countdown);
    document.getElementById('run').textContent = "Pause";
    disableBtn();
  }
  else{
    onTimesUp();
    document.getElementById('run').textContent = "Start";
  }
}

//Main Function
function main(num){
  countdown=num;
  switch (countdown){
    case 1:
      timer(baseTime);
      document.getElementById("timer-title").textContent = "Pomodoro 1";
    
      break;
    case 2:
      timer(shortBreak);
      document.getElementById("timer-title").textContent = "Short Break!";
      break;
    case 3:
      timer(baseTime);
      document.getElementById("timer-title").textContent = "Pomodoro 2";
      break;
    case 4:
      timer(shortBreak);
      document.getElementById("timer-title").textContent = "Short Break!";
      break;
    case 5:
      timer(baseTime);
      document.getElementById("timer-title").textContent = "Pomodoro 3";
      break;
    case 6:
      timer(shortBreak);
      document.getElementById("timer-title").textContent = "Short Break!";
      break;
    case 7:
      timer(baseTime);
      document.getElementById("timer-title").textContent = "Pomodoro 4";
      break;
    case 8:
      timer(longBreak);
      document.getElementById("timer-title").textContent = "Long Break!";
      break;
    default:
      onTimesUp();
      break;
  }
}

function resetBtn(){
isPaused = true;
timePassed = 0;
countdown = 1;
onTimesUp();
enableBtn();
document.getElementById('run').textContent = "Start";
document.getElementById("timer-title").textContent = "Pomodoro 1";
document.getElementById('base-timer-label').textContent = `${baseTime/60}:00`;
}

function onTimesUp() {
  clearInterval(timerInterval);
}

//Main timer controller
function timer(data) {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = data - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray(data);
    setRemainingPathColor(timeLeft);

    if (timeLeft == 0) {
      onTimesUp();
      countdown++;
      timePassed = 0;
      audio.play();
      main(countdown);
    }
  }, 1000);
}

//Pomodoro Calculators
function pomCalculatorPlus(){
  baseTime += 60;
  document.getElementById('pomtime').textContent = baseTime/60;
  document.getElementById('base-timer-label').textContent = `${baseTime/60}:00`;
}
function pomCalculatorNegative(){
  baseTime -= 60;
  if(baseTime > 0){
  document.getElementById('pomtime').textContent = baseTime/60;
  document.getElementById('base-timer-label').textContent = `${baseTime/60}:00`;
} else{
  baseTime = 60;
    document.getElementById('pomtime').textContent = baseTime/60;}
    document.getElementById('base-timer-label').textContent = `${baseTime/60}:00`;
}

//Short Break Calculators
function shortCalculatorPlus(){
  shortBreak += 60;
  document.getElementById('shorttime').textContent = shortBreak/60;
}
function shortCalculatorNegative(){
  shortBreak -= 60;
  if(shortBreak > 0){
    document.getElementById('shorttime').textContent = shortBreak/60;
  } else {
    shortBreak = 60;
    document.getElementById('shorttime').textContent = shortBreak/60;}
}

//Long Break Calculators
function longCalculatorPlus(){
  longBreak += 60;
  document.getElementById('longtime').textContent = longBreak/60;
}
function longCalculatorNegative(){
  longBreak -= 60;
  if(longBreak > 0){
    document.getElementById('longtime').textContent = longBreak/60;
  } else {
    longBreak = 60;
    document.getElementById('longtime').textContent = longBreak/60;
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
  else{
    document
    .getElementById("base-timer-path-remaining")
    .classList.remove(alert.color);
    document
    .getElementById("base-timer-path-remaining")
    .classList.add(info.color);
  }
}

function calculateTimeFraction(data) {
  const rawTimeFraction = timeLeft / data;
  return rawTimeFraction - (1 / data) * (1 - rawTimeFraction);
}

function setCircleDasharray(data) {
  const circleDasharray = `${(
    calculateTimeFraction(data) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}