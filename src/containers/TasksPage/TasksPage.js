import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import TaskLists from "../../components/TaskLists/TaskLists";
import Tasks from "../../components/Tasks/Tasks";
import TaskListModal from "../../components/TaskListModal/TaskListModal";
import TaskModal from "../../components/TaskModal/TaskModal";
import About from "../../components/About/About";

import apiTasks from "../../api/tasks";

import "./TasksPage.css";

export default class TasksPage extends Component {
  state = {
    selectedTaskListId: null,
    selectedTaskListTitle: "",
    taskLists: [],
    tasks: [],
    isModalOpen: false,
    isModalTaskOpen: false,
    taskListTitle: "",
    taskTitle: "",
    taskNotes: "",
    taskDue: null,
    updatedTaskListId: null,
    updatedTaskId: null,
    isRequest: false,
    isAbout: false,
    notification: null
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

  handleModalTaskOpen = () => {
    this.setState({ isModalTaskOpen: true });
  };

  handleModalTaskClose = () => {
    this.setState({ isModalTaskOpen: false });
  };

  /*
   ** All
   */

  listTaskLists = async () => {
    const taskLists = await apiTasks.listTaskLists();

    if (taskLists && taskLists.length > 0) {
      this.setState({ taskLists });
    } else {
      console.log("No task lists found.");
    }
  };

  taskListById = async (taskListId) => {
    const taskList = await apiTasks.taskListById(taskListId);

    if (taskList && taskList.id) {
      this.setState({
        isModalOpen: true, // open modal after receiving the response
        updatedTaskListId: taskList.id,
        taskListTitle: taskList.title
      });
    } else {
      console.log("No task lists found.");
    }
  };

  taskById = async (taskId) => {
    const task = await apiTasks.taskById(this.state.selectedTaskListId, taskId);

    if (task && task.id) {
      this.setState({
        isModalTaskOpen: true, // open modal after receiving the response
        updatedTaskId: task.id,
        taskTitle: task.title,
        taskNotes: task.notes || "",
        taskDue: task.due || null
      });
    } else {
      console.log("No task lists found.");
    }
  };

  // ???????????????
  listTasksOfList = async (taskListId, title) => {
    const tasks = await apiTasks.listTasksOfList(taskListId);

    if (tasks && tasks.length > 0) {
      this.setState({
        tasks,
        selectedTaskListId: taskListId,
        selectedTaskListTitle: title,
        isRequest: false,
        isAbout: false
      });
    } else {
      this.setState({
        tasks: [],
        selectedTaskListId: taskListId,
        selectedTaskListTitle: title,
        isRequest: false,
        isAbout: false
      });
      console.log("No tasks of this list found.");
    }
  };

  /*
   ** TaskList
   */

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

  createNewTaskList = async (title) => {
    const newTaskList = await apiTasks.createNewTaskList(title);

    if (newTaskList && newTaskList.id) {
      this.showNotification("List created successfuly");

      this.listTaskLists();
    } else {
      console.log("Something went wrong.");
    }
  };

  // U - update
  handleUTaskList = (id) => {
    // this.setState({ isModalOpen: true }); //it will be better to open the modal after receiving the response
    this.taskListById(id);
  };

  updateTaskList = async (taskListId, title) => {
    const updatedTaskList = await apiTasks.updateTaskList(taskListId, title);

    this.setState({ taskListTitle: "", updatedTaskListId: null });

    if (updatedTaskList && updatedTaskList.id) {
      this.showNotification("List updated successfuly");

      this.listTaskLists();
    } else {
      console.log("Something went wrong.");
    }
  };

  deleteTaskList = async (taskListId) => {
    const result = await apiTasks.deleteTaskList(taskListId); // If successful, this method returns an empty response body.

    if (!result) {
      this.showNotification("List removed successfuly");

      this.listTaskLists();
    } else {
      console.log("Something went wrong.");
    }
  };

  /*
   ** Task
   */

  handleCUTask = (task) => {
    this.handleModalTaskClose();
    if (Object.keys(task).length) {
      if (this.state.updatedTaskId) {
        this.updateTask(this.state.updatedTaskId, task);
      } else {
        this.createNewTask(task);
      }
    }
  };

  handleCUTaskCancel = () => {
    this.handleModalTaskClose();
    this.setState({ taskTitle: "", taskNotes: "", taskDue: null, updatedTaskId: null });
  };

  createNewTask = async (task) => {
    const newTask = await apiTasks.createNewTask(this.state.selectedTaskListId, task);

    if (newTask && newTask.id) {
      this.showNotification("Task created successfuly");

      const newTasks = [newTask, ...this.state.tasks];
      this.setState({ tasks: newTasks });
    } else {
      console.log("Something went wrong.");
    }
  };

  handleUTask = (id) => {
    this.taskById(id);
  };

  updateTask = async (taskId, task) => {
    this.setState({ taskTitle: "", taskNotes: "", taskDue: null, updatedTaskId: null }); // обнуляю перед запросом, иначе у меня приходят старые пропсы в TaskModal

    const updatedTask = await apiTasks.updateTask(this.state.selectedTaskListId, taskId, task);
    // this.setState({ taskTitle: "", taskNotes: "", taskDue: null, updatedTaskId: null });

    if (updatedTask && updatedTask.id) {
      this.showNotification("Task updated successfuly");

      this.listTasksOfList(this.state.selectedTaskListId, this.state.selectedTaskListTitle);
    } else {
      console.log("Something went wrong.");
    }
  };

  deleteTask = async (taskId) => {
    const result = await apiTasks.deleteTask(this.state.selectedTaskListId, taskId); // If successful, this method returns an empty response body.

    if (!result) {
      this.showNotification("Task removed successfuly");

      const newTasks = this.state.tasks.filter((task) => task.id !== taskId);
      this.setState({ tasks: newTasks });
    } else {
      console.log("Something went wrong.");
    }
  };

  handleTaskComplete = async (taskId, status) => {
    this.setState({ isRequest: true });

    const updatedTask = await apiTasks.completeTask(this.state.selectedTaskListId, taskId, status);

    // this.setState({ isRequest: false }); // перенёс в listTasksOfList

    if (updatedTask && updatedTask.id) {
      const notifText = status === "completed" ? "completed" : "not completed";
      this.showNotification(`Task ${notifText}`);

      this.listTasksOfList(this.state.selectedTaskListId, this.state.selectedTaskListTitle);
    } else {
      console.log("Something went wrong.");
    }
  };

  getAbout = () => {
    this.setState({ isAbout: true, selectedTaskListId: null });
  };

  showNotification = (message, autoHideDuration = 3000) => {
    if (this.timer) clearTimeout(this.timer);

    this.setState({ notification: { message } }, () => {
      this.timer = setTimeout(() => this.setState({ notification: null }), autoHideDuration);
    });
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
            getAbout={this.getAbout}
          />
        </Drawer>
        <main className="tasks__content">
          <div className="tasks__toolbar" />

          {this.state.selectedTaskListId ? (
            <Tasks
              tasks={this.state.tasks}
              title={this.state.selectedTaskListTitle}
              handleModalOpen={this.handleModalTaskOpen}
              handleUTask={this.handleUTask}
              deleteTask={this.deleteTask}
              handleTaskComplete={this.handleTaskComplete}
              isRequest={this.state.isRequest}
            />
          ) : this.state.isAbout ? (
            <About />
          ) : (
            <Paper style={{ padding: "8px" }} elevation={1}>
              <Typography variant="h5" component="h3">
                Select task list or create new.
              </Typography>
            </Paper>
          )}
        </main>

        <TaskListModal
          isModalOpen={this.state.isModalOpen}
          isUpdate={Boolean(this.state.updatedTaskListId)}
          taskListTitle={Boolean(this.state.updatedTaskListId) ? this.state.taskListTitle : ""}
          onCancel={this.handleCUTaskListCancel}
          onSubmit={this.handleCUTaskList}
        />

        <TaskModal
          isModalOpen={this.state.isModalTaskOpen}
          isUpdate={Boolean(this.state.updatedTaskId)}
          taskTitle={Boolean(this.state.updatedTaskId) ? this.state.taskTitle : ""}
          taskNotes={Boolean(this.state.updatedTaskId) ? this.state.taskNotes : ""}
          taskDue={Boolean(this.state.updatedTaskId) ? this.state.taskDue : null}
          onCancel={this.handleCUTaskCancel}
          onSubmit={this.handleCUTask}
        />

        {this.state.notification && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={true}
            message={this.state.notification.message}
          />
        )}
      </div>
    );
  }
}
