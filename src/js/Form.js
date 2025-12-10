// eslint-disable-next-line import/no-cycle
import Task from './Task';

export default class Form {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.form = null;
  }

  createForm(name) {
    const form = document.createElement('form');
    form.classList.add('modal-form');
    form.innerHTML = `<h2>${name}</h2>
            <label class="product-name" for="name">Краткое описание</label>
            <input class="name" id="name" type="text" name="name" required>

            <label class="product-description" for="description">Полное описание</label>
            <input class="description" id="description" type="text" name="description">

            <div class="btn-form-container">
                <button class="btn-reset" type="reset">Отмена</button>
                <button class="btn-submit" type="submit">Оk</button>
            </div>`;

    this.container.appendChild(form);

    this.form = form;
    this.resetForm();
  }

  changeTask(task) {
    this.createForm('Изменить тикет');
    const taskName = this.form.querySelector('.name');
    const taskDesc = this.form.querySelector('.description');
    taskName.value = task.name;
    taskDesc.value = task.description;

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(this.form);
      this.model.update(formData, task.id);
      this.form.reset();
      this.form.remove();
      this.form = null;
    });
  }

  resetForm() {
    const BtnReset = this.form.querySelector('.btn-reset');
    BtnReset.onclick = () => {
      this.form.remove();
      this.form = null;
    };
  }

  submitForm() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(this.form);

      this.model.save(formData);

      const allTasks = this.model.getAll();

      allTasks.then((data) => {
        const showTask = new Task(this.model);
        showTask.addTaskInTable(data);
        this.form.reset();
        this.form.remove();
        this.form = null;
      });
    });
  }
}