"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
    {
        name: "Home",
        href: "/",

    },
    {
        name: "Dev",
        href: "/admin/dev",
    },
    {
        name: "Arts",
        href: "/admin/arts",
    },
    {
        name: "Articles",
        href: "/admin/article",
    },
]


export function AdminNavbar() {
    const pathname = usePathname();
    return (
        <>
            {Links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className=
                        {cn(link.href === pathname ? 
                        "text-gray-800" : "text-gray-400",
                        "hover:ext-gray-800 px-2 py-1")}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
}