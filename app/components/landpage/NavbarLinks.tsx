import { useTranslations } from "next-intl";
import Link from "next/link";

export const navLinks = [
    {
        id:     1,
        name:   "Development",
        href:   "/dev",
    },
    {
        id:     2,
        name:   "Art Works",
        href:   "/art",
    },
    {
        id:     3,
        name:   "Articles",
        href:   "/article",
    },
    {
        id:     4,
        name:   "Contact",
        href:   "/contact",
    },
    {
        id:     5,
        name:   "About",
        href:   "/about",
    },   
]


export function NavbarLinks() {
    return (
        <>
            <div className="flex justify-center items-center">
            <div 
                    className="hidden md:flex justify-center items-center gap-x-5 ml-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                            key={link.id}
                            href={link.href}
                            className="font-medium text-gray-500 hover:text-gray-700"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
            </div>
            
        
        </>
        
    );
}