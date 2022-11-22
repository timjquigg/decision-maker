// Graphics to do with results
// chart
$(() => {

  $('#viewParticipants p').hide();
  $('#viewParticipants').on('click', function(event) {
    event.preventDefault();
    $('#viewParticipants p').slideToggle();
  })
});