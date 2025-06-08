const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const HashtagLength = {
  MIN: 2,
  MAX: 20
};

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');
const uploadButtonElement = uploadFormElement.querySelector('.img-upload__submit');

let validationHandler;

const validationManager = {
  validate() {
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
  validationManager.hashtagsError = '';

  if (value.trim().length === 0) {
    return true;
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const rules = [
    {
      check: hashtags.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэштеги разделяются пробелами'
    },
    {
      check: hashtags.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа #'
    },
    {
      check: new Set(hashtags).size !== hashtags.length,
      error: 'Хэштеги не должны повторяться'
    },
    {
      check: hashtags.some((item) => item.length < HashtagLength.MIN),
      error: `Минимальное количество символов хэштега, включая решетку - ${HashtagLength.MIN}`
    },
    {
      check: hashtags.some((item) => item.length > HashtagLength.MAX),
      error: `Максимальное количество символов хэштега, включая решетку - ${HashtagLength.MAX}`
    },
    {
      check: hashtags.length > MAX_HASHTAGS_COUNT,
      error: `Нельзя указывать больше ${MAX_HASHTAGS_COUNT} хэштегов`
    },
    {
      check: hashtags.some((item) => !hashtagRegexp.test(item)),
      error: 'Хэштег содержит недопустимые символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      validationManager.hashtagsError = rule.error;
    }
    return !isInvalid;
  });

};

const getHashtagsErrorMessage = () => validationManager.hashtagsError;

const initValidator = () => {
  validationHandler = validationManager.validate();
  validationHandler.addValidator(descriptionInputElement, validateDescription, getDescriptionErrorMessage);
  validationHandler.addValidator(hashtagsInputElement, validateHashtags, getHashtagsErrorMessage);
  descriptionInputElement.addEventListener('input', onTextInput);
  hashtagsInputElement.addEventListener('input', onTextInput);
  return validationHandler;
};

function onTextInput() {
  uploadButtonElement.disabled = !validationHandler.validate();
}

export {initValidator};
