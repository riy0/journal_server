/* global baseUrl, setCookie, validateSignUp, validateLogin */

const usernameField = document.getElementById('username');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confirmPswdField = document.getElementById('confirm-password');
const submitSignUp = document.getElementById('submit-signup');
const submitLogin = document.getElementById('submit-login');
const errBoxElement = document.getElementById('error-box');

let errMsgCode;

const signup = (e) => {
  e.preventDefault();
  const errMsgElement = document.getElementById('error-msg');
  if (errMsgElement !== null) {
    errMsgElement.parentNode.removeChild(errMsgElement);
  }
  const url = `${baseUrl}/auth/signup`;
  const username = usernameField.value.trim();
  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  const confirmPswd = confirmPswdField.value.trim();
  const validationMsg = validateSignUp(username, email, password, confirmPswd);

  if (validationMsg.username.length !== 0 || validationMsg.email.length !== 0
    || validationMsg.password.length !== 0 || validationMsg.confirmPassword.length !== 0) {
    let errorMsgs = (validationMsg.username) ? `<li>${(validationMsg.username)}</li>` : '';
    errorMsgs += (validationMsg.email) ? `<li>${(validationMsg.email)}</li>` : '';
    errorMsgs += (validationMsg.pswd) ? `<li>${(validationMsg.password)}</li>` : '';
    errorMsgs += (validationMsg.confirmPassword) ? `<li>${(validationMsg.confirmPassword)}</li>` : '';
    errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errBoxElement.innerHTML = errMsgCode;
    return;
  }

  const signUpData = {
    username,
    email,
    password,
  };

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain,  */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(signUpData),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then(({ status, message, errors, }) => {
      let errorMsgs = '';
      if (status === 'success') {
        window.location = `${window.location.protocol}//${window.location.host}/client/login.html`;
      } else if (status === 'error') {
        if (errors) {
          errors.forEach((error) => {
            errorMsgs += `<li>${error}</li>`;
          });
          errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        } else if (message) {
          errorMsgs += `<li>${message}</li>`;
          errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        }
        errBoxElement.innerHTML = errMsgCode;
      }
    })
    .catch((err) => {
      const message = `<li>${err}</li>`;
      errMsgCode = `<ul id="error-msg">${message}</ul>`;
      errBoxElement.innerHTML = errMsgCode;
    });
};

const login = (e) => {
  e.preventDefault();
  const errMsgElement = document.getElementById('error-msg');
  if (errMsgElement !== null) {
    errMsgElement.parentNode.removeChild(errMsgElement);
  }
  const url = `${baseUrl}/auth/login`;
  const email = emailField.nodeValue.trim();
  const password = passwordField.value.trim();
  const validationMsg = validateLogin(email, password);

  if (validationMsg.email.length !== 0 || validationMsg.pswd.length !== 0) {
    let errorMsgs = (validationMsg.email[0]) ? `<li>${(validationMsg.email[0])}</li>` : '';
    errorMsgs += (validationMsg.password[0]) ? `<li>${(validationMsg.password[0])}</li>` : '';
    errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errBoxElement.innerHTML = errMsgCode;
  }

  const loginData = {
    email,
    password,
  };

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(loginData),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((result) => {
      const {
        status, message, errors, data,
      } = result;
      let errorMsgs = '';
      if (status === 'success') {
        setCookie('token', data.token, 2);
        const userData = {
          username: data.username,
          email: data.email,
          favQutote: data.fav_quote,
          entryCount: data.entryCount || null,
        };
        localStorage.setItem('user', JSON.stringify(userData));

        window.location = `${window.location.protocol}//${window.location.host}/client/list-entry.html`;
      } else if (status === 'error') {
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
          errors.forEach((error) => {
            errorMsgs += `<li>${error}</li>`;
          });
          errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        } else if (Object.prototype.hasOwnProperty.call(result, 'message')) {
          errorMsgs += `<li>${message}</li>`;
          errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
        }
        errBoxElement.innerHTML = errMsgCode;
      }
    })
    .catch((err) => {
      const message = `<li>${err}</li>`;
      errMsgCode = `<ul id="error-msg">${message}</ul>`;
      errBoxElement.innerHTML = errMsgCode;
    });
};

window.onload = () => {
  if (submitSignUp !== null) {
    submitSignUp.addEventListener('click', signup);
  }
  if (submitLogin !== null) {
    submitLogin.addEventListener('click', login);
  }
};
