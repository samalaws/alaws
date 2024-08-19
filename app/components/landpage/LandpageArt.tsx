import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function LandpageArt({
  lang,
}: {
  lang: Locale;
}) {
  const { ArtPage } =
    await getDictionary(lang);
  return (
    <>
      <div className="pl-4">
        <h1 className="text-3xl">
          {ArtPage.title}
        </h1>
        <h3 className="pt-5 text-base font-thin" >
          {ArtPage.description}
        </h3>
      </div>
    </>
  );
}
