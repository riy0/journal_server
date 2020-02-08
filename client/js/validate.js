/* eslint-disable no-unused-vars */
/* eslint-disable  no-useless-escape */

const validateSignUp = (username, email, password, confirmPassword) => {
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const message = {};
  message.username = [];
  message.email = [];
  message.password = [];
  message.confirmPassword = [];

  if (username === '') {
    message.username.push('Name cannot be empty');
  } else if (username.length < 6) {
    message.username.push('Name cannot be less than 6 characters');
  }
  if (email === '') {
    message.email.push('Email cannot be empty');
  } else if (!email.match(emailRegExp)) {
    message.email.push('Email is not a valid');
  }
  if (password === '') {
    message.password.push('Password cannot be empty');
  } else if (password.length < 6) {
    message.password.push('Password cannot be less than 6 characters');
  }
  if (confirmPassword === '') {
    message.confirmPassword.push('Password cannot be empty');
  } else if (confirmPassword.length < 6) {
    message.confirmPassword.push('Password cannot be less than 6 characters');
  } else if (confirmPassword !== password) {
    message.confirmPassword.push('Password do not match');
  }

  return message;
};


const validateLogin = (email, password) => {
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const message = {};
  message.email = [];
  message.password = [];
  if (email === '') {
    message.email.push('Email cannot be empty');
  } else if (!email.match(emailRegExp)) {
    message.email.push('Email is not a valid');
  }

  if (password === '') {
    message.password.push('Password cannot be empty');
  } else if (password.length < 6) {
    message.password.push('Password cannot be less than 6 characters');
  }
  return message;
};
