import {createMockData} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {initUploadForm} from './upload-form.js';

renderThumbnails(createMockData().slice());
initUploadForm();
