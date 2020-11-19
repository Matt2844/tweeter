/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log("DOM 2 ready");
  loadTweets();

  $('.tweet-form').submit(function(event) {
    console.log('tweet-form submit...');
    if (!validateTweets()) {
      event.preventDefault();
      alert('Sorry, post did not meet requirements.')
    } else {
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



// Taking the data from "create new tweet" and posting it to the feed
const createTweetElement = function(tweetData) {
  let $tweet = $('<article>').addClass('tweet')
  let tweetHTML =
    `   <div class="previous-tweets-container">
      <h1>${tweetData.user.avatars}<span>${tweetData.user.name}</span><span class="hidden-handle">${tweetData.user.handle}</span></h1>
      <p>${tweetData.content.text}</p>
      <footer>
        <time>${tweetData.created_at}</time><i class="flag">icon1</i><i class="share">icon2</i><i class="heart">icon3</i>
      </footer>`

  let tweetElement = $tweet.append(tweetHTML);
  return tweetElement;
};


const renderTweets = function(tweets) {

  for (let tweet of tweets) {
    let tweetElement = createTweetElement(tweet);
    $('.previous-tweets').prepend(tweetElement);
  }
}

const validateTweets = (function() {
  const input = $('#tweet-text');

  if (input.val() !== "" && input.val().length < 140) {
    alert('successful post');
    return true;
  } else {
    return false;
  }
});

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





