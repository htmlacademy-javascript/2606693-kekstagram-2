import {getData} from './api.js';
import {renderThumbnails} from './thumbnails.js';
import {initFilters} from './posts-filter.js';
import {initUploadForm} from './upload-form.js';
import {onLoadDataError} from './notifications.js';

const initApp = (data) => {
  renderThumbnails(data);
  initFilters(data);
  initUploadForm();
};

getData()
  .then((data) => {
    initApp(data.slice());
  })
  .catch((onLoadDataError));
