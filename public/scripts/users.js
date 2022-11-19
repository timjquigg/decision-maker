// Scripts for login - signup - logout

// Client facing scripts here
$(() => {

  console.log('document read');
  $('.login').on('click', function(event) {
    event.preventDefault();
    console.log(this);
    $.post('/users/login',$(this).serialize());
  });
  
  $('.signup').on('click', function(event) {
    event.preventDefault();
    console.log(this);
    $.post('/users/signup', $(this).serialize());
  });


  // $('#fetch-users').on('click', () => {
  //   $.ajax({
  //     method: 'GET',
  //     url: '/api/users'
  //   })
  //     .done((response) => {
  //       const $usersList = $('#users');
  //       $usersList.empty();

  //       for (const user of response.users) {
  //         $(`<li class="user">`).text(user.name).appendTo($usersList);
  //       }
  //     });
  // });
});
