import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function LandpageArticle({
  lang,
}: {
  lang: Locale;
}) {
  const {ArticlePage} =
    await getDictionary(lang);
  return (
    <>
      <div className="pl-4 mb-10">
        <h1 className="text-3xl">
          {ArticlePage.title}
        </h1>
        <h3 className="text-base font-thin">
          {ArticlePage.description}
        </h3>
      </div>
    </>
  );
}
