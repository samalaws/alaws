"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { i18n } from "@/i18n"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function LocaleSelecter() {
    const pathName = usePathname()
    
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return (
        segments.join('/'))
  }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-[75px] text-gray-400 cursor-pointer">
                <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {i18n.locales.map(locale => {
                    return (
                        <DropdownMenuItem key={locale} >
                            <Link
                                href={redirectedPathName(locale)}
                                className="w-[100px] text-center text-gray-400 hover:text-gray-800 "
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