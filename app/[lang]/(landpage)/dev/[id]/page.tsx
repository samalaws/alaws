import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import BackButtonDev from "@/app/components/landpage/backButtonDev";

async function getData(devtId: string) {
    const data = await prisma.dev.findUnique({
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

export default async function Development({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <>
        <div className="max-w-5xl mx-auto px-4">
            <div className="mx-auto px-10 py-10 ">
                <BackButtonDev />
                <span className="text-sm text-gray-500 ">
                    {new Intl.DateTimeFormat("en-GB").format(data.createdAt)}
                </span>
                <h1 className=" pt-5 pb-5 text-3xl font-bold text-gray-700 ">{data.title}</h1>
                <Image src={data.images[0]} alt={"dev image"}
                        width={650} height={50} className="rounded-md bg-cover bg-fixed mb-10"
                />
                <p className="text-gray-700">{data.description}</p>                
                <div>
                </div>
                <div className="mt-4">
                    <a
                        href={data.gitHubLink}
                        target="_blank" 
                        className="text-blue-500 hover:underline"
                    >
                        GitHub
                    </a>
                    <span className="mx-2">|</span>
                    <a 
                            href={data.onlineLink}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                    >
                        Online
                    </a>
                </div>
            </div>
        </div>
            
        </>
    );
}