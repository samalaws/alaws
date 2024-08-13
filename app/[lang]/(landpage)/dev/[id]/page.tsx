import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { i18n, Locale } from "@/i18n";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft, 
} from "lucide-react";

async function getData(devtId: string) {
  const data =
    await prisma.dev.findUnique({
      where: {
        id: devtId,
      },
      select: {
        createdAt: true,
        id: true,
        title: true,
        description: true,
        images: true,
        gitHubLink: true,
        onlineLink: true,
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

function processDescription(
  description: string
) {
  const sentences =
    description.split(".");
  let processedText = "";

  for (
    let i = 0;
    i < sentences.length;
    i++
  ) {
    const sentence = sentences[i];
    // Add the sentence with a period
    processedText += `${sentence}.`;

    // Check if it's the last sentence or if the next sentence is long enough
    if (
      i === sentences.length - 1 ||
      sentences[i + 1].length >= 150
    ) {
      processedText += "<br>";
    }
  }

  return processedText;
}


export default async function Development({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const data = await getData(params.id);
  const processedDescription =
    processDescription(
      data.description
    );
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mx-auto px-10 py-10 ">
          <div className="py-2">
            <Button
              variant="outline"
              className="gap-2"
              size="icon">
              <Link
                href={`/${params.lang}/dev`}>
                <ChevronLeft />
              </Link>
            </Button>
          </div>
          <h1 className=" py-10 text-3xl font-bold text-gray-700 ">
            {data.title}
          </h1>
          <Image
            src={data.images[0]}
            alt={"dev image"}
            width={650}
            height={50}
            className="rounded-md mx-auto bg-cover bg-fixed mb-10"
          />
          <h3 className=" py-4 text-sm text-gray-500 ">
            {new Intl.DateTimeFormat(
              "en-GB"
            ).format(data.createdAt)}
          </h3>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{
              __html:
                processedDescription,
            }}
          />
          <div></div>
          <div className="mt-4">
            <a
              href={data.gitHubLink}
              target="_blank"
              className="text-blue-500 hover:underline">
              GitHub
            </a>
            <span className="mx-2">
              |
            </span>
            <a
              href={data.onlineLink}
              target="_blank"
              className="text-blue-500 hover:underline">
              Online
            </a>
          </div>
        </div>
      </div>
    </>
  );
}