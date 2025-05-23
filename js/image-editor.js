const IMAGE_SCALE_STEP = 25;

const ScaleValue = {
  MIN: 25,
  MAX: 100
};

const effects = [
  {
    name: 'chrome',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    setFilter: (value) => `grayscale(${value})`
  },
  {
    name: 'sepia',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    setFilter: (value) => `sepia(${value})`
  },
  {
    name: 'marvin',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    setFilter: (value) => `invert(${value}%)`
  },
  {
    name: 'phobos',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    setFilter: (value) => `blur(${value}px)`
  },
  {
    name: 'heat',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    setFilter: (value) => `brightness(${value})`
  }
];

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const scaleImageElement = document.querySelector('.img-upload__preview > img');
const effectLevelElement = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectElements = document.querySelectorAll('.effects__radio');

let activeEffect = null;

const updateScale = (value) => {
  scaleControlValueElement.value = `${value}%`;
  scaleImageElement.style.transform = `scale(${value / 100})`;
};

const onScaleControlSmallerClick = () => {
  const newValue = parseInt(scaleControlValueElement.value, 10) - IMAGE_SCALE_STEP;
  if (newValue >= ScaleValue.MIN) {
    updateScale(newValue);
  }
};

const onScaleControlBiggerClick = () => {
  const newValue = parseInt(scaleControlValueElement.value, 10) + IMAGE_SCALE_STEP;
  if (newValue <= ScaleValue.MAX) {
    updateScale(newValue);
  }
};

const initScaleControl = () => {
  scaleControlSmallerElement.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBiggerElement.addEventListener('click', onScaleControlBiggerClick);
};

const resetScaleControl = () => {
  scaleImageElement.style.transform = '';
};

const initSlider = () => {
  sliderContainer.style.display = 'none';

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    if (activeEffect) {
      effectLevelElement.value = sliderElement.noUiSlider.get();
      scaleImageElement.style.filter = activeEffect.setFilter(effectLevelElement.value);
    }
  });

  effectElements.forEach((effectElement) => effectElement.addEventListener('click', onEffectClick));
};

const resetSlider = () => {
  activeEffect = null;
  sliderContainer.style.display = 'none';
  scaleImageElement.style.filter = '';
};

function onEffectClick () {
  activeEffect = effects.find((effect) => effect.name === this.value);
  if (!activeEffect) {
    resetSlider();
    return;
  }
  sliderContainer.style.display = '';
  sliderElement.noUiSlider.updateOptions(activeEffect.options);
  scaleImageElement.style.filter = activeEffect.setFilter(activeEffect.options.start);
}

const resetImageEditor = () => {
  resetScaleControl();
  resetSlider();
};

const initImageEditor = () => {
  initScaleControl();
  initSlider();
};

export {initImageEditor, resetImageEditor};


