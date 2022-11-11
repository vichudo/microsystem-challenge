import { SetStateAction } from "react";
import { Dispatch } from "react";

export type LayoutProps = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  current: string | undefined;
  data_characters?: { [key: string]: Character[] };
  data_episodes?: { [key: string]: Episode[] };
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
};

export type Location = {
  name: string;
  url: string;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
};

export type DisplayEpisodesType = {
  data: { [key: string]: Episode[] };
  search: string | null | undefined;
  page?: string | number;
};

export type DisplayCharactersType = {
  data: { [key: string]: Character[] };
  search: string | null | undefined;
  page?: string | number;
};

type PaginatedCharacters = {
  [key: number | string]: Character[];
};
