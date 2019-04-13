import React from "react";

import "./LoginButton.css";

const LoginButton = ({ handleSignInClick }) => {
  return (
    <div className="login__button" onClick={handleSignInClick}>
      <span className="login__button_icon" />
      <span className="login__button_text">Google</span>
    </div>
  );
};

export default LoginButton;
