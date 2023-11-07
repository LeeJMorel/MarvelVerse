/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./App.scss";
import { FilterOption, comicAbbreviationMap } from "./types";
import { Timeline as SVGTimeline } from "react-svg-timeline";
import marvelComicData from "./data/marvel_comic_filtered.json";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import CustomTimelineTheme from "./TimelineTheme";

interface TimelineProps {
  filter: FilterOption;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const comicsEvents = (marvelComicData as any[])
  .filter((comic) => comic.Grouping) // Filter out records with empty Grouping
  .map((comic) => ({
    eventId: comic.issue_title,
    tooltip: comic.issue_description,
    laneId: comic.Grouping,
    startTimeMillis: parseDateToMillis(comic.publish_date),
    endTimeMillis: parseDateToMillis(comic.publish_date) + 100000000,
  }));

const lanes = Object.entries(comicAbbreviationMap).map(([key, value]) => ({
  laneId: key.toString(),
  label: value,
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
  function filterComicDataByGrouping(comicData, filterName) {
    const groupingKey = Object.keys(comicAbbreviationMap).find(
      (key) => comicAbbreviationMap[key] === filterName
    );

    if (!groupingKey) {
      // If the filter name is not found, return an empty array or handle it as needed.
      return [];
    }

    return comicData.filter((comic) => comic.Grouping === groupingKey);
  }
  const filteredAvengersComics = filterComicDataByGrouping(
    marvelComicData,
    filter.label
  );

  // Get unique comic names
  const uniqueComicNames = Array.from(
    new Set((filteredAvengersComics as any[]).map((comic) => comic.comic_name))
  );

  // Create lanes for each unique comic name
  const seriesLanes = uniqueComicNames.map((comicName) => ({
    laneId: comicName,
    label: comicName,
  }));

  // Create events for each issue title within the corresponding lane
  const events = (marvelComicData as any[])
    .filter((comic) => comic.Grouping) // Filter out records with empty Grouping
    .map((comic) => ({
      eventId: comic.issue_title, // Use issue title as eventId
      startTimeMillis: parseDateToMillis(comic.publish_date),
      endTimeMillis: parseDateToMillis(comic.publish_date) + 100000000,
      laneId: comic.comic_name, // Assign the corresponding comic name as the lane
      tooltip: comic.issue_title, // Display issue title on hover
    }));

  return (
    <div className="app-body graph-container">
      <h2>Comic series Marvel has published over time</h2>
      <h5>For comic series lasting longer than 5 years</h5>
      {filter.label === "Show All" ? (
        <AutoSizer>
          {({ width, height }: Size) => (
            <SVGTimeline
              width={width}
              height={height}
              events={comicsEvents}
              lanes={lanes}
              dateFormat={dateFormat}
              enableEventClustering={true}
              theme={CustomTimelineTheme(filter)}
            />
          )}
        </AutoSizer>
      ) : (
        <AutoSizer>
          {({ width, height }: Size) => (
            <SVGTimeline
              width={width}
              height={height}
              events={events}
              lanes={seriesLanes}
              dateFormat={dateFormat}
              theme={CustomTimelineTheme(filter)}
            />
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default Timeline;
