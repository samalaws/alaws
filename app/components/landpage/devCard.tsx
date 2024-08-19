import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";

interface DevCardProps {
  dev: {
    id: string;
    title: string;
    description: string;
    gitHubLink: string;
    onlineLink: string;
    images: string[];
  };
  lang: Locale; // Add the lang prop here
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function DevCard({ dev, lang }: DevCardProps) {
  const { DevCard } = await getDictionary(lang);

  return (
    <div className="max-w-md mx-auto rounded-md border-solid border-2 shadow-md mb-10">
      <Image
        src={dev.images[0]}
        alt={dev.title}
        width={250}
        height={250}
        className="h-60 w-full full-object rounded-t-md"
      />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">
          {dev.title}
        </h1>
        <p className="h-12 overflow-hidden text-ellipsis">
          {dev.description}
        </p>
        <div className="mt-4">
          <a
            href={dev.gitHubLink}
            target="_blank"
            className=" hover:underline"
          >
            GitHub
          </a>
          <span className="mx-2">|</span>
          <a
            href={dev.onlineLink}
            target="_blank"
            className=" hover:underline"
          >
            Online
          </a>
          <span className="mx-2">|</span>
          <Link
            href={`/dev/${dev.id}`}
            className=" hover:underline mr-1"
          >
            {DevCard.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
