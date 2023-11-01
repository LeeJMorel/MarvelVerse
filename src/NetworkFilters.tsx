import React from "react";
import { SelectedNetworkFilter } from "./types";

interface NetworkFiltersProps {
  onFilterChange: (filter: SelectedNetworkFilter) => void;
}

const NetworkFilters: React.FC<NetworkFiltersProps> = () => {
  return (
    <div className="filter-container">
      <h2>coming in Final Project</h2>
    </div>
  );
};

export default NetworkFilters;
