import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminNavbar } from "../components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import {  MenuIcon } from "lucide-react";
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export default async function AdminLayout( { children, }: { children: React.ReactNode } ) {
    const {getUser} = getKindeServerSession();
    const user      = await getUser();
    if(!user || user.email !== process.env.ADMIN_EMAIL){
        return redirect("/");
    }
    return (
        <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b">
                <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <AdminNavbar />
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="shrink-0 md:hidden" variant="outline" size="icon">
                            <MenuIcon/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                    <nav className="flex flex-col gap-6 text-lg font-medium mt-2 ">
                        <AdminNavbar />
                    </nav>
                    </SheetContent>
                </Sheet>
                <LogoutLink className="rounded-md px-2 py-2 text-sm font-medium text-gray-500 hover:text-red-500" >Logout</LogoutLink>
            </header>
            <main className="flex-1 pt-10">{children}</main>
        </div>
    );
}