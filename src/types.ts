//filter for both visualizations
export interface FilterOption {
  label: string;
  color: string;
}

export const filterOptions: FilterOption[] = [
  { label: "Avengers", color: "blue" },
  { label: "Spiderman", color: "red" },
  { label: "X-Men", color: "yellow" },
  { label: "Fantastic Four", color: "grey" },
  { label: "Midnight Sons", color: "purple" },
  { label: "Defenders", color: "green" },
  { label: "Show All", color: "white" },
];

export const comicAbbreviationMap = {
  AVE: "Avengers",
  SPI: "Spiderman",
  XM: "X-Men",
  FF: "Fantastic Four",
  MS: "Midnight Sons",
  DEF: "Defenders",
};

//just a placeholder
export interface SelectedNetworkFilter {
  placeholder: "I'll have data soon!";
}

export interface ComicData {
  comic_name: string;
  active_years: string;
  issue_title: string;
  publish_date: string;
  issue_description: string;
  penciler: string;
  writer: string;
  cover_artist: string;
  Imprint: string;
  Format: string;
  Rating: string;
  Price: string;
  Grouping?: string;
  Event?: string;
}
