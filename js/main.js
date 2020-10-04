'use strict';

// функция получения случайного числа в интервале
let getRandomInteger = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};


// функция, которая возвращает случайный элемент массива
let getRandomElement = function (array) {
  let randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};


// функция перемешивания массива в случайном порядке (алгоритм Фишера-Йетса)
let shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};


// функция создания комментариев для фотографии
let generateCommentsToPhoto = function () {
  const firstNames = [`Эрик`, `Кайл`, `Стен`, `Кенни`, `Крейг`, `Твик`, `Баттерс`, `Токен`];
  const secondNames = [`Картман`, `Брофловски`, `Марш`, `Маккормик`, `Такер`, `Твик`, `Стотч`, `Блэк`];
  const commentsList = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
  let comments = [];
  let commentariesAmount = getRandomInteger(1, 5); // количество комментариев к фотографии - случайное число от 1 до 5

  for (let i = 0; i < commentariesAmount; i++) {
    let comment = {};

    // имя комментатора
    comment.name = `${getRandomElement(firstNames)} ${getRandomElement(secondNames)}`;

    // аватар комментатора
    let avatarNumber = getRandomInteger(1, 6);
    comment.avatar = `img/avatar-${avatarNumber}.svg`;

    // комментарий
    let isAdditionalComment = getRandomInteger(0, 1); // определяем, будет ли вторая часть комментария
    // comment.isAdd = isAdditionalComment;

    shuffleArray(commentsList);
    // console.log(commentsList);

    comment.message = commentsList[0];
    if (isAdditionalComment) {
      comment.message += ` ${commentsList[1]}`;
    }
    comments[i] = comment;
  }
  // console.log(comments);
  return comments;
};


// функция создания объектов - фотографий пользователя
let generateDescriptionToPhotos = function (photosAmount) {
  let photos = [];

  for (let i = 0; i < photosAmount; i++) {
    let photo = {};

    photo.url = `photos/${(i + 1)}.jpg`;
    photo.description = `Фотография №${(i + 1)}`;
    photo.likes = getRandomInteger(15, 200);
    photo.comments = generateCommentsToPhoto();

    photos[i] = photo;
  }
  // console.log(photos);
  return photos;
};


// функция создания DOM-элемента на основе JS-объекта
let createPhotos = function (photo) {
  // находим шаблон, который будем копировать, находим элемент, в который будем вставлять фотографии
  let photoTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

  let photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return photoElement;
};


// функцию заполнения блока DOM-элементами на основе массива JS-объектов
let renderPhotos = function () {
  const PHOTOS_AMOUNT = 25; // количество фотографий с описаниями (объектов)

  let photoListElement = document.querySelector(`.pictures`);

  let photos = generateDescriptionToPhotos(PHOTOS_AMOUNT);

  // отрисовка шаблона в документ
  let fragment = document.createDocumentFragment();

  photos.forEach(function (photo) {
    fragment.appendChild(createPhotos(photo));
  });

  photoListElement.appendChild(fragment);
};

renderPhotos();
