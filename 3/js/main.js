const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Олег',
  'Алевтина',
  'Наталья',
  'Юлия',
  'Павел',
  'Рахим',
  'Антон',
  'Екатерина',
  'Сона',
  'Полина',
  'Сергей',
];

const getRandomInteger = (a, b) => {
  const from = Math.ceil(Math.min(a, b));
  const to = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createCommentsData = (length = 0) =>
  Array.from({ length }, (_, i) => ({
    id: i + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message:getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }));

const createPhotosData = (length = 0) =>
  Array.from({ length }, (_, i) => ({
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: 'Еще одна фотография.',
    likes: getRandomInteger(15, 200),
    comments: createCommentsData(getRandomInteger(0, 30)),
  }));

createPhotosData(25);

