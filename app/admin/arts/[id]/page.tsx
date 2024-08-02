import { EditArtForm } from "@/app/components/admin/EditArtForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(artId: string) {
    const data = await prisma.art.findUnique({
        where: {
            id: artId,
        },
    });
    if(!data) {
        return notFound();
    }
    return data;
}

export default async function EditRoute({
    params, }:{
    params: {
        id: string
    }
}){
    const data = await getData(params.id);
    return (
        <EditArtForm data ={data}/>
    )
}