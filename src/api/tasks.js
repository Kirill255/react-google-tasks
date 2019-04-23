class Tasks {
  /*
   ** All
   */

  listTaskLists() {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasklists
        .list({
          maxResults: 10
        })
        .then((response) => {
          const taskLists = response.result.items;
          resolve(taskLists);
        })
        .catch(reject);
    });
  }

  taskListById(taskListId) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasklists
        .get({
          tasklist: taskListId
        })
        .then((response) => {
          const taskList = response.result;
          resolve(taskList);
        })
        .catch(reject);
    });
  }

  taskById(taskListId, taskId) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasks
        .get({
          tasklist: taskListId,
          task: taskId
        })
        .then((response) => {
          const task = response.result;
          resolve(task);
        })
        .catch(reject);
    });
  }

  listTasksOfList(taskListId) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasks
        .list({
          tasklist: taskListId,
          showHidden: true
        })
        .then((response) => {
          const tasks = response.result.items;
          resolve(tasks);
        })
        .catch(reject);
    });
  }

  /*
   ** TaskList
   */

  createNewTaskList(title) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasklists
        .insert({
          title
        })
        .then((response) => {
          const newTaskList = response.result;
          resolve(newTaskList);
        })
        .catch(reject);
    });
  }

  updateTaskList(taskListId, title) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasklists
        .update({
          tasklist: taskListId,
          id: taskListId,
          title
        })
        .then((response) => {
          const updatedTaskList = response.result;
          resolve(updatedTaskList);
        })
        .catch(reject);
    });
  }

  deleteTaskList(taskListId) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasklists
        .delete({
          tasklist: taskListId
        })
        .then((response) => {
          const result = response.result;
          resolve(result);
        })
        .catch(reject);
    });
  }

  /*
   ** Task
   */

  createNewTask(taskListId, task) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasks
        .insert({
          tasklist: taskListId,
          ...task
        })
        .then((response) => {
          const newTask = response.result;
          resolve(newTask);
        })
        .catch(reject);
    });
  }

  updateTask(taskListId, taskId, task) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasks
        .update({
          tasklist: taskListId,
          task: taskId,
          id: taskId,
          ...task
        })
        .then((response) => {
          const updatedTask = response.result;
          resolve(updatedTask);
        })
        .catch(reject);
    });
  }

  deleteTask(taskListId, taskId) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasks
        .delete({
          tasklist: taskListId,
          task: taskId
        })
        .then((response) => {
          const result = response.result;
          resolve(result);
        })
        .catch(reject);
    });
  }

  completeTask(taskListId, taskId, status) {
    return new Promise((resolve, reject) => {
      return window.gapi.client.tasks.tasks
        .update({
          tasklist: taskListId,
          task: taskId,
          id: taskId,
          status
        })
        .then((response) => {
          const updatedTask = response.result;
          resolve(updatedTask);
        })
        .catch(reject);
    });
  }
}

export default new Tasks();
