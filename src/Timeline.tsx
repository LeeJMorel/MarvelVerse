import React from "react";
import "./App.scss";
import { SelectedFilter } from "./types";

interface TimelineProps {
  filter: SelectedFilter;
}

const Timeline: React.FC<TimelineProps> = ({ filter }) => {
  return (
    <div className="app-body graph-container">
      <h2>Timeline Visualization</h2>
      <p>This is a placeholder for the Timeline component.</p>
      <div className="filter-info">
        <h3>Current Filter:</h3>
        <p>
          <strong>Selected Group:</strong> {filter.selectedGroup.label}
        </p>
      </div>
    </div>
  );
};

export default Timeline;
