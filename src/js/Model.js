import Task from './Task';

export default class Model {
  constructor() {
    this.serverURL = 'https://ahj-httpserver.herokuapp.com/';
    // this.serverURL = 'http://localhost:7070/';
  }

  start() {
    const allTasks = this.getAll();

    allTasks.then((data) => {
      const showTask = new Task(this);
      showTask.addTaskInTable(data);
    });
  }

  async getAll() {
    const tickets = await fetch(`${this.serverURL}?method=allTickets`);
    return tickets.json();
  }

  async save(formData) {
    const task = {
      name: formData.get('name'),
      description: formData.get('description'),
    };

    await fetch(this.serverURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(task),
    });

    this.start();
  }

  async delete(id) {
    await fetch(`${this.serverURL}?id=${id}`, {
      method: 'DELETE',
    });

    this.start();
  }

  async getById(id) {
    const tickets = await fetch(`${this.serverURL}?method=ticketById&id=${id}`);
    return tickets.json();
  }

  async update(formData, id) {
    const task = {
      name: formData.get('name'),
      description: formData.get('description'),
      id,
    };

    await fetch(this.serverURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(task),
    });

    this.start();
  }

  async updateStatus(id) {
    await fetch(this.serverURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id, status: true }),
    });

    this.start();
  }
}