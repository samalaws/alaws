import ArtCard from "@/app/components/landpage/artCard";
import LandpageDev from "@/app/components/landpage/LandpageDev";
import LandpageArt from "@/app/components/LandpageArt";
import prisma from "@/app/lib/db";
import { i18n, Locale } from "@/i18n";
import { Languages } from "@prisma/client";
import { notFound } from "next/navigation";


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

  
  const data = await prisma.art.findMany({
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
      description: true,
      images: true,
      khat: true,
      
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

export default async function ArtPage({ params }: { params: { id: string, lang: Locale } }) {
  const userLanguage = getUserLanguage(params.lang); // Get user language
  // Fetch data using the devId and user language
  const data = await getData(params.id, userLanguage);

  // If no data is found or language determination failed, show a 404 page
  if (!data) {
    notFound();
  }

  
  return (
    <>
      <div className="max-w-7xl mx-auto px-1">
        <div className=" pt-24 px-4">
          <div className="mx-auto pt-2 px-4 grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.map((art) => (
              <ArtCard art={art} key={art.id} lang={params.lang} />
            ))}
          </div>
        </div>
      </div>
    </>

  )
  
}