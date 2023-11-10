import React, { useState } from "react";
import "./App.scss";
import { FilterOption } from "./types";
import SocialPost from "./SocialPost";

interface NetworkProps {
  filter: FilterOption;
}

const Network: React.FC<NetworkProps> = ({ filter }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSocialPost, setShowSocialPost] = useState(false);
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
