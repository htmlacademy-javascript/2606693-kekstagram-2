import {toggleClass, isEscapeKey} from './util.js';
import {initImageEditor, resetImageEditor} from './image-editor.js';
import {initValidator} from './form-validator.js';
import {sendData} from './api.js';
import {onSendDataSuccess, onSendDataError, onLoadFileError, onLoadFileSuccess} from './notifications.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const overlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');
const closeOverlayElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const scaleImageElement = uploadFormElement.querySelector('.img-upload__preview > img');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');

let validationHandler;

const toggleModal = () => {
  toggleClass(overlayElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const blockSubmitButton = () => {
  uploadButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  uploadButtonElement.disabled = false;
};

const openForm = () => {
  toggleModal();

  document.addEventListener('keydown', onEscKeydown);
};

const closeForm = () => {
  uploadInputElement.value = '';
  uploadFormElement.reset();
  unblockSubmitButton();

  validationHandler.reset();
  resetImageEditor();

  toggleModal();

  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscapeKey(evt) && !document.body.classList.contains('notification-open') && document.activeElement !== hashtagsInputElement && document.activeElement !== descriptionInputElement) {
    evt.preventDefault();
    closeForm();
  }
}

const onUploadInputChange = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.split('.').pop();
  const isFileExtensionValid = FILE_TYPES.includes(fileExtension);

  if (!isFileExtensionValid) {
    onLoadFileError();
    uploadInputElement.value = '';
    return;
  }

  const url = URL.createObjectURL(file);
  scaleImageElement.src = url;
  effectsPreviewElements.forEach((effectsPreviewElement) => {
    effectsPreviewElement.style.backgroundImage = `url(${url})`;
  });
  onLoadFileSuccess();
  openForm();
};

const onCloseOverlayClick = () => {
  closeForm();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (validationHandler.validate()) {
    blockSubmitButton();

    sendData(new FormData(evt.target))
      .then(onSendDataSuccess)
      .catch(onSendDataError)
      .finally(unblockSubmitButton);
  }
};

const initUploadForm = () => {
  uploadInputElement.addEventListener('change', onUploadInputChange);
  closeOverlayElement.addEventListener('click', onCloseOverlayClick);
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);

  validationHandler = initValidator();
  initImageEditor();
};

export {initUploadForm, closeForm};


