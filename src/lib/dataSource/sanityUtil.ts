import {createClient} from "next-sanity";
import {env} from "~/env";

const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
    apiVersion: "2023-05-03",
    dataset: env.NEXT_PUBLIC_SANITY_STUDIO_ENVIRONMENT,
    useCdn: false,
});

// Get Jargon Data
export async function getSanityData() {
    const query = `*[_type == 'jargon'] {
        acronym,
        definition,
        term,
        category,
        isPublished
    }`

    return await client.fetch(query)
}