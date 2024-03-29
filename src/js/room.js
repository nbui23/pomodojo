let displayFrame = document.getElementById('stream__box');
let videoFrames = document.getElementsByClassName('video__container');
let userIdInDisplayFrame = null;

let expandVideoFrame = (e) => {

  let child = displayFrame.children[0];
  if(child) {
    document.getElementById('streams__container').appendChild(child);
  }

  displayFrame.style.display = 'block';
  displayFrame.appendChild(e.currentTarget)
  userIdInDisplayFrame = e.currentTarget.id

  for (let i = 0; videoFrames.length > i; i++) {
    if (videoFrames[i].id !== userIdInDisplayFrame) {
      videoFrames[i].style.height = '100px';
    videoFrames[i].style.width = '100px';
    }
  }

}

for (let i = 0; videoFrames.length > i; i++) {
  videoFrames[i].addEventListener('click', expandVideoFrame);
}

let hideDisplayFrame = () => {
  userIdInDisplayFrame = null;
  displayFrame.style.display = null;

  let child = displayFrame.children[0];
  document.getElementById('streams__container').appendChild(child);

  for (let i = 0; videoFrames.length > i; i++) {
    videoFrames[i].style.height = '300px';
    videoFrames[i].style.width = '300px';
  }

  displayFrame.addEventListener('click', hideDisplayFrame);
}

const endStageSound = new Audio('../assets/sounds/noti.wav');

const stages = [
  { name: "Study", duration: 25 },
  { name: "Short Break", duration: 5 },
  { name: "Study", duration: 25 },
  { name: "Short Break", duration: 5 },
  { name: "Study", duration: 25 },
  { name: "Long Break", duration: 35 }
];

function getSecondsSinceStartOfDay() {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

function getCurrentStageAndTimeLeft() {
  const secondsSinceStartOfDay = getSecondsSinceStartOfDay();
  const totalCycleDuration = stages.reduce((total, stage) => total + stage.duration, 0) * 60;
  const secondsIntoCurrentCycle = secondsSinceStartOfDay % totalCycleDuration;

  let cumulativeSeconds = 0;
  for (let i = 0; i < stages.length; i++) {
    cumulativeSeconds += stages[i].duration * 60;
    if (secondsIntoCurrentCycle < cumulativeSeconds) {
      return {
        currentStage: i,
        timeLeft: cumulativeSeconds - secondsIntoCurrentCycle
      };
    }
  }
}

function updateTimerDisplay() {
  const { currentStage, timeLeft } = getCurrentStageAndTimeLeft();
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  document.getElementById('pomodoroTimer').textContent = `${stages[currentStage].name}: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  if (timeLeft === 0) {
    endStageSound.play();
  }
}

setInterval(() => {
  updateTimerDisplay();
}, 1000);

