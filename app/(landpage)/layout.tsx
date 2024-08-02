import { ReactNode } from "react";
import Navbar from "../components/landpage/Navbar";
import { Footer } from "../components/landpage/Footer";

export default function LandpageLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
            <Footer />  
        
        </>
            
    );
}