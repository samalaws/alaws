import { EditForm } from "@/app/components/admin/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(prodictId: string) {
    const data = await prisma.dev.findUnique({
        where: {
            id: prodictId,
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
        <EditForm data ={data}/>
    )
}