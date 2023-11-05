import React from "react";
import "./App.scss";
import { SelectedFilter } from "./types";
import { Timeline as SVGTimeline } from "react-svg-timeline";
import marbleData from "./data/marvel_comic_filtered.json";

interface TimelineProps {
  filter: SelectedFilter;
}

const comicsEvents = marbleData.map((comic) => ({
  eventId: comic.issue_title,
  tooltip: comic.issue_description,
  laneId: comic.Grouping,
  startTimeMillis: parseDateToMillis(comic.publish_date),
  endTimeMillis: parseDateToMillis(comic.publish_date) + 100000000,
}));

const comicAbbreviationMap = {
  AVE: "Avengers",
  SPI: "Spiderman",
  XM: "X-Men",
  FF: "Fantastic Four",
  MS: "Midnight Sons",
  DEF: "Defenders",
};

const lanes = Object.entries(comicAbbreviationMap).map(([key, value]) => ({
  laneId: key.toString(),
  label: value,
}));
console.log(lanes);

function parseDateToMillis(dateString) {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const month = months[parts[1]];
  let year = parseInt(parts[2], 10);

  if (year < 30) {
    year += 2000;
  } else {
    year += 1900;
  }
  const date = new Date(year, month, day);
  return date.getTime();
}
const dateFormat = (ms: number) => new Date(ms).toLocaleString();

const Timeline: React.FC<TimelineProps> = ({ filter }) => {
  return (
    <div className="app-body graph-container">
      <h2>Timeline Visualization</h2>
      <SVGTimeline
        width={600}
        height={300}
        events={comicsEvents}
        lanes={lanes}
        dateFormat={dateFormat}
      />
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
