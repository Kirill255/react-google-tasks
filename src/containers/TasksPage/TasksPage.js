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
    editedTaskListId: null
  };

  componentDidMount() {
    this.listTaskLists();
  }

  handleModalOpen = (type, id) => () => {
    if (type === "create") {
      this.setState({ isModalOpen: true });
      return;
    }
    console.log(1);

    if (type === "edit" && id) {
      console.log(2);
      this.getTaskListById(id);
      // this.setState({ isModalOpen: true });
      return;
    }
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  getTaskListById = (id) => {
    window.gapi.client.tasks.tasklists
      .get({
        tasklist: id
      })
      .then((response) => {
        const taskList = response.result;
        if (taskList && taskList.id) {
          this.setState({
            isModalOpen: true,
            editedTaskListId: taskList.id,
            taskListTitle: taskList.title
          });
        } else {
          console.log("No task lists found.");
        }
      })
      .catch(console.log);
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

  listTasksOfList = (id) => {
    window.gapi.client.tasks.tasks
      .list({ tasklist: id })
      .then((response) => {
        const tasks = response.result.items;

        if (tasks && tasks.length > 0) {
          this.setState({ tasks, selectedTaskListId: id });
        } else {
          this.setState({ tasks: [], selectedTaskListId: id });
          console.log("No tasks of this list found.");
        }
      })
      .catch(console.log);
  };

  handleChangeTaskListTitle = (taskListTitle) => {
    this.setState({ taskListTitle });
  };

  handleCreateTaskList = () => {
    this.handleModalClose();
    if (this.state.taskListTitle) {
      if (this.state.editedTaskListId) {
        this.editTaskList(this.state.editedTaskListId, this.state.taskListTitle);
      } else {
        this.createNewTaskList(this.state.taskListTitle);
      }
    }
  };

  handleCreateTaskListCancel = () => {
    this.handleModalClose();
    this.setState({ taskListTitle: "", editedTaskListId: null });
  };

  createNewTaskList = (title) => {
    window.gapi.client.tasks.tasklists
      .insert({ title })
      .then((response) => {
        this.setState({ taskListTitle: "" });
        const newTask = response.result;

        if (newTask && newTask.id) {
          this.listTaskLists();
        } else {
          console.log("Something went wrong.");
        }
      })
      .catch(console.log);
  };

  handleEditTaskList = () => {};

  editTaskList = (id, title) => {
    window.gapi.client.tasks.tasklists
      .update({ tasklist: id, id, title })
      .then((response) => {
        this.setState({ taskListTitle: "" });
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
            listTasksOfList={this.listTasksOfList}
            handleModalOpen={this.handleModalOpen}
            editTaskList={this.editTaskList}
            deleteTaskList={this.deleteTaskList}
          />
        </Drawer>
        <main className="tasks__content">
          <div className="tasks__toolbar" />

          {this.state.selectedTaskListId ? <Tasks tasks={this.state.tasks} /> : "Select task list"}
        </main>

        <TaskListModal
          isModalOpen={this.state.isModalOpen}
          handleModalClose={this.handleModalClose}
          taskListTitle={this.state.taskListTitle}
          handleChangeTaskListTitle={this.handleChangeTaskListTitle}
          handleCreateTaskListCancel={this.handleCreateTaskListCancel}
          handleCreateTaskList={this.handleCreateTaskList}
        />
      </div>
    );
  }
}
