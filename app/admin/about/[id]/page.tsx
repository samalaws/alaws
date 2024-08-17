import EditAbout from "@/app/components/admin/EditAbout";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore}  from "next/cache";  


async function getData(articleId: string) {
    noStore();
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