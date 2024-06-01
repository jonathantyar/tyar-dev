export interface schema {
  bio: bio;
  experience: experience[],
  projects: project[],
  social: social[],
}

export interface bio {
  name: string;
  tagline: string;
  introduction: string;
  bio: string;
  resume: string;
  photo: {
    id: string;
  };
  keywords: string[];
}

export interface experience {
  position: string;
  company: string;
  company_website: string | null;
  present: boolean;
  date_start: string;
  date_end: string;
  skills: string[];
  detail: string;
}

export interface project {
  name: string;
  cover: {
    id: string;
  };
  project_link: string | null;
  detail: string;
  skills: string[];
  people: string[];
}

export interface social {
  icon: string;
  name: string;
  link: string;
}