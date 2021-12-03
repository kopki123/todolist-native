import {
  getNotCheckedTemplate,
  getEditTemplate,
  getCheckedTemplate,
} from "./template.js";

//selectors
const form = document.querySelector(".todo-form");
const todoInput = document.getElementById("todo-input");
const todos = document.querySelector(".todos");
const allTodoCount = document.getElementById("allTodo-count");
const doneTodoCount = document.getElementById("doneTodo-count");
const clearDoneBtn = document.getElementById("clear-done");

// event listner

form.addEventListener("submit", addTodo);
clearDoneBtn.addEventListener("click", deleteDoneTodo);
window.addEventListener("DOMContentLoaded", setupTodos);

// function

// add todo
function addTodo(e) {
  e.preventDefault();
  const value = todoInput.value;
  const id = new Date().getTime().toString();

  if (value === "") {
    window.alert("請輸入文字");
    return;
  }

  const todo = document.createElement("li");
  let dataId = document.createAttribute("data-id");
  dataId.value = id;
  todo.setAttributeNode(dataId);
  todo.classList.add("todo");
  todo.innerHTML = getNotCheckedTemplate(dataId, value);

  const editBtn = todo.querySelector(".edit");
  const deleteBtn = todo.querySelector(".delete");
  const checkBtn = todo.querySelector("input[type='checkbox']");
  editBtn.addEventListener("click", editTodo);
  deleteBtn.addEventListener("click", deleteTodo);
  checkBtn.addEventListener("click", checkTodo);

  todos.appendChild(todo);
  todoInput.value = "";
  addToLocalStorage(id, value);

  displayAllAndDoneTodo();
  if (todos.querySelectorAll(".todo").length > 0) {
    document.querySelector("footer").classList.add("show");
  }
}

// delete todo
function deleteTodo(e) {
  const todo = e.currentTarget.parentElement.parentElement;
  let dataId = todo.getAttribute("data-id");
  todos.removeChild(todo);

  deleteFromLocalStorage(dataId);

  displayAllAndDoneTodo();
  if (todos.querySelectorAll(".todo").length <= 0) {
    document.querySelector("footer").classList.remove("show");
  }
}

// edit todo
function editTodo(e) {
  const todo = e.currentTarget.parentElement.parentElement;
  const isChecked = todo.querySelector("input[type='checkbox']").checked;
  const todoText = todo.querySelector("span").textContent;
  let dataId = todo.getAttribute("data-id");

  todo.innerHTML = getEditTemplate(todoText);

  const editTodoInput = todo.querySelector("input");
  editTodoInput.focus();

  editTodoInput.addEventListener("blur", () => {
    const editTodoValue = editTodoInput.value;

    if (editTodoValue === "") {
      window.alert("請輸入文字");
      return;
    }

    if (isChecked) {
      todo.classList.add("checked");
      todo.innerHTML = getCheckedTemplate(dataId, editTodoValue);
    } else {
      todo.innerHTML = getNotCheckedTemplate(dataId, editTodoValue);
    }

    const editBtn = todo.querySelector(".edit");
    const deleteBtn = todo.querySelector(".delete");
    const checkBtn = todo.querySelector("input[type='checkbox']");
    editBtn.addEventListener("click", editTodo);
    deleteBtn.addEventListener("click", deleteTodo);
    checkBtn.addEventListener("click", checkTodo);

    editLocalStorage(dataId, editTodoValue);

    displayAllAndDoneTodo();
    if (todos.querySelectorAll(".todo").length > 0) {
      document.querySelector("footer").classList.add("show");
    }
  });
}

// check todo
function checkTodo(e) {
  const todo = e.currentTarget.parentElement.parentElement.parentElement;
  let dataId = todo.getAttribute("data-id");
  const todoText = e.currentTarget.nextElementSibling;

  if (e.target.checked) {
    todo.classList.add("checked");
    todoText.classList.add("line-through");
    checkLocalStorage(dataId, true);
  } else {
    todo.classList.remove("checked");
    todoText.classList.remove("line-through");
    checkLocalStorage(dataId, false);
  }

  displayAllAndDoneTodo();
}

// delete done todo
function deleteDoneTodo() {
  const doneTodos = todos.querySelectorAll(".checked");

  doneTodos.forEach((doneTodo) => {
    let dataId = doneTodo.getAttribute("data-id");
    todos.removeChild(doneTodo);
    deleteFromLocalStorage(dataId);
    displayAllAndDoneTodo();
  });

  if (todos.querySelectorAll(".todo").length <= 0) {
    document.querySelector("footer").classList.remove("show");
  }
}

// display all todos amount and done todos amount
function displayAllAndDoneTodo() {
  doneTodoCount.innerText = todos.querySelectorAll(".checked").length;
  allTodoCount.innerText = todos.querySelectorAll(".todo").length;
}

/*  localstorage  */
function getLocalStorage() {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
}

function addToLocalStorage(id, value) {
  let todo = { id, value, isChecked: false };
  let localStorageTodos = getLocalStorage();
  localStorageTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(localStorageTodos));
}

function deleteFromLocalStorage(id) {
  let localStorageTodos = getLocalStorage();

  localStorageTodos = localStorageTodos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(localStorageTodos));
}

function checkLocalStorage(id, isChecked) {
  let localStorageTodos = getLocalStorage();
  localStorageTodos = localStorageTodos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isChecked };
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(localStorageTodos));
}

function editLocalStorage(id, value) {
  let localStorageTodos = getLocalStorage();
  localStorageTodos = localStorageTodos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, value };
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(localStorageTodos));
}

function setupTodos() {
  let localStorageTodos = getLocalStorage();

  if (localStorageTodos.length > 0) {
    localStorageTodos.map((item) => {
      const todo = document.createElement("li");
      let dataId = document.createAttribute("data-id");
      dataId.value = item.id;
      todo.setAttributeNode(dataId);
      todo.classList.add("todo");

      if (item.isChecked) {
        todo.classList.add("checked");
        todo.innerHTML = getCheckedTemplate(dataId, item.value);
      } else {
        todo.classList.remove("checked");
        todo.innerHTML = getNotCheckedTemplate(dataId, item.value);
      }

      const editBtn = todo.querySelector(".edit");
      const deleteBtn = todo.querySelector(".delete");
      const checkBtn = todo.querySelector("input[type='checkbox']");
      editBtn.addEventListener("click", editTodo);
      deleteBtn.addEventListener("click", deleteTodo);
      checkBtn.addEventListener("click", checkTodo);

      todos.appendChild(todo);
      document.querySelector("footer").classList.add("show");
      displayAllAndDoneTodo();
    });
  }
}
