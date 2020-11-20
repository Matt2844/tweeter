
// Ensure DOM has loaded
$(document).ready(function() {
  console.log("DOM 1 ready");

  $('#tweet-text').keyup(handleKeyUp);
})

// Tweet characters left counter       
const handleKeyUp = function() {
  const length = $(this).val().length;
  const counter = 140;
  const charsLeft = counter - length;
  const charText = $('.counter').text(charsLeft);
};











