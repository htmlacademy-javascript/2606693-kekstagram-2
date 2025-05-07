import {createMockData} from './data.js';

const thumbnailsContainer = document.querySelector('.pictures');

const photosData = createMockData();
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createThumbnailElement = ({url, description, comments, likes}, 	boilerplate) => {
  const thumbnailElement = boilerplate.cloneNode(true);
  const thumbnailImage = thumbnailElement.querySelector('.picture__img');

  thumbnailImage.src = url;
  thumbnailImage.alt = description;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;

  return thumbnailElement;
};

fragment.append(...photosData.map((photosDataItem) => createThumbnailElement(photosDataItem, template)));

thumbnailsContainer.append(fragment);
