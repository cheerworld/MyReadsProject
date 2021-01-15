import React from "react";
import { Link } from "react-router-dom";

function ErrorPage404(props) {
  return (
    <div className="errorPage">
      <h1>Error Page 404</h1>
      <h2 className="pageNotFound">
        Page Not Found, Please click thie button below to go back.
      </h2>
      <Link to="/">
        <button className="erroPageBackButton">Back</button>
      </Link>
    </div>
  );
}

export default ErrorPage404;
