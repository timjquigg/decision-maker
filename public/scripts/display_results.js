// Graphics to do with results
// chart
$(() => {

  $('#viewParticipants p').hide();
  $('#viewParticipants').on('click', function(event) {
    event.preventDefault();
    $('#viewParticipants p').slideToggle();
  })

  let $temp = $("<input>");
  let $url = $(location).attr('href');

  $('.clipboard').on('click', function(event) {
    event.preventDefault();
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    alert("URL copied!");
  })
});