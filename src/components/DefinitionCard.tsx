"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "~/components/ui/card"
import {Label} from "~/components/ui/label";

interface props {
    category: string,
    term: string,
    acronym: string,
    definition: string
}

export function DefinitionCard({category, term, acronym, definition}: props) {
    return (
        <>
            {/* TODO: styling*/}
            <Card className="max-w-5xl">
                <CardHeader className="border-b-2 border-gray-200 p-4">
                    <CardTitle>Category</CardTitle>
                    <CardDescription>{category}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 pt-4">
                    <div className="">
                        <Label htmlFor={term} className="mb-10 font-semibold">Term:</Label>
                        <p>{term}</p>
                    </div>
                    <div className="">
                        <Label htmlFor={definition} className="font-semibold">Definition:</Label>
                        <p>{definition}</p>
                    </div>
                </CardContent>
                {
                    acronym && (
                        <CardFooter>{`Acronym: ${acronym}`}</CardFooter>
                    )
                }
            </Card>
        </>
    )
}
