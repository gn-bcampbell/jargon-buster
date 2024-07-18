"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
// import { toast } from "~/components/ui/use-toast"
import { toast } from "sonner"

const FormSchema = z.object({
    username: z.string().min(0, {
        message: "Username must be at least 2 characters.",
    }),
})

export function SearchForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Search</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={"outline"} className="text-black">Submit</Button>
                {/*<Button*/}
                {/*    variant="outline"*/}
                {/*    onClick={() =>*/}
                {/*        toast("Event has been created", {*/}
                {/*            description: "Sunday, December 03, 2023 at 9:00 AM",*/}
                {/*            action: {*/}
                {/*                label: "Undo",*/}
                {/*                onClick: () => console.log("Undo"),*/}
                {/*            },*/}
                {/*        })*/}
                {/*    }*/}
                {/*>*/}
                {/*    Show Toast*/}
                {/*</Button>*/}
            </form>
        </Form>
    )
}
