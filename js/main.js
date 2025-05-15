import {createMockData} from './data.js';
import {renderThumbnails} from './thumbnails.js';

const postsData = createMockData();
renderThumbnails(postsData.slice());
