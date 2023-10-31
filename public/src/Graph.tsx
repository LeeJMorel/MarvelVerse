import React from "react";
import "./App.scss";
import { SelectedGraphFilter } from "./types"; // Import the type

interface GraphProps {
  filter: SelectedGraphFilter;
}

const Graph: React.FC<GraphProps> = ({ filter }) => {
  return (
    <div className="app-body graph-container">
      <h2>Graph Visualization</h2>
      <p>This is a placeholder for the Graph component.</p>
      <div className="filter-info">
        <h3>Current Filter:</h3>
        <p>
          <strong>Year Start:</strong> {filter.yearStart}
        </p>
        <p>
          <strong>Year End:</strong> {filter.yearEnd}
        </p>
        <p>
          <strong>Comic:</strong> {filter.comic}
        </p>
        <p>
          <strong>View By:</strong> {filter.viewBy}
        </p>
        <p>
          <strong>View By Value:</strong> {filter.viewByValue}
        </p>
      </div>
    </div>
  );
};

export default Graph;
