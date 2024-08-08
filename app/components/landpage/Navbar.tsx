"use client";
import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import {
  MoonIcon,
  SunIcon,
} from "lucide-react";
import DropDown from "./DropDown";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { setTheme } = useTheme();
  return (
    <nav className=" h-28 2-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="font-bold text-3xl">
          <h1 className="text-3xl font-thin text-gray-500">
            Samer
            <span className="text-3xl text-gray-700 font-bold">
              Alaws
            </span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
      <div className="flex items-center gap-4">
        <DropDown />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">
                Toggle theme
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                setTheme("light")
              }>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setTheme("dark")
              }>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
