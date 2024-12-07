import Image from "next/image";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { env } from "~/env";
import { SearchForm } from "~/components/SearchForm";
import Link from "next/link";

export default async function Home() {

    const dataSource = env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'Excel Data Sheet' : 'Sanity CMS'
    return (
        <>
            <main
                className="flex min-h-screen bg-navy flex-col items-center">
                <section className="flex p-6 w-full h-full top-0 justify-end">
                    <div className="grid grid-col max-w-48 text-center">

                        <Link
                            href={"https://github.com/gn-bcampbell/jargon-buster"}
                            target="_blank"
                        >
                            <GitHubLogoIcon className="text-white h-14 w-auto mx-auto" />
                            <p className="text-white text-xs p-1 hover:underline">Want to use this code for your own businesses corporate jargon?</p>
                        </Link>
                    </div>

                </section>

                <p className="text-white mx-4">Extracting data from: {dataSource}</p>
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-fancy text-white"><span
                        className='underline font-fancy underline-offset-8 decoration-red'>Corporate</span> jargon buster</h1>

                    <div className="w-full flex flex-col justify-center items-center">
                        <SearchForm />
                    </div>

                </div>
            </main>
        </>
    );
}
