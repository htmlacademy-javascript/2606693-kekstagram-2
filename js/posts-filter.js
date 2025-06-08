import {renderThumbnails} from './thumbnails.js';
import {debounce} from './util.js';

const MAX_RANDOM_POSTS_COUNT = 10;
const RENDER_DELAY = 500;

const FilterNames = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterFunctions = {
  showDefault: (items) => items.slice(),
  showRandom: (items) => items.toSorted(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_POSTS_COUNT),
  showDiscussed: (items) => items.toSorted((a, b) => b.comments.length - a.comments.length)
};

const filtersSectionElement = document.querySelector('.img-filters');
const filtersContainerElement = filtersSectionElement.querySelector('.img-filters__form');
let activeFilterElement = filtersContainerElement.querySelector('.img-filters__button--active');

let posts = [];

const renderThumbnailsDebounced = debounce(renderThumbnails, RENDER_DELAY);

const useFilter = (filterName) => {
  let sortFunction = filterFunctions.showDefault;

  switch (filterName) {
    case FilterNames.RANDOM:
      sortFunction = filterFunctions.showRandom;
      break;
    case FilterNames.DISCUSSED:
      sortFunction = filterFunctions.showDiscussed;
      break;
  }

  renderThumbnailsDebounced(sortFunction(posts));
};

const initFilters = (data) => {
  posts = data;

  filtersSectionElement.classList.remove('img-filters--inactive');
  filtersContainerElement.addEventListener('click', onFiltersContainerClick);
};

function onFiltersContainerClick (evt) {
  const targetFilterElement = evt.target.closest('.img-filters__button');

  if (targetFilterElement && targetFilterElement !== activeFilterElement) {
    activeFilterElement.classList.toggle('img-filters__button--active');
    targetFilterElement.classList.toggle('img-filters__button--active');
    activeFilterElement = targetFilterElement;

    useFilter(targetFilterElement.id);
  }
}

export {initFilters};
