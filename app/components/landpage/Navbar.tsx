import Link from "next/link";
import Header from "./header";
import { Locale } from "@/i18n";
import ThemeSwitcher from "./theme-switcher";
import LocaleSelecter from "./locale.selecter";

export default function Navbar({
  params
}: {
  params: { lang: Locale }
}) {
  return (
    <>
      <nav className="hidden md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="max-w-7xl mx-auto py-10 flex flex-col md:flex-row justify-between items-center px-4">
          <div className="flex flex-shrink-0 text-center md:text-left">
            <Link
              href="/"
              >
              <h1 className="text-3xl font-thin">
                Samer
                <span className="text-3xl font-bold">
                  Alaws
                </span>
              </h1>
              </Link>
            </div>
            <div className="flex flex-grow justify-center ">
              <Header lang={params.lang}/>
            </div>
            <div className="flex flex-shrink-0 items-center pl-5">
              <LocaleSelecter/>
              <ThemeSwitcher/>
            </div>
        </div>
      </nav>  
    </>
  );
}
