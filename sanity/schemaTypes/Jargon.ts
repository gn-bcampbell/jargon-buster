export const Jargon = {
    name: 'jargon',
    title: 'Jargon',
    type: 'document',
    fields: [
        {
            name: 'isPublished',
            type: 'boolean',
            title: 'Set to true when document is ready to go live',
        },
        {
            name: 'acronym',
            type: 'string',
        },
        {
            name: 'category',
            type: 'string',
        },
        {
            name: 'term',
            type: 'string',
        },
        {
            name: 'definition',
            type: 'string',
        },
    ],
}