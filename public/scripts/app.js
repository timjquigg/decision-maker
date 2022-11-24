$(() => {

  // Copy URL to share when icon is clicked
  let $temp = $("<input>");
  let $url = $('.clipboard').attr('href');

  $('.clipboard').on('click', function(event) {
    event.preventDefault();
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    alert("URL copied!");
  });

  // Show each option on hover when the screen is samller than 1327
  if ($(window).width() < 1327) {
    $('li span').on('mouseenter', function() {
      const title = $(this).attr('title');
      $(this).parent().parent().next().text(title);
    });
    $('li span').on('mouseleave', function() {
      const title = $(this).attr('title');
      $(this).parent().parent().next().text('');
    });
  }

});
