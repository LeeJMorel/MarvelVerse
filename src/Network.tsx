import React, { useState } from "react";
import "./App.scss";
import { FilterOption } from "./types";
import SocialPost from "./SocialPost";

interface NetworkProps {
  filter: FilterOption;
}

const Network: React.FC<NetworkProps> = ({ filter }) => {
  //This is for us to build without changing the main view for A3
  const [showSocialPost] = useState(false);

  return (
    <div className="app-body network-container">
      {showSocialPost && <SocialPost />}
      <div className="network-graph-container">
        <div className="title">
          <h2>Network Visualization</h2>
          <p>This is a placeholder for the Network component.</p>
          <p>Current Filter: {filter.label}</p>
        </div>
      </div>
    </div>
  );
};

export default Network;
