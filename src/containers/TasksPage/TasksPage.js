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

import "./TasksPage.css";

export default class TasksPage extends Component {
  state = { currentListId: null, taskLists: [], tasks: [] };

  componentDidMount() {
    this.listTaskLists();
  }

  listTaskLists = () => {
    window.gapi.client.tasks.tasklists
      .list({
        maxResults: 10
      })
      .then((response) => {
        console.log("Task Lists:");
        const taskLists = response.result.items;
        console.log(taskLists);

        if (taskLists && taskLists.length > 0) {
          this.setState({ taskLists });
          // for (let i = 0; i < taskLists.length; i++) {
          //   let taskList = taskLists[i];
          //   console.log(taskList.title + " (" + taskList.id + ")");
          // }
        } else {
          console.log("No task lists found.");
        }
      });
  };

  listTasksOfList = (id) => {
    window.gapi.client.tasks.tasks.list({ tasklist: id }).then((response) => {
      console.log("Tasks of List:");
      console.log(response);
      const tasks = response.result.items;
      console.log(tasks);
      if (tasks && tasks.length > 0) {
        this.setState({ tasks, currentListId: id });
      } else {
        this.setState({ tasks: [], currentListId: id });
        console.log("No tasks of this list found.");
      }
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

          <TaskLists taskLists={this.state.taskLists} listTasksOfList={this.listTasksOfList} />
        </Drawer>
        <main className="tasks__content">
          <div className="tasks__toolbar" />

          {this.state.currentListId ? <Tasks tasks={this.state.tasks} /> : "Select task list"}
        </main>
      </div>
    );
  }
}
