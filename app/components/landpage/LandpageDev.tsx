import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";


export default async function LandpageDev({ lang }: { lang: Locale }) {
  const { DevPage } = await getDictionary(lang);
  return (
    <>
      <div className="pl-4">
        <h1 className="text-3xl ">
          {DevPage.title}
        </h1>
        <h3 className="pt-5 text-base font-thin" >
          {DevPage.description}
        </h3>
      </div>
    </>
  );
}
