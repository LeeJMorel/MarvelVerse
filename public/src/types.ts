//filters selected for graph visualization
export interface SelectedGraphFilter {
  yearStart: number;
  yearEnd: number;
  comic: string;
  viewBy: "character" | "creator";
  viewByValue: string;
}

export interface SelectedNetworkFilter {
  placeholder: "I'll have data soon!";
}

export interface ComicAppearance {
  marvel_comic_character_name: string;
  comic_appearance_1?: string;
  comic_appearance_2?: string;
  comic_appearance_3?: string;
  comic_appearance_4?: string;
  comic_appearance_5?: string;
  comic_appearance_6?: string;
  comic_appearance_7?: string;
  comic_appearance_8?: string;
  comic_appearance_9?: string;
  comic_appearance_10?: string;
  comic_appearance_11?: string;
  comic_appearance_12?: string;
  comic_appearance_13?: string;
  comic_appearance_14?: string;
  comic_appearance_15?: string;
  comic_appearance_16?: string;
  comic_appearance_17?: string;
  comic_appearance_18?: string;
  comic_appearance_19?: string;
  comic_appearance_20?: string;
  comic_appearance_21?: string;
  comic_appearance_22?: string;
  comic_appearance_23?: string;
  comic_appearance_24?: string;
  comic_appearance_25?: string;
  comic_appearance_26?: string;
  comic_appearance_27?: string;
  comic_appearance_28?: string;
  comic_appearance_29?: string;
  comic_appearance_30?: string;
  comic_appearance_31?: string;
  comic_appearance_32?: string;
  comic_appearance_33?: string;
  comic_appearance_34?: string;
  comic_appearance_35?: string;
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

// added
export interface MarvelComic {
  id?: number;
  digitalId?: number;
  title?: string;
  issueNumber?: number;
  variantDescription?: string;
  description?: string;
  modified?: Date;
  isbn?: string;
  upc?: string;
  diamondCode?: string;
  ean?: string;
  issn?: string;
  format?: string;
  pageCount?: number;
  textObjects?: Array<string>
  resourceURI?: string;
  urls?: Array<string>
  //series?: MarvelSeriesSummary;
  variants?: Array<string>
  collections?: Array<string>
  collectedIssues?: Array<string>
  dates?: Array<string>
  prices?: Array<string>
  //thumbnail?: MarvelImage;
  images?: Array<string>
  //creators?: MarvelCreatorList;
  //characters?: MarvelCharacterList;
  //stories?: MarvelStoryList;
  //events?: MarvelEventList;
}