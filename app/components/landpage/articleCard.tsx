import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";


interface articleProps {
  article: {
    id: string;
    title: string;
    paragraph: string;
    images: string[];
  };
  lang: Locale; // Add the lang prop here
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

export default async function ArticleCard({article, lang}: articleProps) {
  const ArticleCard  = await getDictionary(lang);
  return (
    <>
      <div className="max-w-md mx-auto rounded-md border-solid border-2 shadow-md mb-10">
        <Image
          src={article.images[0]}
          alt="Article Image"
          width={250}
          height={250}
          className="h-60 w-full full-object rounded-t-md"
        />
        <div className="p-6">
          <h1 className="text-xl font-bold mb-2">
            {article.title}
          </h1>
          <p className=" h-12 overflow-hidden text-ellipsis">
            {article.paragraph}
          </p>
        </div>
        <div className="p-6">
          <Link href={"/article/" + article.id} className="hover:underline">
            {ArticleCard.ArticleCard.title}
          </Link>
        </div>
      </div>
    </>
  );
}
