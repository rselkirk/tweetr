/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {
  function sanitize(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweetData) {
    return $(`
      <article class='tweets' data-id="${tweetData._id}">
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
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
          <span class="likes">0</span>
        </footer>
      </article>
    `);
  }

  function renderTweets(tweets) {
    $('.all-tweets').empty();
    for (const tweet of tweets) {
      const x = createTweetElement(tweet);
      $('.all-tweets').append(x);
    }
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets,
    });
  }

  $('.all-tweets').on('click', '.fa-heart', function () {
    const likes = $(this).closest('[data-id]').find('.likes').text();
    const numLikes = Number(likes);
    if (numLikes === 1) {
      console.log(typeof likes);
      $(this).closest('[data-id]').find('.likes').text(function(i, t) {
      return Number(t) - 1;
      $(this).toggleClass('pressed');
      });
    }
    if (numLikes === 0) {
      $(this).closest('[data-id]').find('.likes').text(function(i, t) {
      return Number(t) + 1;
      $(this).toggleClass('pressed');
      });
    }
  });

  $('form').on('submit', function (event) {
    event.preventDefault();
    if ($('textarea').val().trim().length === 0) {
      $('.errorMsg').text('Please type a tweet!');
    }
    if (($('textarea').val()).length === 0) {
      $('.errorMsg').text('Please type a tweet!');
      return;
    }
    if (($('textarea').val()).length > 140) {
      $('.errorMsg').text('Tweet must be 140 characters or less!');
      return;
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success() {
        loadTweets();
        $('textarea').val('');
        $('.counter').text('140');
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


