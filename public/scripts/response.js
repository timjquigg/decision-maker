// form validation eg. name input
// drag-drop
// submit handling w/ success message

$(() => {


$(".option_row").sortable();
$("#sortable").sortable();

console.log('document ready!');

$('.name_prompt').on('submit', function(event) {
  event.preventDefault();
});







})
