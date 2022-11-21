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
  console.log(result);
});







})
