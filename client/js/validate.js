/* eslint-disable no-unused-vars */
/* eslint-disable  no-useless-escape */

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateSignUp = (username, email, password, confirmPassword) => {
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

const validateEntryField = (title, content) => {
  const message = {};
  message.title = [];
  message.content = [];

  if (title === '') {
    message.title.push('Title cannot be empty');
  }
  if (content === '') {
    message.title.push('Content cannot be empty');
  }
  return message;
};

const validateProfileField = (userName, email, favQuote) => {
  const message = {};
  message.userName = [];
  message.email = [];
  message.favQuote = [];
  if (userName === '') {
    message.userName.push('username cannot be empty');
  }
  if (email === '') {
    message.email.push('email cannot be empty');
  }
  if (favQuote === '') {
    message.userName.push('favQuote cannot be empty');
  }

  return message;
};
