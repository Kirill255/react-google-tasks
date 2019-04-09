import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./App.css";

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null
  };

  onSignIn = (googleUser) => {
    console.log("onSignIn!!!");
    const user = googleUser && googleUser;
    console.log(user);
    this.setState({ isAuthenticated: true, user });
  };

  onSignInFailure = (error) => {
    console.log("onSignInFailure!!!");
    console.log(error);
  };

  onSignOut = () => {
    this.setState({ isAuthenticated: false, user: null });
  };

  render() {
    console.log(this.state.user && this.state.user.isSignedIn());
    return (
      <div className="App">
        {!this.state.isAuthenticated ? (
          <div className="signin__page">
            <h1>Your Google Tasks!</h1>
            <div className="signin__form">
              <h2>Please, Login In!</h2>
              <GoogleLogin
                clientId={
                  "407265720120-ks2il9jao2ts7320nufeg23u6s67b1oe.apps.googleusercontent.com"
                }
                buttonText="Login"
                onSuccess={this.onSignIn}
                onFailure={this.onSignInFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            </div>
          </div>
        ) : (
          <GoogleLogout
            clientId={"407265720120-ks2il9jao2ts7320nufeg23u6s67b1oe.apps.googleusercontent.com"}
            buttonText="Logout"
            onLogoutSuccess={this.onSignOut}
          />
        )}
      </div>
    );
  }
}

export default App;
