"use server"
import { parseWithZod } from '@conform-to/zod';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { artSchema, devSchema, articleSchema, aboutMeSchema } from "./lib/zodSchemas";
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
            onlineLink: submission.value.onlineLink ?? "www.alaws.de",
            images: flattenUrls,
            status: submission.value.status,
            languages:submission.value.languages,
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
            onlineLink: submission.value.onlineLink,
            images: flattenUrls,
            status: submission.value.status,
            languages:submission.value.languages,
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

export async function createArt(prevState: unknown,formData: FormData) {
    
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log(user);
    

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    

    const submission = parseWithZod(formData, {
        schema: artSchema});

    if (submission.status !== "success") {
        return submission.reply();
    }


    const flattenUrls = submission.value.images.flatMap((urlString: string) =>
        urlString.split(",").map((url) => url.trim())
    );


    await prisma.art.create({
        data: {
            title:          submission.value.title,
            description:    submission.value.description,
            images:         flattenUrls,
            status:         submission.value.status,
            languages:      submission.value.languages,
            khat:           submission.value.khat,

        },
    });

    redirect("/admin/arts");
}

export async function editArt(prevState: any, formData: FormData) {
    
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }
    
    const submission = parseWithZod(formData ,{
        schema: artSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    const artId = formData.get("artId") as string;

    await prisma.art.update({
        where: {
            id: artId,
        },
        data: {
            title:          submission.value.title,
            description:    submission.value.description,
            images:         flattenUrls,
            status:         submission.value.status,
            khat:           submission.value.khat,
        },
    });

    redirect("/admin/arts");
}

export async function deleteArt(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    await prisma.art.delete({
        where: {
            id: formData.get("id") as string,
        },
    });
    redirect("/admin/arts");
}

export async function createArticle(prevState: unknown,formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: articleSchema});

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    await prisma.article.create({
        data: {
            title:      submission.value.title,
            paragraph:  submission.value.paragraph,
            images:     flattenUrls,
            status:     submission.value.status,
            languages:  submission.value.languages,
        },
    });

    redirect("/admin/article");
}

export async function editArticle(prevState: any, formData: FormData) {
    
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }
    
    const submission = parseWithZod(formData ,{
        schema: articleSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    const articleId = formData.get("articleId") as string;

    await prisma.article.update({
        where: {
            id: articleId,
        },
        data: {
            title: submission.value.title,
            paragraph: submission.value.paragraph,
            images: flattenUrls,
            status: submission.value.status,
            languages:submission.value.languages,
        },
    });

    redirect("/admin/article");
}

export async function deleteArticle(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    await prisma.article.delete({
        where: {
            id: formData.get("id") as string,
        },
    });
    redirect("/admin/article");
}


export async function createAboutMe(prevState: unknown,formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: aboutMeSchema});

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    await prisma.aboutMe.create({
        data: {
            title: submission.value.title,
            description: submission.value.description,
            headerTitle: submission.value.headerTitle,
            header: submission.value.header,
            content: submission.value.content,
            contentTitle: submission.value.contentTitle,
            footer: submission.value.footer,
            footerTitle: submission.value.footerTitle,
            images: flattenUrls,
            languages:submission.value.languages,
        },
    });

    redirect("/admin/about");
}

export async function editAboutMe(prevState: any, formData: FormData) {
    
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        return redirect("/");
    }
    
    const submission = parseWithZod(formData ,{
        schema: aboutMeSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    const articleId = formData.get("articleId") as string;

    await prisma.aboutMe.update({
        where: {
            id: articleId,
        },
        data: {
            title: submission.value.title,
            description: submission.value.description,
            headerTitle: submission.value.headerTitle,
            header: submission.value.header,
            content: submission.value.content,
            contentTitle: submission.value.contentTitle,
            footer: submission.value.footer,
            footerTitle: submission.value.footerTitle,
            images: flattenUrls,
        },
    });

    redirect("/admin/about");
}
