import React, { Component } from "react";

import LoginPage from "./containers/LoginPage";
import TasksPage from "./containers/TasksPage";
import Loader from "./components/Loader";

import "./App.css";

const googleUserHandler = (googleUser) => {
  const profile = googleUser.getBasicProfile();
  const user = getUserProfile(profile);
  const id_token = googleUser.getAuthResponse().id_token;
  user.id_token = id_token;

  return user;
};

const getUserProfile = (profile) => {
  return {
    id: profile.getId(),
    name: profile.getGivenName(),
    family_name: profile.getFamilyName(),
    full_name: profile.getName(),
    avatar: profile.getImageUrl(),
    email: profile.getEmail()
  };
};

class App extends Component {
  state = {
    loading: false,
    isAuthenticated: false,
    user: null
  };

  componentDidMount() {
    window.addEventListener("google-loaded", this.initClient);
    window.gapi && this.initClient();
  }

  initClient = () => {
    console.log("-- in initClient --");
    this.setState({ loading: true });

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: "AIzaSyDKvF1KEk7XllLfpfhbgv1MmcxaSVgWyeA",
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
          clientId: "365243747034-8bogar38jdern567eimmvs48qqpc7ebi.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/tasks"
        })
        .then(() => {
          // Assign auth2 variable
          this.auth2 = window.gapi.auth2.getAuthInstance();
          this.setState({ loading: false });
          // Listen for sign-in state changes.
          this.auth2.isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(this.auth2.isSignedIn.get());
        })
        .catch(console.log);
    });
  };

  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      this.getUser();
    } else {
      this.setState({ user: null, isAuthenticated: false });
    }
  };

  getUser = () => {
    const user = googleUserHandler(this.auth2.currentUser.get());
    this.setState({ user, isAuthenticated: true });
  };

  handleAuthClick = () => {
    this.auth2.signIn().catch(console.log);
  };

  handleSignoutClick = () => {
    this.auth2.signOut().catch(console.log);
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div className="App">
        {!this.state.isAuthenticated ? (
          <LoginPage handleAuthClick={this.handleAuthClick} />
        ) : (
          <TasksPage handleSignoutClick={this.handleSignoutClick} />
        )}
      </div>
    );
  }
}

export default App;
