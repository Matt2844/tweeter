/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// jQuery DOM test working
$(document).ready(function() {
  console.log("DOM 2 ready");

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

  loadTweets();

  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    console.log('tweet-form submit...');

    if (!validateTweets()) {
      validationMessage(false);
    } else {
      validationMessage(true);
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: $('#tweet-text').serialize(),
      }).then(function() {
        console.log('post is successful');
        loadTweets();
        emptyTextBox();
      });
    }
  });
});

// Creating the template for a new tweet
const createTweetElement = function(tweetData) {
  let $tweet = $('<article>').addClass('tweet')
  let tweetHTML =
    `<div class="previous-tweets-container">
      <h3>
        <img src="${tweetData.user.avatars}"/>
        <span>${tweetData.user.name}</span>
        <span class="hidden-handle">${tweetData.user.handle}</span>
      </h3>
      <p>${tweetData.content.text}</p>
      <footer>
        <time class="time">${new Date(tweetData.created_at)}</time>
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
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

// Empty text field on submit tweet
const emptyTextBox = function() {
  $('#tweet-text').val(null)
}


// Below is hard coded data, and an in-progress function. Mostly for references only. 

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

  // // Could not get the handle on hover = visible to work. Work in progress, tried for hours...
  // $(".previous-tweets-container").hover(function() {
  //   console.log('in')
  // }, function() {
  //   console.log('out')
  // });


