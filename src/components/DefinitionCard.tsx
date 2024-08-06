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
            <Card className="m-3">
                <CardHeader className="border-b-2 border-redAccent p-4">
                    <CardTitle>Category</CardTitle>
                    <CardDescription>{category}</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 grid-cols-1 gap-6 pt-4">
                    <div className="">
                        <Label htmlFor={term}
                               className="mb-10 text-slate-600 font-semibold underlineOffset">Term:</Label>
                        <p>{term}</p>
                    </div>
                    <div className="">
                        <Label htmlFor={definition}
                               className="font-semibold  text-slate-600 underlineOffset">Definition:</Label>
                        <p>{definition}</p>
                    </div>
                </CardContent>
                {
                    acronym && (
                        <CardFooter>
                            <div className="">
                                <Label htmlFor={acronym}
                                       className="font-semibold  text-slate-600 underlineOffset">Acronym:</Label>
                                <p>{acronym}</p>
                            </div>
                        </CardFooter>
                    )
                }
            </Card>
        </>
    )
}
