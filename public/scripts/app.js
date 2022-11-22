$(() => {
  let $temp = $("<input>");
  let $url = $('.clipboard').attr('href');
  
  $('.clipboard').on('click', function(event) {
    event.preventDefault();
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    console.log($url)
    alert("URL copied!");
  })
    
  })