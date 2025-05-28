import {renderThumbnails} from './thumbnails.js';
import {initUploadForm} from './upload-form.js';
import {getData} from './api.js';
import {onLoadDataError} from './notifications.js';

getData()
  .then((data) => renderThumbnails(data.slice()))
  .catch((onLoadDataError));
initUploadForm();
