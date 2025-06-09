import {getData} from './api.js';
import {renderThumbnails} from './thumbnails.js';
import {initFilters} from './posts-filter.js';
import {initUploadForm} from './upload-form.js';
import {showLoadDataError} from './notifications.js';

initUploadForm();

const displayData = (data) => {
  renderThumbnails(data);
  initFilters(data);
};

getData()
  .then((data) => {
    displayData(data.slice());
  })
  .catch((showLoadDataError));
