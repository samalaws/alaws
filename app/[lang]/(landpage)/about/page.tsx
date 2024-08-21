import prisma from "@/app/lib/db";
import { i18n, Locale } from "@/i18n";
import { Languages } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
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

  async function getData(userLanguage?: Languages){
    noStore();
    
    const data = await prisma.aboutMe.findMany({
        where: {
          languages: {
            // Adjust the operator based on your Prisma schema
            equals: userLanguage, // Assuming languages is a single string
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          content: true,
          contentTitle: true,
          headerTitle: true,
          header: true,
          footer: true,
          footerTitle: true,
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

export default async function About({ params }: { params: { lang: Locale } }) {
  const userLanguage = getUserLanguage(params.lang); // Get user language
  // Fetch data using the devId and user language
  const data = await getData(userLanguage);
  console.log(data);

  const WordFilter = ({ text }: { text: string }) => {
    const words = text.split(' ');
    const firstWord = words[0];
    const secondWord = words[1];
    return (
      <>
        <span className="py-4 text-6xl font-thin ">{firstWord}</span>
        <span className="py-4 text-6xl font-bold ">{secondWord}</span>
      </>
    );
  };
  
  
    return (
        <>
          <div className="max-w-7xl mx-auto px-1">
              {data?.map((about) => (
                <div className="flex flex-col-reverse md:flex-row px-4" key={about.id}>
                  <div className="w-full md:w-1/2">
                    <div className="py-4">
                      <h1 className="py-3 text-5xl font-bold ">
                        {<WordFilter text={about.title} />}
                      </h1>
                      <p className=" text-4xl font-thin">{about.description}</p>
                    </div>
                    <div className="py-2">
                      <h1 className="py-2 text-xl ">{about.header}</h1>
                      <p className=" pl-10 font-thin">{about.headerTitle}</p>
                    </div>
                    <div className="py-2">
                      <h1 className="py-2 text-xl ">{about.contentTitle}</h1>
                      <p className="pl-10 font-thin">{about.content}</p>
                    </div>
                    <div className="py-2">
                      <h1 className="py-2 text-xl ">{about.footerTitle}</h1>
                      <p className="pl-10 font-thin">{about.footer}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:w-1/2 justify-center items-center mb-4 md:mb-0">
                    <div className=" grayscale hover:grayscale-0 ">
                      <Image 
                        src={about.images[0]} 
                        alt={about.title} 
                        width={200} 
                        height={200}
                        className="rounded-full"  
                      />
                    </div>
                    <div className=" flex flex-row pt-20 justify-center gap-x-7">
                        <div className="py-2">
                          <Link href="https://www.linkedin.com/in/samer-alaws/">
                            <Linkedin className="w-8 h-8 text-[#0077B5]" />
                          </Link>
                        </div>
                        <div className="py-2">
                          <Link href="https://www.linkedin.com/in/samer-alaws/">
                            <Github className="w-8 h-8 text-gray-600" />
                          </Link>
                        </div>
                        <div className="py-2">
                          <Link href="https://www.instagram.com/samalaws/">
                            <Instagram className="w-8 h-8 text-[#E1306C]" />
                          </Link>
                        </div>
                    </div>
                  </div>
                  
                </div>
              ))}
          </div>
        </> 
    )
}