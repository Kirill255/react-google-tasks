import React from "react";
import "./AuthorizeButton.css";

const AuthorizeButton = ({ handleAuthClick }) => {
  return (
    <div id="authorize_button" className="customGPlusSignIn" onClick={handleAuthClick}>
      <span className="icon" />
      <span className="buttonText">Google</span>
    </div>
  );
};

export default AuthorizeButton;
