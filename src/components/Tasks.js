import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

import "./Tasks.css";

class Tasks extends Component {
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

  render() {
    return (
      <div>
        {this.props.tasks.length ? (
          <List className="tasks__container">
            {this.props.tasks.map((task) => (
              <ListItem
                key={task.id}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(task.id)}
              >
                <Checkbox
                  checked={this.state.checked.indexOf(task.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={task.title} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          "No tasks of this list found"
        )}
      </div>
    );
  }
}

export default Tasks;
