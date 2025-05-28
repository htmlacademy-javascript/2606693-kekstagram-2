import {closeForm} from './upload-form.js';
import {isEscapeKey} from './util.js';

const SHOW_NOTIFICATION_TIME = 5000;

const uploadButtonElement = document.querySelector('.img-upload__submit');

let activeNotificationElement;
let notificationTriggerElement;

const showNotification = (templateSelector, contentSelector, triggerSelector) => {
  const template = document.querySelector(templateSelector).content.querySelector(contentSelector);
  activeNotificationElement = template.cloneNode(true);
  notificationTriggerElement = activeNotificationElement.querySelector(triggerSelector);

  activeNotificationElement.addEventListener('click', onNotificationClick);
  document.addEventListener('keydown', onEscKeydown);

  document.body.classList.toggle('notification-open');
  document.body.append(activeNotificationElement);
};

const removeNotification = () => {
  notificationTriggerElement = null;
  activeNotificationElement.remove();

  uploadButtonElement.disabled = false;

  document.body.classList.toggle('notification-open');
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    removeNotification();
  }
}

function onNotificationClick (evt) {
  if (evt.target === activeNotificationElement || evt.target === notificationTriggerElement) {
    removeNotification();
  }
}

const onLoadDataError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = template.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, SHOW_NOTIFICATION_TIME);
};

const onSendDataSuccess = () => {
  showNotification('#success', '.success', '.success__button');
  closeForm();
};

const onSendDataError = () => {
  showNotification('#error', '.error','.error__button');
};

export { onLoadDataError, onSendDataSuccess, onSendDataError};
