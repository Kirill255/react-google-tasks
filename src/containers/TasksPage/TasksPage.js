import React, { Component } from "react";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import TaskLists from "../../components/TaskLists/TaskLists";
import Tasks from "../../components/Tasks/Tasks";
import TaskListModal from "../../components/TaskListModal/TaskListModal";

import "./TasksPage.css";

export default class TasksPage extends Component {
  state = {
    selectedTaskListId: null,
    taskLists: [],
    tasks: [],
    isModalOpen: false,
    taskListTitle: "",
    updatedTaskListId: null
  };

  componentDidMount() {
    this.listTaskLists();
  }

  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  listTaskLists = () => {
    window.gapi.client.tasks.tasklists
      .list({
        maxResults: 10
      })
      .then((response) => {
        const taskLists = response.result.items;

        if (taskLists && taskLists.length > 0) {
          this.setState({ taskLists });
        } else {
          console.log("No task lists found.");
        }
      })
      .catch(console.log);
  };

  taskListById = (id) => {
    window.gapi.client.tasks.tasklists
      .get({
        tasklist: id
      })
      .then((response) => {
        const taskList = response.result;
        if (taskList && taskList.id) {
          this.setState({
            isModalOpen: true, // open modal after receiving the response
            updatedTaskListId: taskList.id,
            taskListTitle: taskList.title
          });
        } else {
          console.log("No task lists found.");
        }
      })
      .catch(console.log);
  };

  listTasksOfList = (id, title) => {
    window.gapi.client.tasks.tasks
      .list({ tasklist: id })
      .then((response) => {
        const tasks = response.result.items;

        if (tasks && tasks.length > 0) {
          this.setState({ tasks, selectedTaskListId: id, selectedTaskListTitle: title });
        } else {
          this.setState({ tasks: [], selectedTaskListId: id, selectedTaskListTitle: title });
          console.log("No tasks of this list found.");
        }
      })
      .catch(console.log);
  };

  // CU - create-update
  handleCUTaskList = (title) => {
    this.handleModalClose();
    if (title) {
      if (this.state.updatedTaskListId) {
        this.updateTaskList(this.state.updatedTaskListId, title);
      } else {
        this.createNewTaskList(title);
      }
    }
  };

  handleCUTaskListCancel = () => {
    this.handleModalClose();
    this.setState({ taskListTitle: "", updatedTaskListId: null });
  };

  createNewTaskList = (title) => {
    window.gapi.client.tasks.tasklists
      .insert({ title })
      .then((response) => {
        const newTask = response.result;

        if (newTask && newTask.id) {
          this.listTaskLists();
        } else {
          console.log("Something went wrong.");
        }
      })
      .catch(console.log);
  };

  // U - update
  handleUTaskList = (id) => {
    // this.setState({ isModalOpen: true }); //it will be better to open the modal after receiving the response
    this.taskListById(id);
  };

  updateTaskList = (id, title) => {
    window.gapi.client.tasks.tasklists
      .update({ tasklist: id, id, title })
      .then((response) => {
        this.setState({ taskListTitle: "", updatedTaskListId: null });
        const updatedTaskList = response.result;

        if (updatedTaskList && updatedTaskList.id) {
          this.listTaskLists();
        } else {
          console.log("Something went wrong.");
        }
      })
      .catch(console.log);
  };

  deleteTaskList = (id) => {
    window.gapi.client.tasks.tasklists
      .delete({ tasklist: id })
      .then((response) => {
        const result = response.result; // If successful, this method returns an empty response body.

        if (!result) {
          this.listTaskLists();
        } else {
          console.log("Something went wrong.");
        }
      })
      .catch(console.log);
  };

  // id списка можно тоже передавать, но мы возьмём его из selectedTaskListId
  handleCUTask = (title = "newtask", notes = null, due = null) => {
    window.gapi.client.tasks.tasks
      .insert({ tasklist: this.state.selectedTaskListId, title, notes, due })
      .then((response) => {
        const newTask = response.result;

        if (newTask && newTask.id) {
          const newTasks = [newTask, ...this.state.tasks];
          this.setState({ tasks: newTasks });
        } else {
          console.log("Something went wrong.");
        }
      })
      .catch(console.log);
  };

  handleCUTaskCancel = () => {};

  createNewTask = () => {};

  updateTask = () => {};

  deleteTask = (id) => {
    window.gapi.client.tasks.tasks
      .delete({ tasklist: this.state.selectedTaskListId, task: id })
      .then((response) => {
        const result = response.result; // If successful, this method returns an empty response body.

        if (!result) {
          const newTasks = this.state.tasks.filter((task) => task.id !== id);
          this.setState({ tasks: newTasks });
        } else {
          console.log("Something went wrong.");
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <div className="tasks__page">
        <CssBaseline />
        <AppBar position="fixed" className="tasks__app-bar">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className="tasks__app-name">
              Google Tasks
            </Typography>
            <Button id="signout_button" color="inherit" onClick={this.props.handleSignoutClick}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className="tasks__drawer"
          variant="permanent"
          classes={{
            paper: "tasks__drawer-paper"
          }}
          anchor="left"
        >
          <div className="tasks__toolbar" />
          <Divider />

          <TaskLists
            taskLists={this.state.taskLists}
            selectedTaskListId={this.state.selectedTaskListId}
            listTasksOfList={this.listTasksOfList}
            handleModalOpen={this.handleModalOpen}
            handleUTaskList={this.handleUTaskList}
            deleteTaskList={this.deleteTaskList}
          />
        </Drawer>
        <main className="tasks__content">
          <div className="tasks__toolbar" />

          {this.state.selectedTaskListId ? (
            <Tasks
              tasks={this.state.tasks}
              title={this.state.selectedTaskListTitle}
              handleCUTask={this.handleCUTask}
              deleteTask={this.deleteTask}
            />
          ) : (
            "Select task list"
          )}
        </main>

        <TaskListModal
          isModalOpen={this.state.isModalOpen}
          isUpdate={Boolean(this.state.updatedTaskListId)}
          taskListTitle={Boolean(this.state.updatedTaskListId) ? this.state.taskListTitle : ""}
          onCancel={this.handleCUTaskListCancel}
          onSubmit={this.handleCUTaskList}
        />
      </div>
    );
  }
}