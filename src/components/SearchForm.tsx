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
import {RadioGroup, RadioGroupItem} from "~/components/ui/radio-group";

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
    type: z.enum(["term", "definition", "acronym"], {
        required_error: "You need to select a notification type.",
    }),
})

type SearchItem = {
    category: string,
    term: string,
    acronym: string,
    definition: string,
}[]
let viableSearchResults: SearchItem = []

// Dummy data
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

export function SearchForm() {
    const [isMatchingTerm, setIsMatchingTerm] = useState(false);
    const [excelData, setExcelData] = useState<SearchItem | null>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            filterText: '',
            type: 'term'
        }
    })

    async function fetchData() {
        try {
            const raw_data = await SheetData().then(response => response);
            setExcelData(raw_data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Search Definition
    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        // fetch excel data
        void fetchData();

        // format incoming text
        const filterText = data.filterText.toLowerCase();
        // clear list to stop it being persistently added to
        viableSearchResults = []

        // TODO create type for 'item'
        const addToResultsIfMatch = (condition: boolean, item: any) => {
            if (condition)
                viableSearchResults.push(item);
        };

        if (!excelData) return;
        excelData.forEach(({category, term, acronym, definition}) => {
            if (filterText === '') {
                setIsMatchingTerm(false);
                return;
            }

            //
            const item = {category, term, acronym, definition};

            switch (data.type) {
                case 'term':
                    addToResultsIfMatch(term.toLowerCase().includes(filterText), item);
                    break;
                case 'acronym':
                    addToResultsIfMatch(acronym.toLowerCase().includes(filterText), item);
                    break;
                case 'definition':
                    addToResultsIfMatch(definition.toLowerCase().includes(filterText), item);
                    break;
                default:
                    console.info('Not here');
            }
        });

        setIsMatchingTerm(viableSearchResults.length > 0);
    };


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    {/*Search input field*/}
                    <FormField
                        control={form.control}
                        name="filterText"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel
                                    className="text-xl text-white underline underline-offset-4 decoration-redAccent">
                                    Search
                                </FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           placeholder="Enter your search"
                                           className="text-lightGray p-2 border-lightGray"/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/*Radio buttons*/}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({field}) => (
                            <FormItem className=" text-white space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row">
                                        <FormItem className="flex items-center space-x-2 space-y-0 pr-2">
                                            <FormControl>
                                                <RadioGroupItem className="border-white" value="term"/>
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Term
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0 pr-2">
                                            <FormControl>
                                                <RadioGroupItem className="border-white"
                                                                value="definition"/>
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Definition
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem className="border-white" value="acronym"/>
                                            </FormControl>
                                            <FormLabel className="font-normal">Acronym</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant={"outline"} className="text-md border-navy">Submit</Button>
                </form>
            </Form>
            {/*Display definition card*/}
            {isMatchingTerm &&
                viableSearchResults.map((result, index) => (
                    <motion.div
                        key={index}
                        className=" w-4/5 mx-auto"
                        {...getAnimationProps(index * 0.4)}
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
