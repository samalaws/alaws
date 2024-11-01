import ArticleCard from "@/app/components/landpage/articleCard";
import LandpageArticle from "@/app/components/landpage/LandpageArticle";
import prisma from "@/app/lib/db";
import { Locale } from "@/i18n";
import { Languages } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore}  from "next/cache";



function getUserLanguage(
  locale: Locale
): Languages | undefined {
  switch (locale) {
    case "ar":
      return Languages.Arabic;
    case "de":
      return Languages.German;
    case "en":
      return Languages.English;
    default:
      console.warn(
        `Unsupported locale: ${locale}`
      );
      return undefined; // Handle unsupported locales gracefully
  }
}

async function getData(devId: string, userLanguage?: Languages){
  
  const data = await prisma.article.findMany({
    where: {
      id: devId,
      languages: {
        // Adjust the operator based on your Prisma schema
        equals: userLanguage, // Assuming languages is a single string
      },
      status: "published",
    },
    select: {
      id: true,
      title: true,
      paragraph: true,
      images: true,      
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}


export default async function ArticlePage({ params }: { params: { id: string, lang: Locale } }) {
  noStore();
  const userLanguage = getUserLanguage(params.lang); // Get user language
  const data = await getData(params.id, userLanguage);

  // If no data is found or language determination failed, show a 404 page
  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-1">
        <div className="pt-24 pb-16 px-4">
          <LandpageArticle lang={params.lang} />
        </div>
        <div className="mx-auto pt-2 px-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          {data.map((article) => (
            <ArticleCard article={article} key={article.id} lang={params.lang} />
          ))}
        </div>
      </div>
    </>
  );
}
