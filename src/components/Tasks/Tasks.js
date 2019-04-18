import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";

import Task from "../Task/Task";

import "./Tasks.css";

class Tasks extends Component {
  render() {
    return (
      <div>
        <Card className="tasks__card" raised>
          <CardHeader
            title={this.props.title}
            action={
              <IconButton onClick={() => this.props.handleModalOpen()}>
                <AddCircleOutline />
              </IconButton>
            }
          />
          {this.props.tasks.length ? (
            <List>
              {this.props.tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  handleUTask={this.props.handleUTask}
                  deleteTask={this.props.deleteTask}
                />
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
              onClick={() => this.props.handleModalOpen()}
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
