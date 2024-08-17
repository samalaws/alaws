import DevCard from "@/app/components/landpage/devCard";
import LandpageDev from "@/app/components/landpage/LandpageDev";
import prisma from "@/app/lib/db";
import { i18n, Locale } from "@/i18n";
import { Languages } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore}  from "next/cache";  


// Function to determine user-selected language and map to enum value
function getUserLanguage(locale: Locale): Languages | undefined {
  switch (locale) {
    case "ar":
      return Languages.Arabic;
    case "de":
      return Languages.German;
    case "en":
      return Languages.English;
    default:
      console.warn(`Unsupported locale: ${locale}`);
      return undefined; // Handle unsupported locales gracefully
  }
}

// Fetch data based on the devId
async function getData(devId: string, userLanguage?: Languages) {
  if (!userLanguage) {
    console.error("Failed to determine user language");
    return null; // Handle missing language information
  }

  const data = await prisma.dev.findMany({
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
      gitHubLink: true,
      onlineLink: true,
      images: true,
    },
  });

  // If no data is found, return null
  return data.length > 0 ? data : null;
}

// Generate static paths for all locales
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

// Component to render the development page
export default async function Development({ params }: { params: { id: string, lang: Locale } }) {

  noStore();
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
          <LandpageDev lang={params.lang} />
        </div>
        <div className="mx-auto pt-2 px-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          {data.map((dev) => (
            <DevCard dev={dev} key={dev.id} lang={params.lang} />
          ))}
        </div>
      </div>
    </>
  );
}
