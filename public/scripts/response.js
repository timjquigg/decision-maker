// form validation eg. name input
// drag-drop
// submit handling w/ success message

$(() => {

  $('.description').hide();
  $('.error_name').hide();
  $('.submit_window').hide();

  $("#sortable").sortable({
    placeholder: 'placeholder',
    axis : 'y',
    opacity: 0.3,
  });

  console.log('document ready!');

  $('.option').on('mouseover', function(e) {
    console.log(this);
    console.log('apple');
    $(this).children('.description').show();
  });

  $('.option').on('mouseleave', function(e) {
    console.log(this);
    console.log('apple');
    $(this).children('.description').hide();
  });


  $('.name_box').on('focus',() => {
    $('.error_name').hide('slow');
  });

  $('.home_button').on('click', () => {
    window.location.href = '../';
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    let result = $('#sortable').sortable('toArray');
    let respondentName = $('.name_box').val();
    // console.log(respondentName);
    console.log(result);

    if ($(".name_box").is(":visible")) {
      if (!$('.name_box').val()) {
        $('.error_name').show('slow');
        return;
      } else {
        $('#name_greet').text(`Thank you for answering, ${$('.name_box').val()}`);
      }
    }


    $('.submit_window').show();
    $('form').hide();


    $.post('/polls/:id', {name:respondentName, result:result})
      .then(result => {
        // console.log('post log:', result);
        return result;
      });
  });



});
