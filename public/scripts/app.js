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
          <span class="ageCounter">${(moment(tweetData.created_at).fromNow())}</span>
        </footer>
      </article>
    `);
  }

  function renderTweets(tweets) {
    for (const tweet of tweets) {
      const x = createTweetElement(tweet);
      $('.all-tweets').prepend(x);
    }
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets,
    });
  }


  $('form').on('submit', function (event) {
    event.preventDefault();
    if (($('textarea').val()).length === 0) {
      $('.errorMsg').text('Please type a tweet!');
      //alert('Type something to make a tweet!');
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
      success() {
        loadTweets();
        $('textarea').val('');
      },
    });
  });


  $('.compose').click(() => {
    $('.new-tweet').slideToggle('slow', () => {
      $('textarea').focus();
    });
  });

  $('.new-tweet').hide();
  loadTweets();
}); // doc.ready close.

