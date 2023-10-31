import { useEffect, useState } from "react";
import {
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { SelectedGraphFilter, ComicData } from "./types";

interface GraphFiltersProps {
  onFilterChange: (filter: SelectedGraphFilter) => void;
}

const GraphFilters: React.FC<GraphFiltersProps> = ({ onFilterChange }) => {
  //These populate the slider data with years published
  type YearMark = {
    value: number;
    label: string;
  };
  const [yearMarks, setYearMarks] = useState<YearMark[]>([]);

  //this populates the select dropdown with the unique names of comics, reducing to series
  const [comicSeries, setComicSeries] = useState<string[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<SelectedGraphFilter>({
    yearStart: 1939,
    yearEnd: 2023,
    comic: "",
    viewBy: "character",
    viewByValue: "",
  });

  function getFullYear(dateString: string): number {
    const yearStr = dateString.split("-")[1];
    let year = parseInt(yearStr, 10);
    if (year >= 0 && year <= 21) {
      // Assuming 2021 is the cut-off year for 21st century
      year += 2000;
    } else {
      year += 1900;
    }
    return year;
  }

  useEffect(() => {
    fetch("/src/data/comics.json")
      .then((response) => response.json())
      .then((jsonData: ComicData[]) => {
        const uniqueComics = [
          ...new Set(jsonData.map((comic) => comic.comic_name)),
        ];
        setComicSeries(uniqueComics);

        const uniqueYears = [
          ...new Set(jsonData.map((comic) => getFullYear(comic.publish_date))),
        ];
        const sortedYears = uniqueYears.sort((a, b) => a - b);

        const marks = sortedYears.map((year) => ({
          value: year,
          label: String(year),
        }));
        setYearMarks(marks);

        setSelectedFilter((prev) => ({
          ...prev,
          yearStart: sortedYears[0],
          yearEnd: sortedYears[sortedYears.length - 1],
        }));
      });
  }, []);

  const handleFilterChange = (filter: Partial<SelectedGraphFilter>) => {
    const updatedFilter = { ...selectedFilter, ...filter };
    setSelectedFilter(updatedFilter);
    onFilterChange(updatedFilter);
  };

  return (
    <div className="filter-container">
      <div>
        <Slider
          value={[selectedFilter.yearStart, selectedFilter.yearEnd]}
          onChange={(_, newValue) =>
            handleFilterChange({
              yearStart: (newValue as number[])[0],
              yearEnd: (newValue as number[])[1],
            })
          }
          valueLabelDisplay="auto"
          min={yearMarks[0]?.value || 1939}
          max={yearMarks[yearMarks.length - 1]?.value || 2023}
          marks={yearMarks}
        />
      </div>
      <div>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="comic-series-select-label">
            Selected Comic Series
          </InputLabel>
          <Select
            labelId="comic-series-select-label"
            id="comic-series-select"
            value={selectedFilter.comic}
            label="Selected Series"
            onChange={(e) =>
              handleFilterChange({ comic: e.target.value as string })
            }
          >
            {comicSeries.map((comic) => (
              <MenuItem key={comic} value={comic}>
                {comic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default GraphFilters;
