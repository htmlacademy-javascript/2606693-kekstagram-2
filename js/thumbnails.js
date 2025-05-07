import {createMockData} from './data.js';

const thumbnailsContainer = document.querySelector('.pictures');

const photosData = createMockData();
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createThumbnailElement = ({url, description, comments, likes}, 	boilerplate) => {
  const thumbnaiElement = boilerplate.cloneNode(true);
  const thumbnailImage = thumbnaiElement.querySelector('.picture__img');

  thumbnailImage.src = url;
  thumbnailImage.alt = description;
  thumbnaiElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnaiElement.querySelector('.picture__likes').textContent = likes;

  return thumbnaiElement;
};

fragment.append(...photosData.map((photosDataItem) => createThumbnailElement(photosDataItem, template)));

thumbnailsContainer.append(fragment);
