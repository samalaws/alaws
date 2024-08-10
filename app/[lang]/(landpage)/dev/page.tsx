import DevCard from "@/app/components/landpage/devCard";
import LandpageDev from "@/app/components/landpage/LandpageDev";
import prisma from "@/app/lib/db";
import { i18n, Locale } from "@/i18n";
import { notFound } from "next/navigation";

// Fetch data based on the devId
async function getData(devId: string) {
  const data = await prisma.dev.findMany({
    where: {
      id: devId, // Using devId to fetch the specific development data
      languages: "English",
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
  // Fetch data using the devId
  const data = await getData(params.id);

  // If no data is found, show a 404 page
  if (!data) {
    notFound();
  }

  return (
    <>
      <LandpageDev lang={params.lang} />
      <div className="max-w-7xl mx-auto pt-24 px-4">

        {data.map((dev) => (
          <DevCard dev={dev} key={dev.id} lang={params.lang}/>
        ))}
      </div>
    </>
  );
}
