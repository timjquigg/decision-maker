// Scripts for login - signup - logout

$(() => {

  $('form.login').on('submit', function(event) {
    event.preventDefault();

    if (invalidInput(this)) {
      return;
    }

    $.post('/users/login',$(this).serialize())
      .then((result) => {
        if (result === null) {
          alert('Invalid user');
          return;
        }
        window.location.href = '../polls';
      });
    
  });
  
  $('form.signup').on('submit', function(event) {
    event.preventDefault();

    if (invalidInput(this)) {
      return;
    }

    $.post('/users/signup', $(this).serialize())
      .then((result) => {
        if (result === '') {
          alert('Email already exists');
          return;
        }
        window.location.href = '../polls';
      });
    
      
  });
  
  $('#logout').on('click', () => {
    $.post('/users/logout')
      .then(() => {
        window.location.href = '../';
      });
  });

  const invalidInput = function(source) {
    console.log(source);
    const email = $(source.user_email).val();
    const name = $(source.user_name).val();
    console.log(name, email);
    if (name.length === 0 || email.length === 0) {
      alert('Name & email must be filled in');
      return true;
    }
    return false;
  };

});
