import {closeForm} from './upload-form.js';
import {isEscapeKey} from './util.js';

const SHOW_NOTIFICATION_TIME = 5000;

let activeToastElement;
let activeToastTimeoutId;
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
  document.body.classList.toggle('notification-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const showToast = (templateSelector, contentSelector, message = '') => {
  const template = document.querySelector(templateSelector).content.querySelector(contentSelector);
  activeToastElement = template.cloneNode(true);

  if (message) {
    const messageElement = document.createElement('h2');
    messageElement.classList.add(`${contentSelector}__title`);
    messageElement.textContent = message;
    activeToastElement.replaceChildren(messageElement);
  }

  document.body.append(activeToastElement);

  activeToastTimeoutId = setTimeout(() => {
    activeToastElement.remove();
  }, SHOW_NOTIFICATION_TIME);
};

const removeToast = () => {
  clearTimeout(activeToastTimeoutId);
  activeToastElement.remove();
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
  showToast('#data-error','.data-error');
};

const onLoadFileSuccess = () => {
  if (activeToastElement) {
    removeToast();
  }
};

const onLoadFileError = () => {
  if (activeToastElement) {
    removeToast();
  }
  showToast('#data-error','.data-error' ,'Неверный тип загружаемого файла');
};

const onSendDataSuccess = () => {
  showNotification('#success', '.success', '.success__button');
  closeForm();
};

const onSendDataError = () => {
  showNotification('#error', '.error','.error__button');
};

export {
  onLoadDataError,
  onSendDataSuccess,
  onSendDataError,
  onLoadFileError,
  onLoadFileSuccess
};
