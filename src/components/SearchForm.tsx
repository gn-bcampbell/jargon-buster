"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {motion} from "framer-motion";

import {Button} from "~/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form"
import {Input} from "~/components/ui/input"
import React, {useState} from "react";
import {DefinitionCard} from "~/components/DefinitionCard";
import {SheetData} from "~/app/helpers/excelSheets";

// Motion animation
const getAnimationProps = (delay = 0) => ({
    initial: {opacity: 0, y: -50}, // Start with opacity 0 and positioned 50px above its final position
    animate: {opacity: 1, y: 0}, // Animate to opacity 1 and its final position
    transition: {duration: 1, delay} // Animation duration of 1 second, with a delay based on the index
});

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
    {
        category: 'Tech',
        term: 'Proof of testing some more',
        acronym: 'test',
        definition: 'A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.A third definition for testing purposes, but this is longer.'
    },
]

let viableSearchResults: SearchItem = []

export function SearchForm() {

    const [searchTerm, setSearchTerm] = useState("");
    const [isMatchingTerm, setIsMatchingTerm] = useState(false);
    const [excelData, setExcelData] = useState<SearchItem | null>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            filterText: "",
        },
    })

    async function fetchData() {
        try {
            const raw_data = await SheetData().then(response => response);
            setExcelData(raw_data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const searchDefinitions = (filterText: string) => {
        void fetchData();

        if (!excelData)
            return

        excelData.forEach(({category, term, acronym, definition}) => {
            if (filterText === '') {
                setIsMatchingTerm(false)
                return;
            }

            if (term.toLowerCase().includes(filterText)) {
                viableSearchResults.push({category, term, acronym, definition});
            } else {
                // TODO: Add in optional window pane to request / ask for definition / error message
                console.info('Not here')
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
                                <FormLabel
                                    className="text-xl text-white underline underline-offset-4 decoration-redAccent">Search</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder="Enter your search"
                                           className="text-lightGray p-2 border-lightGray"
                                           value={searchTerm}
                                           onChange={e => {
                                               setIsMatchingTerm(false)
                                               setSearchTerm(e.target.value)
                                           }}/>
                                </FormControl>
                                {/*<FormMessage/>*/} {/*TODO: Display error message here*/}
                            </FormItem>
                        )}/>
                    <Button type="submit" variant={"outline"} className="text-md border-navy">Submit</Button>
                </form>
            </Form>
            {isMatchingTerm &&
                viableSearchResults.map((result, i) => (
                    <motion.div
                        key={i}
                        className=" w-4/5 mx-auto"
                        {...getAnimationProps(i * 0.4)}
                    >
                        <DefinitionCard
                            category={result.category}
                            term={result.term}
                            acronym={result.acronym}
                            definition={result.definition}
                        />
                    </motion.div>
                ))
            }
        </>
    )
}
