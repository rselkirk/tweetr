/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  function sanitize(str) {
    // TODO
    return str;
  }

  function renderTweets(tweets) {
    for (let tweet of tweets) {
      let x = createTweetElement(tweet);
      $('.all-tweets').append(x);
    }
  }

  function createTweetElement(tweetData) {
    return $(`
          <article class='one-tweet tweet'>
            <header>
              <img class="avatar" src=${tweetData.user.avatars.small}>
              <h2>${sanitize(tweetData.user.name)}</h2>
              <p class="handle"> ${sanitize(tweetData.user.handle)} </p>
            </header>
            <div class="tweetBody">
              <span class="tweet"> ${sanitize(tweetData.content.text)} </span>
            </div>
            <footer>
              <span class="ageCounter">${sanitize(moment(tweetData.created_at).fromNow())}</span>
            </footer>
          </article>
      `);
  }


  // Test / driver code (temporary). Eventually will get this from the server.
  var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1492628501227
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



  renderTweets(data);

// $($tweet).append(tweetData.map(enhanceWithTimeAgo).map(createTweetElement));








});
