import React from "react";

import LoginButton from "../../components/LoginButton/LoginButton";

import "./LoginPage.css";

const LoginPage = ({ handleSignInClick }) => {
  return (
    <div className="login__page">
      <h1>Your Google Tasks!</h1>
      <div className="login__form">
        <h2>Please, Login In!</h2>
        <LoginButton handleSignInClick={handleSignInClick} />
      </div>
    </div>
  );
};

export default LoginPage;
