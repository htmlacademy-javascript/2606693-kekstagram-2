const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const HashtagLength = {
  MIN: 2,
  MAX: 20
};

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');

const validationManager = {
  handleValidation() {
    return new Pristine(
      uploadFormElement,
      {
        classTo: 'img-upload__field-wrapper',
        errorClass: 'img-upload__field-wrapper--error',
        errorTextParent: 'img-upload__field-wrapper',
      }
    );
  },
  descriptionError: '',
  hashtagsError: ''
};

const validateDescription = (value) => {
  if (value.length > MAX_DESCRIPTION_LENGTH) {
    validationManager.descriptionError = `Длина комментария должна быть не больше ${MAX_DESCRIPTION_LENGTH} символов`;
    return false;
  }
  return true;
};

const getDescriptionErrorMessage = () => validationManager.descriptionError;

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;

  if (value.length === 0) {
    return true;
  }

  switch (true) {
    case !hashtags.every((hashtag) => hashtagRegexp.test(hashtag)):
      validationManager.hashtagsError = `Хэштеги начинаются с #, разделены пробелами, длина от ${HashtagLength.MIN} до ${HashtagLength.MAX} символов`;
      return false;
    case new Set(hashtags).size !== hashtags.length:
      validationManager.hashtagsError = 'Один и тот же хэштег не может быть использован дважды';
      return false;
    case hashtags.length > MAX_HASHTAGS_COUNT:
      validationManager.hashtagsError = 'Нельзя указывать больше пяти хэштегов';
      return false;
    default:
      return true;
  }
};

const getHashtagsErrorMessage = () => validationManager.hashtagsError;

const initValidator = () => {
  const validationHandler = validationManager.handleValidation();
  validationHandler.addValidator(descriptionInputElement, validateDescription, getDescriptionErrorMessage);
  validationHandler.addValidator(hashtagsInputElement, validateHashtags, getHashtagsErrorMessage);
  return validationHandler;
};


export {initValidator};
