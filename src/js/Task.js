// eslint-disable-next-line import/no-cycle
import Form from './Form';

export default class Task {
  constructor(model) {
    this.model = model;
    this.table = document.querySelector('.products-list');
    this.modalDelete = document.querySelector('.modal-delete');
    this.container = document.querySelector('.modal-container');
  }

  addTaskInTable(tasks) {
    this.table.innerHTML = '';
    tasks.forEach((task) => {
      const taskStatus = document.createElement('td');
      taskStatus.classList.add('task-status');
      if (!task.status) {
        taskStatus.innerHTML = '<i class="far fa-circle fa-lg"></i>';
      } else {
        taskStatus.innerHTML = ' <i class="far fa-check-circle fa-lg"></i>';
      }

      const taskItem = document.createElement('tr');
      taskItem.classList.add('product-item');
      taskItem.innerHTML = `
                <td class="task-name">
                    ${task.name}
                    <div class="task-description hidden">
                        <i class="fas fa-spinner fa-pulse"></i>
                    </div>
                </td>
                <td class="task-created">${task.created}</td>
                <td class="task-move">
                    <div class="task-edit">
                        <i class="far fa-edit fa-lg"></i>
                    </div>
                    <div class="task-delete">
                        <i class="far fa-times-circle fa-lg"></i>
                    </div>
                </td>`;

      taskItem.insertAdjacentElement('afterbegin', taskStatus);
      this.table.appendChild(taskItem);
      this.deleteTask(task, taskItem);
      this.update(task, taskItem);
      this.checkTask(task, taskStatus);
      this.showDescription(task, taskItem);
    });
  }

  deleteTask(task, elem) {
    elem.querySelector('.task-delete').addEventListener('click', () => {
      this.modalDelete.classList.remove('hidden');

      this.modalDelete.addEventListener('reset', () => {
        this.modalDelete.classList.add('hidden');
      });

      this.modalDelete.addEventListener('submit', (e) => {
        e.preventDefault();
        this.model.delete(task.id);

        this.modalDelete.classList.add('hidden');
      });
    });
  }

  update(task, elem) {
    elem.querySelector('.task-edit').addEventListener('click', () => {
      const formEdit = new Form(this.container, this.model);
      formEdit.changeTask(task);
    });
  }

  checkTask(task, circle) {
    circle.addEventListener('click', () => {
      if (!task.status) {
        // eslint-disable-next-line no-param-reassign
        task.status = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        task.status = false;
      }

      this.model.updateStatus(task.id);
    });
  }

  showDescription(task, elem) {
    elem.querySelector('.task-name').addEventListener('click', () => {
      if (task.description) {
        if (elem.querySelector('.task-description').classList.contains('hidden')) {
          elem.querySelector('.task-description').classList.remove('hidden');
          this.model.getById(task.id).then((data) => {
            // eslint-disable-next-line no-param-reassign
            elem.querySelector('.task-description').textContent = data.description;
          });
        } else {
          elem.querySelector('.task-description').classList.add('hidden');
        }
      }
    });
  }
}