import {toggleClass, isEscapeKey} from './util.js';
import {initImageEditor, resetImageEditor} from './image-editor.js';
import {initValidator} from './form-validator.js';
import {sendData} from './api.js';
import {showSendDataSuccess, showSendDataError, showLoadFileError, showLoadFileSuccess} from './notifications.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');
const overlayElement = uploadFormElement.querySelector('.img-upload__overlay');
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

const closeForm = () => {
  uploadInputElement.value = '';
  hashtagsInputElement.value = '';
  descriptionInputElement.value = '';

  validationHandler.reset();
  unblockSubmitButton();
  resetImageEditor();
  toggleModal();

  document.removeEventListener('keydown', onEscKeydown);
};

const initUploadForm = () => {
  uploadInputElement.addEventListener('change', onUploadInputChange);
  closeOverlayElement.addEventListener('click', onCloseOverlayClick);
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);

  validationHandler = initValidator();
  initImageEditor();
};

function onEscKeydown (evt) {
  if (isEscapeKey(evt) && !document.body.classList.contains('notification-open') && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

function onUploadInputChange (evt) {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.split('.').pop();
  const isFileExtensionValid = FILE_TYPES.includes(fileExtension);

  if (!isFileExtensionValid) {
    showLoadFileError();
    uploadInputElement.value = '';
    return;
  }

  const url = URL.createObjectURL(file);
  scaleImageElement.src = url;
  effectsPreviewElements.forEach((effectsPreviewElement) => {
    effectsPreviewElement.style.backgroundImage = `url(${url})`;
  });

  showLoadFileSuccess();
  toggleModal();

  document.addEventListener('keydown', onEscKeydown);
}

function onCloseOverlayClick () {
  closeForm();
}

function onUploadFormSubmit(evt) {
  evt.preventDefault();

  if (validationHandler.validate()) {
    blockSubmitButton();

    sendData(new FormData(evt.target))
      .then(showSendDataSuccess)
      .catch(showSendDataError)
      .finally(unblockSubmitButton);
  }
}

export {initUploadForm, closeForm};


