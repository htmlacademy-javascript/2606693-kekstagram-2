import {renderThumbnails} from './thumbnails.js';
import {debounce} from './util.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const MAX_RANDOM_POSTS_COUNT = 10;
const RENDER_DELAY = 500;

const FilterNames = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const FilterFunctions = {
  DEFAULT: (array) => array.slice(),
  RANDOM: (array) => array.toSorted(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_POSTS_COUNT),
  DISCUSSED: (array) => array.toSorted((a, b) => b.comments.length - a.comments.length)
};

const filtersSectionElement = document.querySelector('.img-filters');
const filtersContainer = filtersSectionElement.querySelector('.img-filters__form');
let activeButtonElement = filtersContainer.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

let posts = [];

const renderThumbnailsWithDelay = debounce(renderThumbnails, RENDER_DELAY);

const useFilter = (filter) => {
  let sortFunction = FilterFunctions.DEFAULT;

  switch (filter) {
    case FilterNames.RANDOM:
      sortFunction = FilterFunctions.RANDOM;
      break;
    case FilterNames.DISCUSSED:
      sortFunction = FilterFunctions.DISCUSSED;
      break;
  }

  renderThumbnailsWithDelay(sortFunction(posts));
};

const onFiltersContainerClick = (evt) => {
  const targetButtonElement = evt.target.closest('.img-filters__button');

  if (targetButtonElement && targetButtonElement !== activeButtonElement) {
    activeButtonElement.classList.toggle(ACTIVE_BUTTON_CLASS);
    targetButtonElement.classList.toggle(ACTIVE_BUTTON_CLASS);
    activeButtonElement = targetButtonElement;

    useFilter(targetButtonElement.id);
  }
};

const initFilters = (data) => {
  posts = data;

  filtersSectionElement.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFiltersContainerClick);
};

export {initFilters};
