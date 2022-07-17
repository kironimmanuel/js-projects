const alert = document.querySelector('.alert');
const form = document.querySelector('.task-form');
const task = document.getElementById('task');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.task-container');
const list = document.querySelector('.task-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editID = '';

form.addEventListener('submit', addTask);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', retrieveItems);

function addTask(e) {
  e.preventDefault();
  const items = document.querySelectorAll('.task-item');
  const value = task.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag && items.length <= 10) {
    createListItem(id, value);
    displayAlert('task added successfully', 'success');
    container.classList.add('show-container');
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert('entry edited successfully', 'success');
    editLocalStorage(editID, value);
    setBackToDefault();
  } else if (items.length > 10) {
    displayAlert('maximum of entries reached', 'danger');
  } else {
    displayAlert('please type below', 'danger');
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(function () {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function clearItems() {
  const items = document.querySelectorAll('.task-item');
  if (items.length > 0) {
    items.forEach(function (items) {
      list.removeChild(items);
    });
  }
  container.classList.remove('show-container');
  displayAlert('list cleared', 'danger');
  setBackToDefault();
  localStorage.removeItem('list');
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove('show-container');
  }
  displayAlert('task deleted', 'danger');
  setBackToDefault();
  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  task.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = 'edit';
}

function setBackToDefault() {
  task.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

function addToLocalStorage(id, value) {
  const task = { id, value }; // ES& feature (id:id, value:value) old way
  let items = getLocalStorage();
  items.push(task);
  localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}

function retrieveItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add('show-container');
  }
}

function createListItem(id, value) {
  const element = document.createElement('article');
  element.classList.add('task-item');
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `
  <p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;
  const deleteBtn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn');
  deleteBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);
  list.appendChild(element);
}
