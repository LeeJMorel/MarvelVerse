import React from "react";
import "./App.scss";
import { SelectedNetworkFilter } from "./types"; // Import the type

interface NetworkProps {
  filter: SelectedNetworkFilter;
}

const Network: React.FC<NetworkProps> = ({ filter }) => {
  return (
    <div className=".app-body.network-container">
      <h2>Network Visualization</h2>
      <p>This is a placeholder for the Network component.</p>
      <div className="filter-info">
        <p>{filter.placeholder}</p>
      </div>
    </div>
  );
};

export default Network;
