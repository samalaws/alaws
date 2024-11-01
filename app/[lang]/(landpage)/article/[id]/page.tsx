import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { i18n, Locale } from "@/i18n";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


async function getData(devtId: string) {
  const data =
    await prisma.article.findUnique({
      where: {
        id: devtId,
      },
      select: {
        createdAt: true,
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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

function processDescription(paragraph: string) {
  const regex = /[\.\?]/g; // Regular expression for periods, colons, and question marks
  return paragraph.replace(regex, "$&<br>");
}

export default async function Article({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const data = await getData(params.id);
  const processedDescription = processDescription(data.paragraph);
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
                href={`/${params.lang}/article`}>
                <ChevronLeft />
              </Link>
            </Button>
          </div>
          <h1 className=" py-10 text-3xl font-bold  ">
            {data.title}
          </h1>
          <Image
            src={data.images[0]}
            alt="Article image"
            width={1920}
            height={1080}
            className="rounded-sm object-scale-down w-full h-96 mb-10"
          />
          <h3 className="py-4 text-sm ">
            {new Intl.DateTimeFormat(
                "en-GB"
              ).format(data.createdAt)}
          </h3>
          <div className="text-base font-thin leading-6"
            dangerouslySetInnerHTML={{
              __html: processedDescription,
            }}
          />
          </div>
      </div>
    </>
  );
}