import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AddIcon from "@material-ui/icons/Add";

import "./TaskLists.css";

class TaskLists extends Component {
  handleClick = (id) => () => {
    this.props.listTasksOfList(id);
  };

  render() {
    return (
      <div>
        <List subheader={<ListSubheader component="div">Task Lists</ListSubheader>}>
          {this.props.taskLists.map((task, index) => (
            <ListItem button key={task.id} onClick={this.handleClick(task.id)}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={task.title} />
            </ListItem>
          ))}

          <ListItem button key={"Create new list"}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Create new list"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default TaskLists;
