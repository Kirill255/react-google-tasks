import React, { Component } from "react";

export default class TasksPage extends Component {
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
        if (taskLists && taskLists.length > 0) {
          for (let i = 0; i < taskLists.length; i++) {
            let taskList = taskLists[i];
            console.log(taskList.title + " (" + taskList.id + ")");
          }
        } else {
          console.log("No task lists found.");
        }
      });
  };

  render() {
    return (
      <div>
        <button
          id="signout_button"
          style={{ width: 200, height: 50, textAlign: "center" }}
          onClick={this.props.handleSignoutClick}
        >
          Sign Out
        </button>
      </div>
    );
  }
}
