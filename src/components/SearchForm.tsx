"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "~/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "~/components/ui/form"
import {Input} from "~/components/ui/input"
import React, {useState} from "react";
import {DefinitionCard} from "~/components/DefinitionCard";

const FormSchema = z.object({
    filterText: z.string().min(0, {
        message: "Username must be at least 2 characters.",
    }),
})

type SearchItem = {
    category: string,
    term: string,
    acronym: string,
    definition: string,
}[]

const searchItems: SearchItem = [
    {
        category: 'Jargon',
        term: 'Actual Billing Rate',
        acronym: 'ABR',
        definition: 'The hourly rate to be billed to the customer. Should aim to be greater than or equal to the IBR (Internal Billing Rate). '
    },
    {
        category: 'Jargon',
        term: 'Test Rate',
        acronym: 'TEST',
        definition: 'This is a test and should be ignored. '
    },
    {
        category: 'Jargon',
        term: 'Assignment Manager',
        acronym: 'AM',
        definition: 'Primary point of contact for a specific project or assignment.'
    },
    {
        category: 'Tech',
        term: 'Proof of Concept',
        acronym: 'PoC',
        definition: 'A demonstration of a design, concept, or proposal for how a system or idea may operate.'
    },
    {
        category: 'Tech',
        term: 'Proof of testing',
        acronym: 'test',
        definition: 'A second definition for testing purposes'
    },
]

let viableSearchResults: SearchItem = []

export function SearchForm() {

    const [searchTerm, setSearchTerm] = useState("");
    const [isMatchingTerm, setIsMatchingTerm] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            filterText: "",
        },
    })

    const searchDefinitions = (filterText: string) => {

        searchItems.forEach(({category, term, acronym, definition}) => {
            if (filterText === '') {
                setIsMatchingTerm(false)
                return;
            }

            if (term.toLowerCase().includes(filterText)) {
                viableSearchResults.push({category, term, acronym, definition});
            } else {
                // TODO: Add in optional window pane to request / ask for definition
                console.log('Not here')
            }
        })

        setIsMatchingTerm(viableSearchResults.length > 0)
    }

    const onSubmit = () => {
        // TODO: probably just remove this or combine with searchDefinitions()
        viableSearchResults = [] //stop the list being permanently added to.
        searchDefinitions(searchTerm.toLowerCase())
    }

    return (
        <>
            {/* TODO: styling*/}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="filterText"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Search</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder="Enter your search"
                                           value={searchTerm}
                                           onChange={e => {
                                               setIsMatchingTerm(false)
                                               setSearchTerm(e.target.value)
                                           }}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    <Button type="submit" variant={"outline"} className="text-black">Submit</Button>
                </form>
            </Form>
            {isMatchingTerm &&
                viableSearchResults.map((result, i) => (
                    <div key={i}>
                        <DefinitionCard
                            category={result.category}
                            term={result.term}
                            acronym={result.acronym}
                            definition={result.definition}/>
                    </div>
                ))
            }
        </>
    )
}
