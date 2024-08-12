import Link from 'next/link'
import { Locale } from '@/i18n'
import { getDictionary } from '@/lib/dictionaries'
import LocaleSelecter from './locale.selecter'

export default async function Header({ lang }: { lang: Locale }) {
  const { NavbarLinks } = await getDictionary(lang)

  return (
    <header className='py-6'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-x-8'>
          <li className='text-gray-400'>
            <Link href={`/${lang}/dev`}>{NavbarLinks.dev.name}</Link>
          </li>
          <li className='text-gray-400'>
            <Link href={`/${lang}/art`}>{NavbarLinks.art.name}</Link>
          </li>
          <li className='text-gray-400'>
            <Link href={`/${lang}/article`}>{NavbarLinks.article.name}</Link>
          </li>
          <li className='text-gray-400'>
            <Link href={`/${lang}/contact`}>{NavbarLinks.contact.name}</Link>
          </li>
          <li className='text-gray-400'>
            <Link href={`/${lang}/about`}>{NavbarLinks.about.name}</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}