
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";

export async function Footer({ lang }: { lang: Locale }) {
  const fullYear: number =
    new Date().getFullYear();
    const { Footer } = await getDictionary(lang);

  return (
    <footer className="mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <p className="text-xs text-center leading-5">
          &copy; {fullYear}{" "} {Footer.copyright}
        </p>
      </div>
    </footer>
  );
}
