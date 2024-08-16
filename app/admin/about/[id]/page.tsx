import EditAbout from "@/app/components/admin/EditAbout";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(articleId: string) {
    const data = await prisma.aboutMe.findUnique({
        where: {
            id: articleId,
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
        <EditAbout data ={data}/>
    )
}