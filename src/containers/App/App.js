import React, { Component } from "react";

import LoginPage from "../LoginPage/LoginPage";
import TasksPage from "../TasksPage/TasksPage";
import Loader from "../../components/Loader/Loader";

import apiAuth from "../../api/auth";

import "./App.css";

class App extends Component {
  state = {
    loading: true,
    isAuthenticated: false
  };

  componentDidMount() {
    window.gapi.load("client:auth2", this.checkInitClient);
  }

  checkInitClient = () => {
    apiAuth.initClient().then(() => {
      apiAuth.auth2.isSignedIn.listen(this.updateSigninStatus);
      this.updateSigninStatus(apiAuth.isSignedIn());
    });
  };

  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      this.setState({ loading: false, isAuthenticated: true });
    } else {
      this.setState({ loading: false, isAuthenticated: false });
    }
  };

  handleSignInClick = () => {
    apiAuth.signIn();
  };

  handleSignoutClick = () => {
    apiAuth.signOut();
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div className="App">
        {!this.state.isAuthenticated ? (
          <LoginPage handleSignInClick={this.handleSignInClick} />
        ) : (
          <TasksPage handleSignoutClick={this.handleSignoutClick} />
        )}
      </div>
    );
  }
}

export default App;
