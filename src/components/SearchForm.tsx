"use client"

// setup
import React, {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {motion} from "framer-motion";
import {env} from '~/env.js'

// ui
import {Button} from "~/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form"
import {Input} from "~/components/ui/input"
import {RadioGroup, RadioGroupItem} from "~/components/ui/radio-group";

// local imports
import {DefinitionCard} from "~/components/DefinitionCard";
import type {SearchItem} from "~/lib/types";
import {getExcelData} from "~/lib/dataSource/excelSheets";
import {getSanityData} from "~/lib/dataSource/sanityUtil";

let viableSearchResults: SearchItem[] = []
export const revalidate = 30;

// framer motion animation
const getAnimationProps = (delay = 0) => ({
    initial: {opacity: 0, y: -50}, // Start with opacity 0 and positioned 50px above its final position
    animate: {opacity: 1, y: 0}, // Animate to opacity 1 and its final position
    transition: {duration: 1, delay} // Animation duration of 1 second, with a delay
});

const FormSchema = z.object({
    filterText: z.string().min(1, {
        message: "Search must be at least 1 character.",
    }),
    type: z.enum(["term", "definition", "acronym"], {
        required_error: "You need to select a notification type.",
    }),
})

export function SearchForm() {
    const [isMatchingTerm, setIsMatchingTerm] = useState(false);
    const [sourceData, setSourceData] = useState<SearchItem[] | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            filterText: '',
            type: 'term'
        }
    })

    // TODO: A sanity request is made on each search... move this elsewhere, or implement caching??
    async function fetchData() {
        try {
            return env.NEXT_PUBLIC_ENVIRONMENT === 'development'
                ? setSourceData(await getExcelData())
                : setSourceData(await getSanityData())
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    void fetchData(); //call immediately

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        const filterText = data.filterText.toLowerCase();
        viableSearchResults = [] // clear list to stop it being persistently added to

        if (!sourceData) {
            form.setError("filterText", {
                message: 'Error returning data source',
            })
            return;
        }

        const addToViableResults = (condition: boolean, item: SearchItem) => {
            if (condition) viableSearchResults.push(item);
        };

        sourceData.forEach(({category, term, acronym, definition}) => {
            const item: SearchItem = {category, term, acronym, definition};
            switch (data.type) {
                case 'term':
                    addToViableResults(term.toLowerCase().includes(filterText), item);
                    break;
                case 'acronym':
                    addToViableResults(acronym.toLowerCase().includes(filterText), item);
                    break;
                case 'definition':
                    addToViableResults(definition.toLowerCase().includes(filterText), item);
                    break;
                default:
                    console.info('Not here');
            }
        });

        if (!viableSearchResults.length) {
            form.setError("filterText", {
                message: 'No matching term.',
            })
            return;
        }

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
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {/*Radio buttons*/}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({field}) => (
                            <FormItem className="text-white space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row flex-wrap">
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
