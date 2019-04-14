import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class TaskListModal extends Component {
  state = { title: "" };

  handleClose = () => {
    this.props.onCancel();
    this.setState({ title: "" });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.title);
    this.setState({ title: "" });
  };

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      this.handleSubmit();
    }
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  render() {
    const { isModalOpen, isUpdate, taskListTitle } = this.props;
    const value = isUpdate && !this.state.title ? taskListTitle : this.state.title;

    return (
      <div>
        <Dialog open={isModalOpen} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">
            {isUpdate ? `Update ${taskListTitle}` : "Create new task list"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Enter a title for the task list.</DialogContentText>
            <TextField
              autoComplete="off"
              autoFocus
              margin="dense"
              id="title"
              label="Task list title"
              type="text"
              value={value}
              onChange={this.onChangeTitle}
              onKeyUp={this.handleKeyUp}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              {isUpdate ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
