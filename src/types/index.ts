export interface TeamMember {
  name: string;
  role: string;
  id: string;
}

export interface Film {
  id: number;
  type: string;
  name: string;
  release: string;
  year: string;
  poster: string;
  stills: string[];
  team: TeamMember[];
  description: string;
  shortDescription: string;
}

export interface ResponseData {
  films: Film[];
}

export interface SelectDada {
  value: string
  label: string
}
