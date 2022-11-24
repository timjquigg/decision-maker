// Scripts for login - signup

$(() => {

  // Hide sign-up / login buttons on signup/login page
  $('.nav-right').hide();

  // Hide error messages when input changes
  $('.authentication>input').on('change', function() {
    $(this).parent().parent().find('p').slideUp();
  });

  // Validate and submit login form
  $('form.login').on('submit', function(event) {
    event.preventDefault();
    if (!validateLogin(this)) {
      return;
    }
    login(this);
  });
  
  // Validate and submit signup9 form
  $('form.signup').on('submit', function(event) {
    event.preventDefault();
    if (!validateSignup(this)) {
      return;
    }
    signup(this);
  });
  
  $('.show_login').on('click', function() {
    $('.nav-right .login').trigger('click');
  });

  $('.show_signup').on('click', function() {
    $('.nav-right .signup').trigger('click');
  });

  /*
  Helper Functions
  */
  
  const validateLogin = function(source) {
  
    const email = $(source.email).val();
    const password = $(source.password).val();

    if (email.length === 0 || password.length === 0) {
      const errorText = 'Email & password must not be blank.';
      $(source).find('p').text(errorText).slideDown();
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

    const errorVals = [];
    if (firstName.length === 0) {
      errorVals.push('First Name');
    }
    if (lastName.length === 0) {
      errorVals.push('Last Name');
    }
    if (email.length === 0) {
      errorVals.push('E-mail');
    }
    if (password.length === 0) {
      errorVals.push('Password');
    }
      
    if (errorVals.length > 0) {
      const errorText = `${errorVals.join(', ')} must not be blank.`;
      $(source).find('p').text(errorText).slideDown();
      return false;
    }

    if (password !== confirmPassword) {
      const errorText = 'Passwords do not match.';
      $(source).find('p').text(errorText).slideDown();
      return false;
    }
    return true;
  };

  const login = function(credentials) {
    $.post('/users/login',$(credentials).serialize())
      .then((result) => {
        if (result === '') {
          const errorText = 'Error: Invalid email and/or password';
          $(credentials).find('p').text(errorText).slideDown();
          return;
        }
        window.location.href = '../polls';
      });
  };

  const signup = function(credentials) {
    $.post('/users/signup', $(credentials).serialize())
      .then((result) => {
        if (result === '') {
          const errorText = 'Error: E-mail already exists';
          $(credentials).find('p').text(errorText).slideDown();
          return;
        }
        window.location.href = '../polls';
      });
  };
});
