import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function NoDataFound({ lang }: { lang: Locale }) {
    const { noDataFound } = await getDictionary(lang)
    return (
        <>
            <div className="flex w-full h-[300px] items-center justify-center">
                <h1 className="text-4xl font-bold tracking-tighter px-auto justify-center ">
                    {noDataFound.name}
                </h1>
            </div>
        </>
    );
}