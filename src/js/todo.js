const todoForm = document.querySelector("#todo-form"),
  todoInput = todoForm.querySelector("input"),
  todoUl = document.querySelector(".todo-list"),
  finishUl = document.querySelector(".finish-list");

const TODO_LIST = "todo";
const FINISH_LIST = "finish";
let todos = [];
let finished = [];
let liId = 1;

function deleteTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ulName = li.parentNode.className;
  if (ulName === "todo-list") {
    todoUl.removeChild(li);
    const newTodos = todos.filter(function (todo) {
      return parseInt(li.id) !== todo.id;
    });

    todos = newTodos;
    saveTodo();
  } else if (ulName === "finish-list") {
    finishUl.removeChild(li);
    const newFinish = finished.filter(function (finish) {
      return parseInt(li.id) !== finish.id;
    });
    finished = newFinish;
    saveFinish();
  }
}
function saveTodo() {
  localStorage.setItem(TODO_LIST, JSON.stringify(todos));
}
function paintTodo(text) {
  const todoLi = document.createElement("li");
  const todoSpan = document.createElement("span");
  todoSpan.innerText = text;
  const todoBtn = document.createElement("button");
  todoBtn.innerText = "❌";
  todoBtn.addEventListener("click", deleteTodo);
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✅";
  checkBtn.addEventListener("click", goFinish);
  checkBtn.addEventListener("click", deleteTodo);
  const newId = liId++;
  todoLi.appendChild(todoSpan);
  todoLi.appendChild(todoBtn);
  todoLi.appendChild(checkBtn);
  todoUl.appendChild(todoLi);
  todoLi.id = newId;
  const todoObj = {
    text: text,
    id: newId,
  };
  todos.push(todoObj);
  saveTodo();
}
function saveFinish() {
  localStorage.setItem(FINISH_LIST, JSON.stringify(finished));
}
function goFinish(event) {
  const li = event.target.parentNode;
  const spanText = li.querySelector("span").innerText;
  const ulName = li.parentNode.className;
  if (ulName === "todo-list") paintFinish(spanText);
  else if (ulName === "finish-list") paintTodo(spanText);
}
function paintFinish(text) {
  const finishLi = document.createElement("li");
  const finishSpan = document.createElement("span");
  finishSpan.innerText = text;
  const finishBtn = document.createElement("button");
  finishBtn.innerText = "❌";
  finishBtn.addEventListener("click", deleteTodo);
  const backBtn = document.createElement("button");
  backBtn.innerText = "⬅️";
  backBtn.addEventListener("click", goFinish);
  backBtn.addEventListener("click", deleteTodo);
  const newId = liId++;
  finishLi.appendChild(backBtn);
  finishLi.appendChild(finishBtn);
  finishLi.appendChild(finishSpan);
  finishUl.appendChild(finishLi);
  finishLi.id = newId;
  const finishObj = {
    text: text,
    id: newId,
  };
  finished.push(finishObj);
  saveFinish();
}
function loadTodo() {
  const loadTodoList = localStorage.getItem(TODO_LIST);
  if (loadTodoList !== null) {
    const parsedTodo = JSON.parse(loadTodoList);
    parsedTodo.forEach((todo) => paintTodo(todo.text));
  }
  const loadFinishList = localStorage.getItem(FINISH_LIST);
  if (loadFinishList !== null) {
    const parsedFinish = JSON.parse(loadFinishList);
    parsedFinish.forEach((finish) => paintFinish(finish.text));
  }
}
function handleTodo(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(currentValue);
  todoInput.value = "";
}

function init() {
  loadTodo();
  todoForm.addEventListener("submit", handleTodo);
}
init();
