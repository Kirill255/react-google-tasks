import React, { Component } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
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

  handleDeleteTask = (id) => () => {
    this.props.deleteTask(id);
  };

  render() {
    return (
      <ListItem dense button onClick={this.handleToggle(this.props.id)}>
        <Checkbox
          checked={this.state.checked.indexOf(this.props.id) !== -1}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={this.props.title} />
        <ListItemSecondaryAction>
          <IconButton>
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
