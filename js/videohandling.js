const videos = document.getElementsByClassName("HoverVid");
const masthead = document.getElementById("vid-masthead");



let intervalRewind;
for (const video of videos) {
  video.addEventListener('mouseout', function() {
    clearInterval(intervalRewind);
    video.play();
  });
  video.addEventListener('mouseover', function(event) {
    intervalRewind = setInterval(function () {
      video.currentTime -= 0.1;
      if (video.currentTime <= 0) {
        clearInterval(intervalRewind);
        video.pause();
      }
    }, 30);
  });
  video.play()
}

function getScrollPercent() {
  let h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}
function increaseTime(){
  masthead.currentTime += 0.1
}
let intervalId;

window.addEventListener('scroll', () => {
  clearInterval(intervalId);
  const targetTime = (masthead.duration * getScrollPercent()) / 25;
  const currentTime = masthead.currentTime;

  if (targetTime !== currentTime) {
    const timeDifference = targetTime - currentTime;
    const steps = Math.abs(timeDifference) / 0.1; // 0.1 is your interval
    const timeInterval = timeDifference > 0 ? 0.1 : -0.1; // direction

    intervalId = setInterval(() => {
      masthead.currentTime += timeInterval;
      if (Math.abs(masthead.currentTime - targetTime) < 0.1) {
        clearInterval(intervalId);
      }
    }, 100); // 100ms interval
  }
});
