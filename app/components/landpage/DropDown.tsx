import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export const Languages = [
    {
        id:     0,
        name:   "EN",
        value:   "english",
    },
    {
        id:     1,
        name:   "DE",
        value:   "deutsch",
    },
    {
        id:     2,
        name:   "AR",
        value:  "arabic",
    },
]

interface LanguageContextType {
    language: 'en' | 'de' | 'ar';
    setLanguage: (language: 'en' | 'de' | 'ar') => void;
}

export default function DropDown() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Globe className="flex items-center mr-2 w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-20">
                    {Languages.map((language) => (
                        <DropdownMenuItem key={language.id} className="p-0" >
                            <Button variant="ghost" className=" text-xs h-6 w-full">{language.name}</Button>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>       
            </DropdownMenu>
        </>
    );
}