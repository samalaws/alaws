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
      <div className="pl-4 mb-10">
        <h1 className="text-3xl font-bold text-gray-700">
          {ArtPage.title}
        </h1>
        <h3 className="text-gray-500">
          {ArtPage.description}
        </h3>
      </div>
    </>
  );
}
