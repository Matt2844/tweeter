
// Ensure DOM has loaded
$(document).ready(function() {
  console.log("DOM ready 'testing'");

  $('#tweet-text').keyup(handleKeyUp);
  $('.previous-tweets-container').mouseenter(tweetNameVisible).mouseleave(tweetNameInvisible);
})

// Tweet characters left counter       
const handleKeyUp = function() {
  const length = $(this).val().length;
  const counter = 140;
  const charsLeft = counter - length;
  const charText = $('.counter').text(charsLeft);
};

// Change tweeter handle to visible on hover
const tweetNameVisible = function() {
  $('.hidden-handle').animate({ opacity: 1 }, 300);
};

// Change tweeter handle opacity back to invsible
const tweetNameInvisible = function() {
  $('.hidden-handle').animate({ opacity: 0 }, 300);
}









