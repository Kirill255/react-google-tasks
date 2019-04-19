import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

export default class TaskModal extends Component {
  state = { title: "", notes: "", due: null };

  handleDateChange = (date) => {
    this.setState({ due: date });
  };

  handleClose = () => {
    this.props.onCancel();
    this.setState({ title: "", notes: "", due: null });
  };

  handleSubmit = () => {
    if (this.state.title) {
      this.props.onSubmit(this.state);
      this.setState({ title: "", notes: "", due: null });
    }
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

  onChangeNote = (event) => {
    this.setState({ notes: event.target.value });
  };

  render() {
    const { isModalOpen, isUpdate, taskTitle, taskNotes, taskDue } = this.props;
    const valueTitle = isUpdate && !this.state.title ? taskTitle : this.state.title;
    const valueNotes = isUpdate && !this.state.notes ? taskNotes : this.state.notes;
    const valueDue = isUpdate && !this.state.due ? taskDue : this.state.due;

    return (
      <div>
        <Dialog open={isModalOpen} onClose={this.handleClose} fullWidth>
          <DialogTitle id="form-dialog-title">
            {isUpdate ? `Update ${taskTitle}` : "Create new task"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Enter a title for the task. It's required.</DialogContentText>
            <TextField
              autoComplete="off"
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={valueTitle}
              onChange={this.onChangeTitle}
              onKeyUp={this.handleKeyUp}
              fullWidth
            />
            <TextField
              autoComplete="off"
              margin="dense"
              id="notes"
              label="Notes"
              type="text"
              value={valueNotes}
              onChange={this.onChangeNote}
              fullWidth
              multiline
              rowsMax="4"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="dense"
                label="Date"
                clearable
                format="dd/MM/yyyy"
                minDate={new Date()}
                value={valueDue}
                onChange={this.handleDateChange}
              />
            </MuiPickersUtilsProvider>
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
