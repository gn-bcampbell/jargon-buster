import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {createClient} from "next-sanity";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const client = createClient({
    projectId: 'uerd2g5j',
    apiVersion: "2023-05-03",
    dataset: "production",
    useCdn: false,
});
