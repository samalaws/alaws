import DevCard from "@/app/components/landpage/devCard";
import LandpageDev from "@/app/components/landpage/LandpageDev";
import prisma from "@/app/lib/db";
import { i18n, Locale } from "@/i18n";
import { notFound } from "next/navigation";

// Develpoment Page

async function getData(devId: string) {
  const data =
    await prisma.dev.findMany({
      where: {
        status: "published",
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
  return data;
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}
export default async function Development( { params }: { params: { lang: Locale } } ) {
  
  return (
    <>
      <div className="max-w-7xl mx-auto pt-24 px-4">
        <LandpageDev lang={params.lang} />
      </div>
    </>
  );
}
