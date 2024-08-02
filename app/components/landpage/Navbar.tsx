import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Globe, Languages, SunMoon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DropDown from "./DropDown";

export default function Navbar() {
    return (
        <nav className=" h-28 2-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/" className="font-bold text-3xl">
                    <h1 className="text-3xl font-thin text-gray-500">
                        Samer
                        <span
                        className="text-3xl text-gray-700 font-bold"
                        >
                            Alaws
                        </span>
                    </h1>
                </Link>
                <NavbarLinks />
            </div>
            <div className="flex items-center gap-4">
                <DropDown/>
                <SunMoon className="flex items-center mr-2 w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
        </nav>
    );
}