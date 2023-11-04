import React from "react";
import "./App.scss";
import { SelectedFilter } from "./types";
import { Timeline as SVGTimeline } from "react-svg-timeline";
// import marbleData from "./data/comics_filtered.json";

interface TimelineProps {
  filter: SelectedFilter;
}

const marbleData = [
  {
    comic_name: "Marvel Mystery Comics (1939 - 1949)",
    active_years: "(1939 - 1949)",
    issue_title: "Marvel Mystery Comics (1939) #2",
    publish_date: "1-Dec-39",
    issue_description:
      "A historic comic series dating all the way back to 1939! Featuring the Human Torch, the Sub-Mariner and more, this one's sure to thrill any Marvel comic buff!",
    penciler: "Al Anders, Carl Burgos, Bill Everett, Ben Thompson",
    writer: "Ben Thompson, Paul Gustavson, Al Anders, Carl Burgos",
    cover_artist: "None",
    Imprint: "None",
    Format: "Comic",
    Rating: "None",
    Price: "Free",
  },
  {
    comic_name: "Marvel Mystery Comics (1939 - 1949)",
    active_years: "(1939 - 1949)",
    issue_title: "Marvel Mystery Comics (1939) #3",
    publish_date: "1-Jan-40",
    issue_description:
      "A collection of epic stories featuring Human Torch in an alien invasion, Angel infiltrating a mind-bogglingly passionate cult and MUCH MORE!",
    penciler: "Al Anders, Carl Burgos, Bill Everett, Ben Thompson",
    writer: "Al Anders, Carl Burgos, Bill Everett, Ben Thompson",
    cover_artist: "None",
    Imprint: "None",
    Format: "Comic",
    Rating: "None",
    Price: "Free",
  },
  {
    comic_name: "Marvel Mystery Comics (1939 - 1949)",
    active_years: "(1939 - 1949)",
    issue_title: "Marvel Mystery Comics (1939) #4",
    publish_date: "1-Feb-40",
    issue_description:
      "A collection of classics starring Marvel's now iconic Golden Age heroes! The Human Torch first adopts the name of Jim Hammond, and Namor the Sub-Mariner clashes with a Nazi U-boat for the first time!",
    penciler:
      "Stockbridge Winslow, Bill Everett, Steve Dahlman, Paul Gustavson",
    writer: "Ben Thompson, Al Anders, Carl Burgos, Stockbridge Winslow",
    cover_artist: "None",
    Imprint: "None",
    Format: "Comic",
    Rating: "None",
    Price: "Free",
  },
];

const comicsEvents = marbleData.map((comic, index) => ({
  eventId: comic.issue_title, // or some other unique identifier
  tooltip: comic.issue_description,
  laneId: index,
  startTimeMillis: parseDateToMillis(comic.publish_date),
  endTimeMillis: parseDateToMillis(comic.publish_date) + 1000000000,
}));

const lanes = comicsEvents.map((comic) => ({
  laneId: comic.laneId,
  label: comic.eventId,
}));

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
