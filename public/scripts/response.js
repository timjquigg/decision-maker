// form validation eg. name input
// drag-drop
// submit handling w/ success message

$(() => {


$(".option_row").sortable();
$("#sortable").sortable({
  placeholder: 'placeholder',
  axis : 'y',
  opacity: 0.3,
});

console.log('document ready!');

$('form').on('submit', function(event) {
  event.preventDefault();
  let result = $('#sortable').sortable('toArray');
  let respondentName = $('.name_box').val();
  console.log(respondentName);
  console.log(result);

  $.post('/polls/:id', {name:respondentName, result:result})
  .then (result => {
    // console.log('post log:', result);
    console.log('apple response script');
    return result})
});







})
