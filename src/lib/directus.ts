import { schema } from '@/types/cms';
import { createDirectus, graphql } from '@directus/sdk';

console.log('api endpoint', process.env.API_ENDPOINT)
const directus = createDirectus<schema>(process.env.API_ENDPOINT).with(graphql());

export default directus;