import React, { Component } from "react";
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
    isAuthenticated: false,
    user: null
  };

  componentDidMount() {
    window.addEventListener("google-loaded", this.initClient);
    window.gapi && this.initClient();
  }

  initClient = () => {
    console.log("-- in initClient --");

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
      this.listTaskLists();
    } else {
      this.setState({ user: null, isAuthenticated: false });
    }
  };

  handleAuthClick = () => {
    this.auth2.signIn().catch(console.log);
  };

  handleSignoutClick = () => {
    this.auth2.signOut().catch(console.log);
  };

  getUser = () => {
    const user = googleUserHandler(this.auth2.currentUser.get());
    this.setState({ user, isAuthenticated: true });
  };

  listTaskLists = () => {
    window.gapi.client.tasks.tasklists
      .list({
        maxResults: 10
      })
      .then((response) => {
        console.log("Task Lists:");
        const taskLists = response.result.items;
        if (taskLists && taskLists.length > 0) {
          for (let i = 0; i < taskLists.length; i++) {
            let taskList = taskLists[i];
            console.log(taskList.title + " (" + taskList.id + ")");
          }
        } else {
          console.log("No task lists found.");
        }
      });
  };

  render() {
    return (
      <div className="App">
        {!this.state.isAuthenticated ? (
          <div className="signin__page">
            <h1>Your Google Tasks!</h1>
            <div className="signin__form">
              <h2>Please, Login In!</h2>
              <div
                id="authorize_button"
                className="customGPlusSignIn"
                onClick={this.handleAuthClick}
              >
                <span className="icon" />
                <span className="buttonText">Google</span>
              </div>
            </div>
          </div>
        ) : (
          <button
            id="signout_button"
            style={{ width: 200, height: 50, textAlign: "center" }}
            onClick={this.handleSignoutClick}
          >
            Sign Out
          </button>
        )}
      </div>
    );
  }
}

export default App;
