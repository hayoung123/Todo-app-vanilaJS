const body = document.querySelector("body");

const IMG_LINK = [
  "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/03/12/20/07/maldives-3220702_1280.jpg",
  "https://cdn.pixabay.com/photo/2013/02/21/19/06/beach-84533_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/08/12/00/01/oia-416135_1280.jpg",
];
const IMG_NUMBER = IMG_LINK.length;
function setBackground(imgNumber) {
  const image = new Image();
  image.src = IMG_LINK[imgNumber];
  image.classList.add("backImg");
  body.appendChild(image);
}

function getRandom() {
  return Math.floor(Math.random() * IMG_NUMBER);
}
function init() {
  const imageNumber = getRandom();
  setBackground(imageNumber);
}
init();
