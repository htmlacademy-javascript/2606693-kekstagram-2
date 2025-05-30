const isEscapeKey = (evt) => evt.key === 'Escape';

const createFragment = (data, template, callback) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...data.map((item) => callback(item, template)));
  return fragment;
};

const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {
  isEscapeKey,
  createFragment,
  toggleClass,
  debounce,
};
