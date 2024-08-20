import { EditArticleForm } from "@/app/components/admin/EditArticleForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore}  from "next/cache";  


async function getData(artId: string) {
    noStore();
    const data = await prisma.article.findUnique({
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
        <EditArticleForm data ={data}/>
    )
}