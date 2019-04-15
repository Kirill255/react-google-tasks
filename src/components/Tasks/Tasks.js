import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

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

  handleDeleteTask = (id) => () => {
    this.props.deleteTask(id);
  };

  render() {
    return (
      <div>
        <Card className="tasks__card" raised>
          <CardHeader
            title={this.props.title}
            action={
              <IconButton onClick={() => this.props.handleCUTask()}>
                <AddCircleOutline />
              </IconButton>
            }
          />
          {this.props.tasks.length ? (
            <List>
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
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={this.handleDeleteTask(task.id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <>
              <CardContent>
                <Typography align="center" variant="h5">
                  No tasks of this list yet.
                </Typography>
              </CardContent>
            </>
          )}
          <CardActions>
            <Button
              className="tasks__add-button"
              color="primary"
              onClick={() => this.props.handleCUTask()}
            >
              <AddCircleOutline className="tasks__add-button_icon" />
              Create Task
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Tasks;
//  {/* "No tasks of this list found" */}
