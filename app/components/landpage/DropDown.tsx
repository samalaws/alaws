import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import Link from "next/link";

export const Languages = [
  {
    id: 0,
    name: "EN",
    value: "english",
    href: "/en",
  },
  {
    id: 1,
    name: "DE",
    value: "deutsch",
    href: "/de",
  },
  {
    id: 2,
    name: "AR",
    value: "arabic",
    href: "/ar",
  },
];

interface LanguageContextType {
  language: "en" | "de" | "ar";
  setLanguage: (
    language: "en" | "de" | "ar"
  ) => void;
}

export default function DropDown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Globe className="flex items-center mr-2 w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20">
          {Languages.map((language) => (
            <DropdownMenuItem
              key={language.id}
              className="p-0">
              <Link
                href={language.href}
                className="text-xs">
                <Button
                  variant="ghost"
                  className=" text-xs h-6 w-full">
                  {language.name}
                </Button>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
