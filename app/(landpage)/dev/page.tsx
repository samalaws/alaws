import DevCard from "@/app/components/landpage/devCard";
import prisma from "@/app/lib/db";
import { Card, CardHeader } from "@/components/ui/card";
import { notFound } from "next/navigation";

async function getData(devId: string) {
    const data = await prisma.dev.findMany({
        
        select:{
            id: true,
            title: true,
            description: true,
            gitHubLink: true,
            onlineLink: true,
            images: true,
        },
    });
    if(!data) {
        return notFound();
    }
    return data;
}
export default async function Development({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return (
        <>
            <div className="max-w-7xl mx-auto pt-24 px-4">
                <div className="pl-[4.5rem] mb-10">
                    <h1 className="text-3xl font-bold text-gray-700">All Devs</h1>
                    <h3 className="text-gray-500">in this section will shown all Dev projects</h3>
                </div>
                
                <div className="flex flex-wrap gap-4">
                    {data.map((dev) => (
                        <DevCard key={dev.id} dev={dev} />
                    ))}
                </div>
            </div>
            
        </>
    );
}