import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { SelectedFilter, FilterOption, filterOptions } from "./types";

interface FiltersProps {
  onFilterChange: (filter: SelectedFilter) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );

  const handleFilterClick = (filter: FilterOption) => {
    setSelectedFilter(filter);
    onFilterChange({ selectedGroup: filter });
  };

  return (
    <div>
      <ButtonGroup variant="contained" color="primary">
        {filterOptions.map((option) => (
          <Button
            key={option.label}
            onClick={() => handleFilterClick(option)}
            style={{
              backgroundColor:
                selectedFilter === option ? option.color : "transparent",
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
