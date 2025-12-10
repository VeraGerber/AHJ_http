import Model from './Model';
import Form from './Form';
import Task from './Task';

const serverResponse = new Model();

const addTask = document.querySelector('.btn-add');
const modalContainer = document.querySelector('.modal-container');

document.addEventListener('DOMContentLoaded', () => {
  const allTasks = serverResponse.getAll();

  allTasks.then((data) => {
    const showTask = new Task(serverResponse);
    showTask.addTaskInTable(data);
  });
});

addTask.addEventListener('click', () => {
  const addForm = new Form(modalContainer, serverResponse);
  addForm.createForm('Добавить тикет');
  addForm.submitForm();
});