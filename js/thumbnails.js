import {createFragment} from './util.js';
import {openPost} from './single-post.js';

const renderThumbnailElement = (postsDataItem, template) => {
  const {url, description, comments, likes} = postsDataItem;
  const thumbnailElement = template.cloneNode(true);
  const thumbnailImageElement = thumbnailElement.querySelector('.picture__img');

  thumbnailImageElement.src = url;
  thumbnailImageElement.alt = description;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;

  const onThumbnailElementClick = (evt) => {
    evt.preventDefault();
    openPost(postsDataItem);
  };

  thumbnailElement.addEventListener('click', onThumbnailElementClick);

  return thumbnailElement;
};

const renderThumbnails = (postsData) => {
  const thumbnailsContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = createFragment(postsData, template, renderThumbnailElement);

  thumbnailsContainer.querySelectorAll('.picture').forEach((thumbnailElement) => thumbnailElement.remove());
  thumbnailsContainer.append(fragment);
};

export {renderThumbnails};

