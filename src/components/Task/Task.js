import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DateRange from "@material-ui/icons/DateRange";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

import "./Task.css";

export default class Task extends Component {
  state = {
    checked: [0]
  };

  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  handleUpdateTask = (id) => () => {
    this.props.handleUTask(id);
  };

  handleDeleteTask = (id) => () => {
    this.props.deleteTask(id);
  };

  render() {
    return (
      <ListItem className="task__item" dense button onClick={this.handleToggle(this.props.id)}>
        <Checkbox
          checked={this.state.checked.indexOf(this.props.id) !== -1}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText disableTypography className="task__item_text">
          <Typography variant="h6" gutterBottom color="textPrimary">
            {this.props.title}
          </Typography>
          {this.props.notes && (
            <Typography gutterBottom color="textSecondary">
              {this.props.notes}
            </Typography>
          )}
          {this.props.due && (
            <Chip
              icon={<DateRange />}
              label={this.props.due}
              className="task__item_chip"
              variant="outlined"
            />
          )}
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={this.handleUpdateTask(this.props.id)}>
            <Edit />
          </IconButton>
          <IconButton onClick={this.handleDeleteTask(this.props.id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
