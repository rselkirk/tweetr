$(document).ready(() => {
  $('textarea').on('input', function () {
    const counterVal = 140 - (Array.from(this.value).length);
    $(this).siblings('.counter').text(counterVal);
    if (counterVal < 0) {
      $('textarea').addClass('tooLong');
    }
    if (counterVal >= 0) {
      $('textarea').removeClass('tooLong');
    }
  });
});

