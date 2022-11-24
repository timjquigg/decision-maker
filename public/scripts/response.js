// form validation eg. name input
// drag-drop
// submit handling w/ success message

$(() => {
  // hides the error and submit window
  $('.error_name').css('display', 'none');
  $('.submit_window').hide();
  $('.description_container').hide();



  // init check of screensize (smaller screens)
  if ($(window).width() <= 1023) {
    $('.description_container').show();
    $(document).tooltip({
      position: { my: "center", at: "center", of: ".description_container" }
    });
  }

  // init check of screensize (desktop)
  if ($(window).width() > 1024) {
    $(document).tooltip({
      position: { my: "left+15 center", at: "right center" }
    });
  }

  // event listener IF screensize is changed during
  $(window).resize(() => {
    if ($(window).width() <= 1024) {
      $('.description_container').show();
      $(document).tooltip({
        position: { my: "center", at: "center", of: ".description_container" }
      });
    } else {
      $('.description_container').hide();
      $(document).tooltip({
        position: { my: "left+15 center", at: "right center" }
      });
    }
  });

  //initiates the sortable UI for the options
  $("#sortable").sortable({
    placeholder: "placeholder",
    axis : 'y',
    opacity: 0.2,
    cursor: 'grabbing',
    containment: 'parent',
    tolerance: "pointer",
  });

  // displays when the user submits the form and the name textbox is empty
  $('.name_box').on('focus',() => {
    $('.error_name').hide('slow');
  });

  // redirects the user to the home page
  $('.home_button').on('click', () => {
    window.location.href = '../';
  });

  //submits the post
  $('.submission').on('submit', function(event) {
    event.preventDefault();
    let result = $('#sortable').sortable('toArray');
    let respondentName = $('.name_box').val();
    // console.log(respondentName);
    // console.log(result);

    if ($(".name_box").is(":visible")) {
      if (!$('.name_box').val()) {
        $('.error_name').show('slow');
        return;
      } else {
        $('#name_greet').text(`Thank you for answering, ${$('.name_box').val()}`);
      }
    }

    //toggles the form and message once the form has been submitted
    $('.submit_window').show();
    $('.submission_form').hide();

    $.post('/polls/:id', {name:respondentName, result:result})
      .then(result => {
        // console.log('post log:', result);
        return result;
      });
  });



});
