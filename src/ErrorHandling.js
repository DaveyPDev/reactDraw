import React from "react";
import "./ErrorHandling.css"; 

function ErrorHandling({ errorMessage }) {
  return (
    <div className="ErrorHandling">
      {errorMessage && <div className="Error-message">{errorMessage}</div>}
    </div>
  );
}

export default ErrorHandling;
