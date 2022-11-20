// Client facing scripts here

// Validating poll form data
// Displaying success message & links when poll created
// Potential mailgun?

$(() => {

console.log('document ready')


$('.submission_confirmation').hide();

$('form').on('submit', function(event) {
  event.preventDefault();
  // console.log('on submit');
  $.post('/polls', $(this).serialize())
    .then (result => {
      console.log('query log:', result);
      return result})
    .catch (error => console.log(error))
      $('.submission_confirmation').show();
      $('.new_poll').hide();
});

let textboxCount = 3;

const createTextbox = () => {
  let output = `
  <input class="options${textboxCount + 1}" name="option_${textboxCount + 1}" placeholder="Option ${textboxCount+1}"></input>
  <input class="description${textboxCount + 1}" name="option_${textboxCount + 1}" placeholder="Description"></input>`;
  if(textboxCount > 6) {
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
})

$('.delete_option_textbox').on('click', function(event) {
  event.preventDefault();
  deleteTextBox();
  // console.log(this)
  // window.location.href = '../polls';
})

$('.profile_button').on('click', function(event) {
   window.location.href = '../polls';
})

});


