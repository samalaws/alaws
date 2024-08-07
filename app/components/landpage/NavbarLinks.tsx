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
    const t = useTranslations('NavbarLinks');
    return (
        <>
            <div className="flex justify-center items-center">
            <div 
                    className="hidden md:flex justify-center items-center gap-x-5 ml-8"
                    >
                        <Link href={t('dev.href')} className="text-gray-400 hover:text-gray-800">{t('dev.name')}</Link>
                        <Link href={t('art.href')} className="text-gray-400 hover:text-gray-800">{t('art.name')}</Link>                        
                        <Link href={t('article.href')} className="text-gray-400 hover:text-gray-800">{t('article.name')}</Link>                        
                        <Link href={t('contact.href')} className="text-gray-400 hover:text-gray-800">{t('contact.name')}</Link>                        
                        <Link href={t('about.href')} className="text-gray-400 hover:text-gray-800">{t('about.name')}</Link>                        
                    </div>
            </div>
            
        
        </>
        
    );
}