// Scripts for login - signup - logout

$(() => {

  $('form.login').on('submit', function(event) {
    event.preventDefault();
    const email = $(this.user_email).val();
    const name = $(this.user_name).val();

    if (name.length === 0 || email.length === 0) {
      alert('Name & email must be filled in');
      return;
    }

    $.post('/users/login',$(this).serialize())
      .then((result) => {
        if (result === '') {
          alert('Invalid user');
          return;
        }
        window.location.href = '../polls';
      });
    
  });
  
  $('form.signup').on('submit', function(event) {
    event.preventDefault();
    console.log(this);
    $.post('/users/signup', $(this).serialize());
  });

});
