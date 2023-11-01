//filter for both visualizations
export interface FilterOption {
  label: string;
  color: string;
}

export const filterOptions: FilterOption[] = [
  { label: "X-Men", color: "yellow" },
  { label: "Avengers", color: "blue" },
  { label: "Fantastic Four", color: "grey" },
  // Add more options here
];

export type SelectedFilter = {
  selectedGroup: FilterOption;
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
}
