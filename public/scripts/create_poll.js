// Client facing scripts here

// Validating poll form data
// Displaying success message & links when poll created
// Potential mailgun?

$(() => {

  autosize($('textarea'));



  $('.submission_confirmation').hide();
  $('.question_error').hide();
  $('.option_error').hide();
  $('.date_error').hide();
  $('.createpoll').hide();
  $('#welcomeback').hide();

  // event listener IF screensize is changed

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

    //if option textbox is empty or no options at all

    const $optionBox = $('.options_box').find('.ob');

    if (textboxCount <= 1) {
      $('.min_option_error').show();
      return;
    }

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

        $('.url_respond').text(`${result.protocol}${result.ip}/polls/${result.count}`);
        $('.url_respond').attr('href', `${result.protocol}${result.ip}/polls/${result.count}`);
        $('.url_user').text(`${result.protocol}${result.ip}/polls/results/${result.count}`);
        $('.url_user').attr('href', `${result.protocol}${result.ip}/polls/results/${result.count}`);

        $('.submission_confirmation').show();
        $('.poll').hide();
        $('#poll_label').hide();
        return result;
      })
      .catch(error => console.log(error.message));

  });

  // highlights required textboxes if empty
  $('.poll_question_box').on('focus', function(event) {
    event.preventDefault();
    $('.question_error').hide();
    $('.poll_question_box').css('box-shadow', '');
  });

  // creates a new textbox
  $('.new_option_textbox').on('click', function(event) {
    event.preventDefault();

    $('.options_box').append(createTextbox());

  });

  // deletes the last textbox
  $('.delete_option_textbox').on('click', function(event) {
    event.preventDefault();
    deleteTextBox();

  });

  // sends the user back to profile after submitting form
  $('.profile_button').on('click', function(event) {
    window.location.href = '../polls';
  });

  $('.deadline_box').datetimepicker({
    inline: true});

  let textboxCount = 3;

  const createTextbox = () => {
    let output = `<div class="option">
  <input class="options${textboxCount + 1} ob" name="option_${textboxCount + 1}" placeholder="Option ${textboxCount + 1}"></input>
  <textarea class="description${textboxCount + 1} desc" name="option_${textboxCount + 1}" placeholder="Description (Optional)"></textarea>
  <i class="fa-solid fa-square-plus show" hidden></i>
  <i class="fa-solid fa-square-minus hide" hidden></i>
  </div>
  `;
    if (textboxCount > 6) {
      return;
    }
    textboxCount++;
    return output;
  };

  const deleteTextBox = () => {
  // let $lastTextBox = $('.option')
    $(`.options${textboxCount}`).parent().remove();
    // $(`.description${textboxCount}`).remove();
    if (textboxCount === 0) {
      return;
    }
    textboxCount --;

  };

});


