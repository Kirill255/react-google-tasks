import React from "react";

import AuthorizeButton from "../components/AuthorizeButton";

import "./LoginPage.css";

const LoginPage = ({ handleAuthClick }) => {
  return (
    <div className="signin__page">
      <h1>Your Google Tasks!</h1>
      <div className="signin__form">
        <h2>Please, Login In!</h2>
        <AuthorizeButton handleAuthClick={handleAuthClick} />
      </div>
    </div>
  );
};

export default LoginPage;
