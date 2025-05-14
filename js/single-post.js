import {getArrayItemById, isEscapeKey, createFragment} from './util.js';

const COMMENTS_SHOWN_COUNT = 5;

const postElement = document.querySelector('.big-picture');
const closePostElement = postElement.querySelector('.big-picture__cancel');

function setSinglePost (postsData) {
  const thumbnailsContainer = document.querySelector('.pictures');

  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnailElement = evt.target.closest('.picture');
    if(thumbnailElement) {
      const postData = getArrayItemById(postsData, thumbnailElement.dataset.id);
      openPost(postData);
    }
  });
}

function openPost (postData) {
  renderPost(postData);

  postElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closePostElement.addEventListener('click', onClosePostElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePost () {
  postElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closePostElement.removeEventListener('click', onClosePostElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function renderPost (postData) {
  const postImageElement = postElement.querySelector('.big-picture__img > img');
  const likesElement = postElement.querySelector('.likes-count');
  const captionElement = postElement.querySelector('.social__caption');
  const commentsCountElement = postElement.querySelector('.social__comment-count');
  const commentsShownElement = postElement.querySelector('.social__comment-shown-count');
  const commentsTotalElement = postElement.querySelector('.social__comment-total-count');
  const commentsLoaderElement = postElement.querySelector('.comments-loader');

  postImageElement.src = postData.url;
  likesElement.textContent = postData.likes;
  captionElement.textContent = postData.description;
  commentsShownElement.textContent = Math.min (COMMENTS_SHOWN_COUNT, postData.comments.length);
  commentsTotalElement.textContent = postData.comments.length;

  commentsCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  renderComments(postData.comments);
}

function renderComments (commentsData) {
  const commentsContainer = postElement.querySelector('.social__comments');
  const template = commentsContainer.querySelector('.social__comment');
  const fragment = createFragment(commentsData, template, renderCommentElement);
  commentsContainer.replaceChildren(fragment);
}

function renderCommentElement (commentsDataItem, template) {
  const {avatar, message, name} = commentsDataItem;
  const commentElement = template.cloneNode(true);
  const commentImageElement = commentElement.querySelector('.social__picture');

  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePost();
  }
}

function onClosePostElementClick () {
  closePost();
}

export {setSinglePost};

