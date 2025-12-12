import { createDirectus, graphql, staticToken } from '@directus/sdk';

interface File {
  id: string;
}

interface Bio {
  name: string;
  tagline: string;
  bio: string;
  introduction: string;
  photo: File;
  resume: string;
  keywords: string[];
}

interface Social {
  name: string;
  link: string;
  icon: string;
}

interface Experience {
  position: string;
  company: string;
  company_website: string;
  present: boolean;
  date_start: string;
  date_end: string;
  skills: string[] | null;
  detail: string;
}

interface Project {
  name: string;
  cover: File;
  detail: string;
  project_link: string;
  skills: string[] | null;
  people: string[] | null;
}

// The overall schema of the Directus instance if strictly typed, 
// but for 'query' we often define the return type inline or just use generic.
interface Schema {
  bio: Bio;
  social: Social[];
  experience: Experience[];
  projects: Project[];
}

const directusUrl = process.env.API_ENDPOINT || 'http://localhost:8055';
const directusToken = process.env.DIRECTUS_TOKEN;

// Initialize the SDK with optional token
const client = createDirectus<Schema>(directusUrl);

if (directusToken) {
  client.with(staticToken(directusToken));
}

export const directus = client.with(graphql());

export async function getData() {
  try {
    const result = await directus.query<Schema>(`
      query {
        bio {
          name
          tagline
          bio
          introduction
          photo {
            id
          }
          resume
          keywords
        }
        experience(sort: ["-date_start"]) {
          position
          company
          company_website
          present
          date_start
          date_end
          skills
          detail
        }
        projects {
          name
          cover {
            id
          }
          detail
          project_link
          skills
          people
        }
      }`);
    return result;
  } catch (error) {
    // Log the error structure to help debugging
    console.error('Failed to fetch Directus data:', JSON.stringify(error, null, 2));
    const err = error as any;
    if (err.errors) {
      console.error('GraphQL Errors:', err.errors);
    }
    throw new Error('Failed to fetch data');
  }
}


// experience(sort: ["-date_start"]) {
//   position
//   company
//   company_website
//   present
//   date_start
//   date_end
//   skills
//   detail
// }
// projects {
//   name
//   cover {
//     id
//   }
//   detail
//   project_link
//   skills
//   people
// }