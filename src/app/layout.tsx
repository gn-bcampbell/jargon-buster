import "~/styles/globals.css";

import {type Metadata} from "next";
import {Toaster} from "~/components/ui/sonner"

import {TRPCReactProvider} from "~/trpc/react";
import {Akaya_Kanadaka, Poppins, Roboto} from "next/font/google";

const fancyFont = Akaya_Kanadaka({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-fancy",
});
const headingFont = Poppins({
    weight: "300",
    subsets: ["latin"],
    variable: "--font-heading",
});

const readingFont = Roboto({
    subsets: ["latin"],
    variable: "--font-reading",
    weight: "300",
});
export const metadata: Metadata = {
    title: "Jargon Buster",
    description: "",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`bg-navy ${fancyFont.variable} ${readingFont.variable} ${headingFont.variable}`}>
        <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster/>
        </body>
        </html>
    );
}
