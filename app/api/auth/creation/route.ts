import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } =
    getKindeServerSession();
  const user = await getUser();

  if (
    !user ||
    user.email !==
      process.env.ADMIN_EMAIL
  ) {
    throw new Error("Unauthorized");
  }
  try {
    let dbUser =
    await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName:
          user.given_name ?? "",
        lastName:
          user.family_name ?? "",
        email: user.email ?? "",
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV ===
      "production"
      ? "https://alaws.vercel.app"
      : "http://localhost:3000"
  );
  } catch (error) {
    console.error(error);
  }
    
}
