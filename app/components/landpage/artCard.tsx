import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";

interface DevArtProps {
  art: {
    id: string;
    title: string;
    description: string;
    images: string[];
    khat: string;
  };
  lang: Locale; // Add the lang prop here
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

export default async function ArtCard({
  art,
  lang,
}: DevArtProps) {
  const { ArtCard, KhatTypes } =
    await getDictionary(lang);
  
  return (
    <div className="max-w-md mx-auto rounded-md border-solid border-2 shadow-md mb-10">
      <Image
        src={art.images[0]}
        alt={art.title}
        width={250}
        height={250}
        className="h-60 w-full full-object rounded-t-md"
      />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">
          {art.title}
        </h1>
        <p className=" h-12 overflow-hidden text-ellipsis">
          {art.description}
        </p>
        <div className="mt-4">
          <span>
            { 
              (art.khat === "Diwani")? 
              KhatTypes.diwani.name : 
              (art.khat === "DiwaniJali")? 
              KhatTypes.diwaniJali.name : 
              (art.khat === "Thuluth")? 
              KhatTypes.thuluth.name : 
              (art.khat === "Ruqaa")?
              KhatTypes.ruqaa.name:
              (art.khat === "Naskh")?
              KhatTypes.naskh.name:
              (art.khat === "Taliek")?
              KhatTypes.taliek.name:
              (art.khat === "Kufi")?
              KhatTypes.kufi.name:
              (art.khat)            
            }
          </span>
          <span className="mx-2">
            |
          </span>
          <Link
            href={`/art/${art.id}`}
            className=" hover:underline mr-1">
            {ArtCard.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
