$(document).ready(function() {
let time = 15.00;
setInterval(()=>{
  $("#timer").html(time);
  time -= .01;
  time=Math.round(time * 100) / 100

}, 1000)
  $
});
