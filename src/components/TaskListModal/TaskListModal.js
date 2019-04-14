import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class TaskListModal extends Component {
  changeTaskListTitle = (event) => {
    this.props.handleChangeTaskListTitle(event.target.value);
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.isModalOpen} onClose={this.props.handleModalClose}>
          <DialogTitle id="form-dialog-title">Create new task list</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Task list title"
              type="text"
              value={this.props.taskListTitle}
              onInput={this.changeTaskListTitle}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCreateTaskListCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.handleCreateTaskList} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
