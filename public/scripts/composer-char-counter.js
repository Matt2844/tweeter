
// Ensure DOM has loaded
$(document).ready(function() {
  console.log("DOM ready");

  $('#tweet-text').keyup(handleKeyUp);
})

const handleKeyUp = function() {
  const length = $(this).val().length;
  console.log(length);
  const counter = 140;
  const charsLeft = counter - length;
  $('.counter').text(charsLeft)

}



// Text counter






