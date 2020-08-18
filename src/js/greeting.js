const greetingForm = document.querySelector("#greeting-form");
const greetInput = greetingForm.querySelector("input");
const greeting = greetingForm.querySelector("h3");

const CURRENT_USER = "current-user";
const HIDE_CLASS = "hiding";

//input.value paint&save
function handleGreetInput(event) {
  event.preventDefault();
  const inputName = greetInput.value;
  paintGreeting(inputName);
  saveName(inputName);
}
//localstorage 저장
function saveName(name) {
  localStorage.setItem(CURRENT_USER, name);
}
//input창 보이고 제출
function askForName() {
  greetInput.classList.remove(HIDE_CLASS);
  greetingForm.addEventListener("submit", handleGreetInput);
}
//input,h3 hide&show
function paintGreeting(name) {
  greetInput.classList.add(HIDE_CLASS);
  greeting.classList.remove(HIDE_CLASS);
  greeting.innerHTML = `반갑습니다! ${name}!`;
}
//localstorage if문 으로 ask or paint
function loadGreeting() {
  const loadName = localStorage.getItem(CURRENT_USER);
  if (loadName === null) {
    askForName();
  } else {
    paintGreeting(loadName);
  }
}

function init() {
  loadGreeting();
}
init();
