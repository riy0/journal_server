const errContainerElement = document.getElementById('error-container');
const errMsgContentArea = document.getElementById('error-content');

const displayError = () => {
  const currentLocation = new URL(document.location);
  const params = (currentLocation).searchParams;
  let msgFromUrl = params.get('msg');
  if (msgFromUrl !== null) {
    msgFromUrl = decodeURIComponent(msgFromUrl).trim().toString();
    errMsgContentArea.innerText = msgFromUrl;
  }
};
window.onload = () => {
  if (errContainerElement !== null) {
    displayError();
  }
};
