import {closeForm} from './upload-form.js';
import {isEscapeKey} from './util.js';

const SHOW_NOTIFICATION_TIME = 5000;

let toastElement;
let toastTimeoutId;
let notificationElement;
let notificationTriggerElement;

const showNotification = (templateSelector, contentSelector, triggerSelector) => {
  const template = document.querySelector(templateSelector).content.querySelector(contentSelector);
  notificationElement = template.cloneNode(true);
  notificationTriggerElement = notificationElement.querySelector(triggerSelector);

  notificationElement.addEventListener('click', onNotificationClick);
  document.addEventListener('keydown', onEscKeydown);
  document.body.classList.toggle('notification-open');
  document.body.append(notificationElement);
};

const removeNotification = () => {
  notificationTriggerElement = null;
  notificationElement.remove();
  document.body.classList.toggle('notification-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const showToast = (templateSelector, contentSelector, message = '') => {
  const template = document.querySelector(templateSelector).content.querySelector(contentSelector);
  toastElement = template.cloneNode(true);

  if (message) {
    const messageElement = document.createElement('h2');
    messageElement.classList.add(`${contentSelector}__title`);
    messageElement.textContent = message;
    toastElement.replaceChildren(messageElement);
  }

  document.body.append(toastElement);

  toastTimeoutId = setTimeout(() => {
    toastElement.remove();
  }, SHOW_NOTIFICATION_TIME);
};

const removeToast = () => {
  clearTimeout(toastTimeoutId);
  toastElement.remove();
};

const showLoadDataError = () => {
  showToast('#data-error','.data-error');
};

const showLoadFileSuccess = () => {
  if (toastTimeoutId) {
    removeToast();
  }
};

const showLoadFileError = () => {
  if (toastTimeoutId) {
    removeToast();
  }
  showToast('#data-error','.data-error' ,'Неверный тип загружаемого файла');
};

const showSendDataSuccess = () => {
  showNotification('#success', '.success', '.success__button');
  closeForm();
};

const showSendDataError = () => {
  showNotification('#error', '.error','.error__button');
};

function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    removeNotification();
  }
}

function onNotificationClick (evt) {
  if (evt.target === notificationElement || evt.target === notificationTriggerElement) {
    removeNotification();
  }
}

export {
  showLoadDataError,
  showSendDataSuccess,
  showSendDataError,
  showLoadFileError,
  showLoadFileSuccess
};
