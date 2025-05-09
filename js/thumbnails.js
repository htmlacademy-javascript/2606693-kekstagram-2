const createThumbnailElement = ({url, description, comments, likes}, 	template) => {
  const thumbnailElement = template.cloneNode(true);
  const thumbnailImage = thumbnailElement.querySelector('.picture__img');

  thumbnailImage.src = url;
  thumbnailImage.alt = description;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;

  return thumbnailElement;
};

const createThumbnails = (photosData) => {
  const thumbnailsContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  fragment.append(...photosData.map((photosDataItem) => createThumbnailElement(photosDataItem, template)));
  thumbnailsContainer.append(fragment);
};

export {createThumbnails, createThumbnailElement};

