/* eslint-disable no-unused-vars, no-plusplus */

// liveserver
const baseUrl = 'http://127.0.0.1:3000/api/v1';

const getCookie = (ckname) => {
  const name = `${ckname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);

  const ca = decodedCookie.split(';');
  for (let index = 0; index < ca.length; index++) {
    let cookieString = ca[index];
    while (cookieString.charAt(0) === ' ') {
      cookieString = cookieString.substring(1);
    }
    if (cookieString.indexOf(name) === 0) {
      return cookieString.substring(name.length, cookieString.length);
    }
  }
  return '';
};

const checkCookie = (ckname) => {
  const cookieName = getCookie(ckname);
  if (cookieName !== '') {
    return true;
  }
  return false;
};

const setCookie = (ckname, ckvalue, exdays) => {
  const date = new Date();
  date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${ckname}=${ckvalue};${expires};path=/`;
};

let token;
if (checkCookie('token')) {
  token = getCookie('token');
}

const getOptions = (method, payload) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json, text/plain,  */*',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  return options;
};
