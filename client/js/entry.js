/* global baseUrl, checkCookie, getCookie, validateEntryField */
const errBoxElement = document.getElementById('error-box');
const entrySubjectField = document.getElementById('write-subject');
const entryContentField = document.getElementById('write-content');
const newEntryButton = document.getElementById('new-entry-btn');

let errMsgCode;

let token;
if (checkCookie('token')) {
  token = getCookie('token');
}

const addNewEntry = (e) => {
  e.preventDefault();
  const errMsgElement = document.getElementById('error-msg');
  if (errMsgElement !== null) {
    errMsgElement.parentNode.removeChild(errMsgElement);
  }
  const url = `${baseUrl}/entries`;
  const title = entrySubjectField.value;
  const content = entryContentField.value;
  const validationMsg = validateEntryField(title, content);

  if (validationMsg.title.length !== 0 || validationMsg.content.length !== 0) {
    let errorMsgs = (validationMsg.title[0]) ? `<li>${(validationMsg.title[0])}</li>` : '';
    errorMsgs += (validationMsg.content[0]) ? `<li>${(validationMsg.content[0])}</li>` : '';
    errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errBoxElement.innerHTML = errMsgCode;
    return;
  }
  const newEntryData = {
    title,
    content,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain,  */*',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newEntryData),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((result) => {
      const { status, message, errors, } = result;
      let errorMsgs = '';
      if (status === 'success') {
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
  if (newEntryButton !== null) {
    newEntryButton.addEventListener('click', addNewEntry);
  }
};
