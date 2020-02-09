/* eslint-disable no-unused-vars */

// liveserver
const baseUrl = 'http://127.0.0.1:3000/api/v1';

const getCookie = (ckname) => {
  const name = `${ckname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i + 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
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
