import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";

interface DevCardProps {
  dev:{
    id: string;
    title: string;
    description: string;
    gitHubLink: string;
    onlineLink: string;
    images: string[];
  }
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default async function DevCard({
                                        devParams,
                                        lang
                                      }: {
                                        devParams: DevCardProps,
                                        lang: {lang: Locale}
                                      }) {
  const { DevCard } = await getDictionary(lang.lang);

  return (
    <>
      <div className="max-w-md mx-auto rounded-md border-solid border-2 shadow-md mb-10">
        <Image
          src={devParams.dev.images[0]}
          alt={devParams.dev.title}
          width={250}
          height={250}
          className="h-60 w-full full-object rounded-t-md"
        />
        <div className="p-6">
          <h1 className="text-xl font-bold mb-2">
            {devParams.dev.title}
          </h1>
          <p className="text-gray-700 h-12 overflow-hidden text-ellipsis">
            {devParams.dev.description}
          </p>
          <div className="mt-4">
            <a
              href={devParams.dev.gitHubLink}
              target="_blank"
              className="text-blue-500 hover:underline">
              GitHub
            </a>
            <span className="mx-2">
              |
            </span>
            <a
              href={devParams.dev.onlineLink}
              target="_blank"
              className="text-blue-500 hover:underline">
              Online
            </a>
            <span className="mx-2">
              read more..
            </span>
            <Link
              href={`dev/${devParams.dev.id}`}
              className="text-blue-500 hover:underline mr-1">
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
