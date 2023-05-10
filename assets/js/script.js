// setting a timer interval
var timer = 60;
setInterval(() => {
  document.getElementById("timer").textContent = timer;
  if (timer > 0) {
    timer--;
    console.log(timer);
  }
}, 1000);
