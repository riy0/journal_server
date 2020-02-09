/* global baseUrl, getOptions, validateProfileField */
const errBoxElement = document.getElementByName('error-box')[0];
const profSettingsBox = document.getElementById('settings-box');
const userNameHeading = document.getElementById('username-heading');
const usernameField = document.getElementById('user-name');
const emailField = document.getElementById('email');
const favQuoteHeading = document.getElementById('fav-quote');
const favQuoteTextField = document.getElementById('fav-quote-text');
const entriesCountField = document.getElementsByClassName('entries-count')[0];
const editProfBtn = document.getElementById('edit-profile-btn');

let errMsgCode;

const displayProfile = () => {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const {
    username, email, favQuote, entryCount,
  } = userDetails;
  document.title = username;
  userNameHeading.innerText = username;
  usernameField.value = username;
  emailField.value = email;
  favQuoteTextField.value = favQuote || '';
  const favoriteQuote = favQuote || 'put favorite quote here';
  favQuoteHeading.innerHTML = `<i class="fa fa-quote-left"></i>${favoriteQuote}<i class="fa fa-quote-right"></i>`;
  entriesCountField.firstElementChild.innerHTML = entryCount || '?';
};

const updateProfile = (event) => {
  event.preventDefault();
  const url = `${baseUrl}/users/updateuser`;
  const userName = usernameField.value;
  const userEmail = emailField.value;
  const userFavQuote = favQuoteTextField.value;
  const validationMsg = validateProfileField(userName, userEmail, userFavQuote);

  if (validationMsg.email.length !== 0
    || validationMsg.userName.length !== 0
    || validationMsg.favQuote.length !== 0) {
    let errorMsgs = (validationMsg.email[0]) ? `<li>${(validationMsg.email[0])}</li>` : '';
    errorMsgs += (validationMsg.userName[0]) ? `<li>${(validationMsg.userName[0])}</li>` : '';
    errorMsgs += (validationMsg.favQuote[0]) ? `<li>${(validationMsg.favQuote[0])}</li>` : '';
    errMsgCode = `<ul id="error-msg">${errorMsgs}</ul>`;
    errBoxElement.innerHTML = errMsgCode;
    return;
  }
  const editProfileData = {
    username: userName,
    email: userEmail,
    fav_quote: userFavQuote,
  };

  const options = getOptions('PUT', editProfileData);

  fetch(url, options)
    .then((res) => res.json())
    .then((result) => {
      const {
        status, message, errors, data,
      } = result;
      let errorMsgs = '';
      if (status === 'success') {
        const userData = {
          username: data.username,
          email: data.email,
          favQuote: data.fav_quote,
          entryCount: data.entryCount || null,
        };
        localStorage.setItem('user', JSON.stringify(userData));

        window.location = `${window.location.protocol}//${window.location.host}/client/profile.html`;
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
  if (profSettingsBox !== null) {
    editProfBtn.addEventListener('click', updateProfile);
    displayProfile();
  }
};
