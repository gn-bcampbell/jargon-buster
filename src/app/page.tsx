import {SearchForm} from "~/components/SearchForm";
import logoPAColor from '~/assets/logo-colour.svg'
import Image from "next/image";

export default async function Home() {

    return (
        <main
            className="flex min-h-screen flex-col items-center justify-center bg-navy">
            <Image src={logoPAColor} alt={'PA Logo'} className='w-auto h-20 fixed right-6 top-6'/>

            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <h1 className="text-5xl lg:text-7xl font-extrabold font-heading text-white"><span
                    className='underline underline-offset-8 decoration-red'>PA</span> Jargon Buster</h1>
                <div className="w-full flex flex-col justify-center items-center">
                    <SearchForm/>
                </div>
            </div>
        </main>
    );
}
