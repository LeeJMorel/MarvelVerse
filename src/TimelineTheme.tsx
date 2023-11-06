import { createTimelineTheme } from "react-svg-timeline";
import { FilterOption, filterOptions } from "./types";

const CustomTimelineTheme = (selectedFilter: FilterOption) => {
  // Find the filter object based on the selected filter name
  const selectedFilterOption = filterOptions.find(
    (filter) => filter.label === selectedFilter.label
  );

  const theme = createTimelineTheme({
    base: {
      fontFamily: "Oswald, sans-serif",
      fontFamilyCaption: "Oswald, sans-serif",
    },
    event: {
      markHeight: 20,
      markFillColor: selectedFilterOption
        ? selectedFilterOption.color
        : "#3498db",
      clusterFillColor: "#E74C3C",
    },
    xAxis: {
      labelColor: "#FFFFFF",
    },
    grid: {
      lineColor: "#000000",
    },
    lane: {
      labelFontSize: 16,
      labelColor: "#FFFFFF",
      middleLineColor: selectedFilterOption
        ? selectedFilterOption.color
        : "#DDDDDD",
      middleLineWidth: 3,
    },
    tooltip: {
      backgroundColor: "#2C3E50",
      fontSize: 14,
      fontFamily: "Arial, sans-serif",
    },
    mouseCursor: {
      lineColor: selectedFilterOption ? selectedFilterOption.color : "#3498db",
      lineWidth: 2,
      zoomRangeColor: selectedFilterOption
        ? selectedFilterOption.color
        : "#3498db",
      zoomRangeOpacity: 0.5,
      labelColor: selectedFilterOption ? selectedFilterOption.color : "#3498db",
    },
  });

  return theme;
};

export default CustomTimelineTheme;
