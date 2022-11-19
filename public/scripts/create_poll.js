// Client facing scripts here

// Validating poll form data
// Displaying success message & links when poll created
// Potential mailgun?

$(() => {

console.log('document ready')
const $submission = $('.submission_confirmation');
const $newPoll = $('.new_poll');
const $submitButton = $('.submit_button');

$submission.hide();

$submitButton.on('click', function(event) {
  event.preventDefault();
  console.log(this);

  $.post('/polls',$(this).serialize())
    //make a .then with the shows
    .then (result => console.log(result));
  $newPoll.hide();
  $submission.show();
});

let textboxCount = 1;

const createTextbox = () => {
  let output = `<br><input class="options" name="option_${textboxCount+1}" placeholder="Option"></input>`;
  textboxCount++;
  return output;
};

$('.new_option_textbox').on('click', function(event) {
  event.preventDefault();
  $('.options_box').append(createTextbox());
  console.log(this)
})

});


