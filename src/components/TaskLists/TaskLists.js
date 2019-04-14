import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ViewList from "@material-ui/icons/ViewList";
// import Code from "@material-ui/icons/Code";
import Info from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { GithubCircle, CalendarCheck } from "mdi-material-ui";

import "./TaskLists.css";

class TaskLists extends Component {
  state = {
    anchorEl: null,
    openedMenuIdOfTaskList: null
  };

  handleListTasksOfList = (id) => (event) => {
    this.props.listTasksOfList(id);
  };

  handleMenuClick = (id) => (event) => {
    this.setState({ anchorEl: event.currentTarget, openedMenuIdOfTaskList: id });
  };

  handleMenuClose = (event) => {
    this.setState({ anchorEl: null, openedMenuIdOfTaskList: null });
  };

  handleDeleteTaskList = (event) => {
    this.props.deleteTaskList(this.state.openedMenuIdOfTaskList);
    this.handleMenuClose();
  };

  handleEditTaskList = (event) => {
    this.props.editTaskList(this.state.openedMenuIdOfTaskList);
    this.handleMenuClose();
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <List subheader={<ListSubheader component="div">Task Lists</ListSubheader>}>
          {this.props.taskLists.map((taskList) => (
            <ListItem button key={taskList.id} onClick={this.handleListTasksOfList(taskList.id)}>
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText primary={taskList.title} />

              <ListItemSecondaryAction>
                <IconButton
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenuClick(taskList.id)}
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem onClick={this.handleEditTaskList}>Edit</MenuItem>
                  <MenuItem onClick={this.handleDeleteTaskList}>Delete</MenuItem>
                </Menu>
              </ListItemSecondaryAction>
            </ListItem>
          ))}

          <ListItem button key={"Create new list"} onClick={this.props.handleModalOpen}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Create new list"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={"About"}>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
          <ListItem
            button
            key={"View Source on GitHub"}
            onClick={() => window.open("https://github.com/Kirill255/react-google-tasks")}
          >
            <ListItemIcon>
              <GithubCircle />
            </ListItemIcon>
            <ListItemText primary={"View Source on GitHub"} />
          </ListItem>
          <ListItem
            button
            key={"Original Site"}
            onClick={() => window.open("https://mail.google.com/tasks/canvas?pli=1")}
          >
            <ListItemIcon>
              <CalendarCheck />
            </ListItemIcon>
            <ListItemText primary={"Original Site"} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default TaskLists;
