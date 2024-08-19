import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";


export default async function LandpageArticle({ lang }: { lang: Locale }) {
  const { ArticlePage } = await getDictionary(lang);
  return (
    <>
      <div className="pl-4">
        <h1 className="text-3xl ">
          {ArticlePage.title}
        </h1>
        <h3 className="pt-5 text-base font-thin" >
          {ArticlePage.description}
        </h3>
      </div>
    </>
  );
}
