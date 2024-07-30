"use server"
import { parseWithZod } from '@conform-to/zod';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { devSchema } from "./lib/zodSchemas";
import prisma from './lib/db';


export async function createDev(prevState: unknown,formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: devSchema});

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    await prisma.dev.create({
        data: {
            title: submission.value.title,
            description: submission.value.description,
            gitHubLink: submission.value.gitHubLink,
            onlineLink: submission.value.onlineLink || null,
            images: flattenUrls,
            status: submission.value.status,
        },
    });

    redirect("/admin/dev");
}

export async function editDev(prevState: any, formData: FormData) {
    
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }
    
    const submission = parseWithZod(formData ,{
        schema: devSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    const devId = formData.get("devId") as string;

    await prisma.dev.update({
        where: {
            id: devId,
        },
        data: {
            title: submission.value.title,
            description: submission.value.description,
            gitHubLink: submission.value.gitHubLink,
            onlineLink: submission.value.onlineLink || null,
            images: flattenUrls,
            status: submission.value.status,
        },
    });

    redirect("/admin/dev");
}

export async function deleteDev(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    await prisma.dev.delete({
        where: {
            id: formData.get("id") as string,
        },
    });
    redirect("/admin/dev");
}