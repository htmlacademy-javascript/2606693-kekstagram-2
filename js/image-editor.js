const ScaleValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const SliderValue = {
  MIN: 0,
  MAX: 100,
  STEP: 1
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

const scaleControlElement = document.querySelector('.scale');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const scaleImageElement = document.querySelector('.img-upload__preview > img');
const effectLevelElement = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectElements = document.querySelectorAll('.effects__radio');

let activeEffect = null;
let imageScale = ScaleValue.MAX;

function onScaleControlElementClick (evt) {
  if (evt.target.closest('.scale__control--smaller')) {
    imageScale = Math.max(ScaleValue.MIN, imageScale - ScaleValue.STEP);
  }
  if (evt.target.closest('.scale__control--bigger')) {
    imageScale = Math.min(ScaleValue.MAX, imageScale + ScaleValue.STEP);
  }
  scaleControlValueElement.value = `${imageScale}%`;
  scaleImageElement.style.transform = `scale(${imageScale / 100})`;
}

const initSlider = () => {
  sliderContainer.style.display = 'none';

  noUiSlider.create(sliderElement, {
    range: {
      min: SliderValue.MIN,
      max: SliderValue.MAX,
    },
    start: SliderValue.MAX,
    step: SliderValue.STEP,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(parseInt(value, 10) ? 0 : 1),
      from: (value) => parseFloat(value)
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
  resetSlider();
  imageScale = ScaleValue.MAX;
  scaleImageElement.style.transform = '';
};

const initImageEditor = () => {
  initSlider();
  scaleControlElement.addEventListener('click', onScaleControlElementClick);
};

export {initImageEditor, resetImageEditor};


