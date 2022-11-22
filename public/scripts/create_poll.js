// Client facing scripts here

// Validating poll form data
// Displaying success message & links when poll created
// Potential mailgun?

$(() => {

  console.log('document ready');


  let textboxCount = 3;
  $('.submission_confirmation').hide();
  $('.question_error').hide();
  $('.option_error').hide();
  $('.date_error').hide();

  $('form.new_poll').on('submit', function(event) {
    event.preventDefault();
    console.log('on submit');
    let valueCheck = 0;
    //if question textbox is empty
    if (!$('.poll_question_box').val()) {
      $('.question_error').show();
      $('.poll_question_box').css('box-shadow', '0 0 5px 0.5px red');
      return;
    } else {
      $('.question_error').hide();
    }

    //if option textbox is empty

    const $optionBox = $('.options_box').find('.ob');

    $optionBox.each(function() {
      console.log(this.value);
      if (this.value) {
        valueCheck ++;
      } else {
        $(this).css('box-shadow', '0 0 5px 0.5px red');
      }
    });
    $optionBox.on('focus', function(event) {
      event.preventDefault();
      $(this).css('box-shadow', '');
      $('.option_error').hide();
      $('.date_error').hide();
    });

    // console.log(valueCheck, textboxCount);

    if (valueCheck != textboxCount) {
      $('.option_error').show();
      return;
    }

    //if date input is null

    if (!$('.deadline_box').val()) {
      $('.date_error').show();
      return;
    }

    $('.deadline_box').on('click', function(event) {
      event.preventDefault();
      $('.date_error').hide();
    });




    //If submission is successful.
    $.post('/polls', $(this).serialize())
      .then(result => {
        console.log('query log:', result);

        $('.url_respond').text(`http://localhost:8080/polls/${result}`);
        $('.url_respond').attr('href', `http://localhost:8080/polls/${result}`);
        $('.url_user').text(`http://localhost:8080/polls/results/${result}`);
        $('.url_user').attr('href', `http://localhost:8080/polls/results/${result}`);

        $('.submission_confirmation').show();
        $('.poll').hide();
        return result;
      })
      .catch(error => console.log(error.message));

    // $('.submission_confirmation').show();
    // $('.poll').hide();
    // $('#poll_label').hide();
  });

  $('.poll_question_box').on('focus', function(event) {
    event.preventDefault();
    $('.question_error').hide();
    $('.poll_question_box').css('box-shadow', '');
  });


  const createTextbox = () => {
    let output = `
  <input class="options${textboxCount + 1} ob" name="option_${textboxCount + 1}" placeholder="Option ${textboxCount + 1}"></input>
  <input class="description${textboxCount + 1}" name="option_${textboxCount + 1}" placeholder="Description"></input>`;
    if (textboxCount > 6) {
      return;
    }
    textboxCount++;
    return output;
  };

  const deleteTextBox = () => {
  // let $lastTextBox = $('.option')
    $(`.options${textboxCount}`).remove();
    $(`.description${textboxCount}`).remove();
    textboxCount --;

  };

  $('.new_option_textbox').on('click', function(event) {
    event.preventDefault();
    $('.options_box').append(createTextbox());
  // console.log(this)
  // window.location.href = '../polls';
  });

  $('.delete_option_textbox').on('click', function(event) {
    event.preventDefault();
    deleteTextBox();
  // console.log(this)
  // window.location.href = '../polls';
  });

  $('.profile_button').on('click', function(event) {
    window.location.href = '../polls';
  });

});


