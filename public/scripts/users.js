// Scripts for login - signup - logout

$(() => {

  $('.nav-right').hide();

  $('.authentication>input').on('change', function(event) {
    $(this).parent().parent().find('p').slideUp();
  });

  $('form.login').on('submit', function(event) {
    event.preventDefault();
    if (!validateLogin(this)) {
      return;
    }

    $.post('/users/login',$(this).serialize())
      .then((result) => {
        if (result === '') {
          const errorText = 'Error: Invalid User';
          $(this).find('p').text(errorText).slideDown();
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
          const errorText = 'Error: E-mail already exists';
          $(this).find('p').text(errorText).slideDown();
          return;
        }
        window.location.href = '../polls';
      });
    
      
  });
  
  $('.show_login').on('click', function() {
    $(this).parent().parent().find('.signup').hide();
    $(this).parent().parent().find('.login').show();
    $(this).parent().hide();
    $(this).parent().next().show();
  });

  $('.show_signup').on('click', function() {
    $(this).parent().parent().find('.login').hide();
    $(this).parent().parent().find('.signup').show();
    $(this).parent().hide();
    $(this).parent().prev().show();
  });


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

});
