//filter for both visualizations
export interface FilterOption {
  label: string;
  color: string;
}

export const defaultFilter = { label: "Show All", color: "black" };

export const filterOptions: FilterOption[] = [
  { label: "Avengers", color: "blue" },
  { label: "Spiderman", color: "#b00e13" },
  { label: "X-Men", color: "#ff9f00" },
  { label: "Fantastic Four", color: "grey" },
  { label: "Midnight Sons", color: "purple" },
  { label: "Defenders", color: "green" },
  { label: "Show All", color: "black" },
];

export const comicAbbreviationMap = {
  AVE: "Avengers",
  SPI: "Spiderman",
  XM: "X-Men",
  FF: "Fantastic Four",
  MS: "Midnight Sons",
  DEF: "Defenders",
};

export interface SocialPostProps {
  username: string;
  profile?: string;
  comicsCount: number;
  followersCount: number;
  followingList: string[];
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
