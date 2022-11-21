// Scripts for login - signup - logout

$(() => {

  $('form.login').on('submit', function(event) {
    event.preventDefault();
    if (!validateLogin(this)) {
      return;
    }
    console.log($(this).serialize);

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

    if (!validateSignup(this)) {
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

  const validateLogin = function(source) {
  
    const email = $(source.email).val();
    const password = $(source.password).val();

    if (email.length === 0 || password.length === 0) {
      alert('Email & password must not be blank.');
      return false;
    }
    return true;
  };

  const validateSignup = function(source) {
    
    const firstName = $(source.first_name).val();
    const lastName = $(source.last_name).val();
    const email = $(source.email).val();
    const password = $(source.password).val();
    const confirmPassword = $(source.confirm_password).val();

    if (firstName.length === 0 ||
          lastName.length === 0 ||
          email.length === 0 ||
          password.length === 0) {
      alert('Name, email & password must not be blank.');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
    return true;
  };

});
