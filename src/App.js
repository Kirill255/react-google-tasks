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
    window.addEventListener("google-loaded", this.renderGoogleLoginButton);
    window.gapi && this.renderGoogleLoginButton();
  }

  renderGoogleLoginButton = () => {
    console.log("-- in renderGoogleLoginButton --");

    window.gapi.load("auth2", () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2
          .init({
            client_id: "407265720120-ks2il9jao2ts7320nufeg23u6s67b1oe.apps.googleusercontent.com"
          })
          .then((auth2) => {
            // window.auth2 = auth2;
            // console.log(window.auth2.isSignedIn.get());

            auth2.isSignedIn.listen((val) => {
              // console.log(val);
              if (val) {
                const user = googleUserHandler(auth2.currentUser.get());
                this.setState({ user, isAuthenticated: true });
              } else {
                this.setState({ user: null, isAuthenticated: false });
              }
            });

            if (auth2.isSignedIn.get()) {
              const user = googleUserHandler(auth2.currentUser.get());

              this.setState({ user, isAuthenticated: true });
              return;
            }

            auth2.attachClickHandler(
              document.getElementById("customBtn"),
              {},
              (googleUser) => {
                // console.log(googleUser);
                // const user = googleUserHandler(googleUser);
                // this.setState({ user, isAuthenticated: true });
              },
              (err) => console.log(err)
            );
          })
          .catch((err) => console.log("auth2: ", err));
      }
    });
  };

  logout = () => {
    console.log("-- in logout --");

    let auth2 = window.gapi && window.gapi.auth2.getAuthInstance();
    // console.log(auth2);

    if (auth2) {
      if (auth2.isSignedIn.get()) {
        auth2
          .signOut()
          .then(() => {
            // this.setState({ user: null, isAuthenticated: false });
            console.log("Logged out successfully");
          })
          .catch((err) => {
            console.log("signOut: ", err);
          });
      }
    } else {
      console.log("Error while logging out");
    }
  };

  render() {
    return (
      <div className="App">
        {!this.state.isAuthenticated ? (
          <div className="signin__page">
            <h1>Your Google Tasks!</h1>
            <div className="signin__form">
              <h2>Please, Login In!</h2>
              <div id="customBtn" className="customGPlusSignIn">
                <span className="icon" />
                <span className="buttonText">Google</span>
              </div>
            </div>
          </div>
        ) : (
          <button style={{ width: 200, height: 50, textAlign: "center" }} onClick={this.logout}>
            Logout
          </button>
        )}
      </div>
    );
  }
}

export default App;
