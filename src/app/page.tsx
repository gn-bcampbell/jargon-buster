import logoPAColor from '~/assets/logo-colour.svg'
import Image from "next/image";

import {env} from "~/env";
import {SearchForm} from "~/components/SearchForm";

export default async function Home() {

    const dataSource = env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'Excel Data Sheet' : 'Sanity CMS'
    return (
        <>
            <main
                className="flex min-h-screen bg-navy flex-col items-center">
                <section className="flex p-6 w-full h-full top-0 justify-end">
                    <Image src={logoPAColor} alt={'PA Logo'} className='w-auto sm:h-20 h-10'/>
                </section>

                <p className="text-white mx-4">Extracting data from: {dataSource}</p>
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-heading text-white"><span
                        className='underline underline-offset-8 decoration-red'>PA</span> Jargon Buster</h1>

                    <div className="w-full flex flex-col justify-center items-center">
                        <SearchForm/>
                    </div>

                </div>
            </main>
        </>
    );
}
