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

  $('form').on('submit', function (event) {
    event.preventDefault();
    if (($('textarea').val()).length = 140) {
      alert('Type something to make a tweet!');
      return;
    }
    if (($('textarea').val()).length > 140) {
      alert('Tweet must be 140 characters or fewer!');
      return;
      }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: loadTweets(),
    });
  });


  function loadTweets() {
  $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets,
  });
}

loadTweets();

function renderTweets(tweets) {
    for (let tweet of tweets) {
      let x = createTweetElement(tweet);
      $('.all-tweets').prepend(x);
    }
  }


});
