import Link from 'next/link'
import { Locale } from '@/i18n'
import { getDictionary } from '@/lib/dictionaries'

export default async function Header({ lang }: { lang: Locale }) {
  const { NavbarLinks } = await getDictionary(lang)

  return (
    <header className='py-6'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-x-8'>
          <li>
            <Link href={`/${lang}/dev`}>{NavbarLinks.dev.name}</Link>
          </li>
          <li>
            <Link href={`/${lang}/art`}>{NavbarLinks.art.name}</Link>
          </li>
          <li>
            <Link href={`/${lang}/article`}>{NavbarLinks.article.name}</Link>
          </li>
          <li>
            <Link href={`/${lang}/contact`}>{NavbarLinks.contact.name}</Link>
          </li>
          <li>
            <Link href={`/${lang}/about`}>{NavbarLinks.about.name}</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}