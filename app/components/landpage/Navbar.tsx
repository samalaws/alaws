import Link from "next/link";
import Header from "./header";
import { Locale } from "@/i18n";
import ThemeSwitcher from "./theme-switcher";

export default function Navbar({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
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
        <Header lang={params.lang}/>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
