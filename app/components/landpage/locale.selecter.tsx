"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { i18n } from "@/i18n"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function LocaleSelecter() {
    const pathName = usePathname()
    const segments = pathName.split('/')
    console.log(segments[1]);
    
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return (
        segments.join('/'))
  }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-[100px] pr-3 flex items-center cursor-pointer">
                <span className="text-base">
                    {segments[1] === 'en' ? 'Language' : segments[1] === 'de' ? 'Sprache' : segments[1] === 'ar' ? 'أختر اللغة' : 'EN'}
                </span>
                <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {i18n.locales.map(locale => {
                    return (
                        <DropdownMenuItem key={locale} >
                            <Link
                                href={redirectedPathName(locale)}
                                className="w-[100px] text-center hover:underline "
                            >
                                {locale}
                            </Link>                            
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}