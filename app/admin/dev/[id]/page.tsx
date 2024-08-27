import { EditDevForm } from "@/app/components/admin/EditDevForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore}  from "next/cache";  


async function getData(prodictId: string) {
    noStore();
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

export default async function EditDevRoute({
    params, }:{
    params: {
        id: string
    }
}){
    const data = await getData(params.id);
    return (
        <EditDevForm data ={data}/>
    )
}