import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { FilterOption } from "./types";

interface FiltersProps {
  filterOptions: FilterOption[];
  onFilterChange: (label: string | null) => void;
  isMobile: boolean; // Pass isMobile from the parent component
}

const Filters: React.FC<FiltersProps> = ({
  filterOptions,
  onFilterChange,
  isMobile,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    "Show All"
  );

  const handleFilterClick = (filter: FilterOption) => {
    if (selectedFilter === filter.label) {
      // Deselect the filter
      setSelectedFilter(null);
      onFilterChange(null);
    } else {
      // Select the filter
      setSelectedFilter(filter.label);
      onFilterChange(filter.label);
    }
  };

  return (
    <div>
      <ButtonGroup
        variant="contained"
        color="primary"
        orientation={isMobile ? "vertical" : "horizontal"}
      >
        {filterOptions.map((option) => (
          <Button
            key={option.label}
            onClick={() => handleFilterClick(option)}
            style={{
              backgroundColor:
                selectedFilter === option.label ? option.color : "transparent",
            }}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default Filters;
