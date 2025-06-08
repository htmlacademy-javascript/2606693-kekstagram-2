import {createFragment} from './util.js';
import {openPost} from './single-post.js';

const thumbnailsContainerElement = document.querySelector('.pictures');

const renderThumbnailElement = (post, template) => {
  const {url, description, comments, likes} = post;

  const thumbnailElement = template.cloneNode(true);
  const thumbnailImageElement = thumbnailElement.querySelector('.picture__img');
  const thumbnailCommentsElement = thumbnailElement.querySelector('.picture__comments');
  const thumbnailLikesElement = thumbnailElement.querySelector('.picture__likes');

  thumbnailImageElement.src = url;
  thumbnailImageElement.alt = description;
  thumbnailCommentsElement.textContent = comments.length;
  thumbnailLikesElement.textContent = likes;

  const onThumbnailElementClick = (evt) => {
    evt.preventDefault();
    openPost(post);
  };

  thumbnailElement.addEventListener('click', onThumbnailElementClick);

  return thumbnailElement;
};

const renderThumbnails = (posts) => {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = createFragment(posts, template, renderThumbnailElement);

  thumbnailsContainerElement.querySelectorAll('.picture').forEach((thumbnailElement) => thumbnailElement.remove());
  thumbnailsContainerElement.append(fragment);
};

export {renderThumbnails};

