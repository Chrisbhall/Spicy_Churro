$(document).ready(function() {
let time = 0.40;
setInterval(()=>{
  $("#timer").html(time);
  time -= .01;
  time=Math.round(time * 100) / 100
  if (time <= 0){
    window.location.replace("/complete");
  }
}, 1000)
  $
});
