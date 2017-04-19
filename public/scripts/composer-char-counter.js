$(document).ready(() => {
  
  

  $('textarea').keypress(function () {
    let counterVal = 139 - (Array.from(this.value).length);
    $(this).siblings('.counter').text(counterVal);
    if (counterVal < 0) {
      $( 'textarea' ).addClass( "tooLong" );  
    }
    if (counterVal >= 0) {
      $( "textarea" ).removeClass( "tooLong" ); 
    }
  });
});


