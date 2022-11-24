// Graphics to do with results
// chart
$(() => {
  $('.totalscore').hide();
  $('#viewParticipants p').hide();
  $('#viewParticipants').on('click', function(event) {
    event.preventDefault();
    $('#viewParticipants p').slideToggle();
  });

  let $temp = $("<input>");
  let $url = $(location).attr('href');

  $('.clipboard').on('click', function(event) {
    event.preventDefault();
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    alert("URL copied!");
  });

  $('span.bar').mouseenter(function(event) {
    event.preventDefault();
    $(this).closest('li').find('p').slideDown();
  });

  $('span.bar').mouseleave(function(event) {
    event.preventDefault();
    $('.totalscore').slideUp();
  });
    

  $('li span').on('mouseenter', function() {
    const title = $(this).attr('title');
    $(this).parent().parent().next().text(title);
  });
  $('li span').on('mouseleave', function() {
    const title = $(this).attr('title');
    $(this).parent().parent().next().text('');
  });
});