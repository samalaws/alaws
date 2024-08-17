import Link from 'next/link'
import { Locale } from '@/i18n'
import { getDictionary } from '@/lib/dictionaries'

export default async function Header({ lang }: { lang: Locale }) {
  const { NavbarLinks } = await getDictionary(lang)

  // #c4f2f2 #073841

  return (
    <>
      <Link 
        href={`/${lang}/dev`}
        className="text[#073841] text-base px-5 py-1 hover:font-bold hover:underline"
      >
        {NavbarLinks.dev.name}
      </Link>
      <Link 
        href={`/${lang}/art`}
        className="text[#073841] text-base px-5 py-1 hover:font-bold hover:underline"
        >
          {NavbarLinks.art.name}
        </Link>
      <Link 
        href={`/${lang}/article`}
        className="text[#073841] text-base px-5 py-1 hover:font-bold hover:underline"
        >
          {NavbarLinks.article.name}
        </Link>
      <Link 
        href={`/${lang}/contact`}
        className="text[#073841] text-base px-5 py-1 hover:font-bold hover:underline"
        >
          {NavbarLinks.contact.name}
        </Link>
      <Link 
        href={`/${lang}/about`}
        className="text[#073841] text-base px-5 py-1 hover:font-bold hover:underline"
      >
        {NavbarLinks.about.name}
      </Link>
    </>
      
  )
}