var count = 0;
var startEl = document.querySelector('.start-btn');
var countEl = document.querySelector('.count');

// Function to countdown
function countDown() {
    var timer = 60;
setInterval(() => {
  document.getElementById("timer").textContent = timer;
  if (timer > 0) {
    timer--;
  }
}, 1000);
}

// setting a timer interval
// var timer = 60;
// setInterval(() => {
//   document.getElementById("timer").textContent = timer;
//   if (timer > 0) {
//     timer--;
//     console.log(timer);
//   }
// }, 1000);
