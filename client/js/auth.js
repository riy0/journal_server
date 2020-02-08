/* global baseUrl, setCookie, validateSignUp, validateLogin */

const usernameField = document.getElementById('username');
const emailField = document.getElementById('email');
const pswdField = document.getElementById('password');
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
  const pswd = pswdField.value.trim();
  const confirmPswd = confirmPswdField.value.trim();
  const validationMsg = validateSignUp(username, email, pswd, confirmPswd);

  if (validationMsg.username.length !== 0 || validationMsg.email.length !== 0
    || validationMsg.pswd.length !== 0 || validationMsg.confirmPswd.length !== 0) {
    let errorMsgs = (validationMsg.username[0]) ? `<li>${(validationMsg.username[0])}</li>` : '';
    errorMsgs += (validationMsg.email[0]) ? `<li>${(validationMsg.email[0])}</li>` : '';
    errorMsgs += (validationMsg.pswd[0]) ? `<li>${(validationMsg.pswd[0])}</li>` : '';
    errorMsgs += (validationMsg.confirmPswd[0]) ? `<li>${(validationMsg.confirmPswd[0])}</li>` : '';
    errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errBoxElement.innerHTML = errMsgCode;
    return;
  }

  const signUpData = {
    username,
    email,
    pswd,
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
    .then((result) => {
      const { status, message, errors, } = result;
      let errorMsgs = '';
      if (result.status === 'success') {
        window.location = `${window.location.protocol}//${window.location.host}/client/login.html`;
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
    .catch(() => {

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
  const pswd = pswdField.value.trim();
  const validationMsg = validateLogin(email, pswd);

  if (validationMsg.email.length !== 0 || validationMsg.pswd.length !== 0) {
    let errorMsgs = (validationMsg.email[0]) ? `<li>${(validationMsg.email[0])}</li>` : '';
    errorMsgs += (validationMsg.password[0]) ? `<li>${(validationMsg.password[0])}</li>` : '';
    errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errBoxElement.innerHTML = errMsgCode;
  }

  const loginData = {
    email,
    pswd,
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
    .then((result) => {
      const { status, message, errors, } = result;
      let errorMsgs = '';
      if (status === 'success') {
        setCookie('token', result.data.token, 2);
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
    .catch(() => {
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
