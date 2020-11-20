/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("DOM 2 ready");
  loadTweets();
  hideHandle();
  $('.tweet-form').submit(function(event) {
    console.log('tweet-form submit...');

    if (!validateTweets()) {
      event.preventDefault();
      validationMessage(false);
    } else {
      validationMessage(true);
      event.preventDefault()
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $('#tweet-text').serialize(),
      }).then(function() {
        console.log('post is successful');
        loadTweets();
      });
    }
  });
});


// receive array of tweets as json get request

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Creating the template for a new tweet
const createTweetElement = function(tweetData) {
  let $tweet = $('<article>').addClass('tweet')
  let tweetHTML =
    `   <div class="previous-tweets-container">
      <h1>${tweetData.user.avatars}<span>${tweetData.user.name}</span><span class="hidden-handle">${tweetData.user.handle}</span></h1>
      <p>${tweetData.content.text}</p>
      <footer>
        <time>${tweetData.created_at}</time><i class="fa fa-flag" style="font-size:24px"></i></i><i class="fa fa-retweet"
        style="font-size:24px"></i><i class="fa fa-heart" style="font-size:24px"></i>
      </footer>`

  let tweetElement = $tweet.append(tweetHTML);
  return tweetElement;
};

// Rendering
const renderTweets = function(tweets) {

  for (let tweet of tweets) {
    let tweetElement = createTweetElement(tweet);
    $('.previous-tweets').prepend(tweetElement);
  }
}

// Checking to see if tweet is valid
const validateTweets = (function() {
  const input = $('#tweet-text');

  if (input.val() !== "" && input.val().length < 140) {
    return true;
  } else {
    return false;
  }
});

// Load tweets
const loadTweets = function() {
  console.log('loading tweets');
  $.ajax({
    type: "GET",
    dataType: "json",
    url: '/tweets',
    success: (response) => {
      console.log(response);
      renderTweets(response);
    }
  })
}


// If user enters a valid tweet or not
const validationMessage = function(trueOrFalse) {
  const validationMessage = $(".validation-message");

  if (trueOrFalse === false) {
    validationMessage.css("visibility", "visible");
  }
  if (trueOrFalse === true) {
    validationMessage.css("visibility", "hidden");
  }
}

// CSS related stuff
const hideHandle = function() {
  $('.previous-tweets-container').mouseenter(tweetNameVisible).mouseleave(tweetNameInvisible);
};

// Change tweeter handle to visible on hover
const tweetNameVisible = function() {
  $('.hidden-handle').animate({ opacity: 1 }, 300);
};

// Change tweeter handle opacity back to invsible
const tweetNameInvisible = function() {
  $('.hidden-handle').animate({ opacity: 0 }, 300);
}
