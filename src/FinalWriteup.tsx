import React from "react";
import "./App.scss";

const FinalWriteup: React.FC = () => {
  const title = "FinalWriteup";
  const paragraph =
    "This is a sample writeup paragraph. Content will appear here when the final is complete.";

  return (
    <div className="app-body writeup">
      <h2>{title}</h2>
      <p>{paragraph}</p>
    </div>
  );
};

export default FinalWriteup;
