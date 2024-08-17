import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { unstable_noStore as noStore}  from "next/cache";  



async function getData() {
    noStore();
    const data = await prisma.article.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return data;
}

export default async function Articles() {
    const data = await getData();
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex items-center gap-x-2">
                    <Link href="/admin/article/new">
                        <PlusCircle className="h-4 w-4"/>
                        <span >Add New Article</span>
                    </Link>          
                </Button>
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Articles</CardTitle>
                    <CardDescription>Articles content</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell> 
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {( data).map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                    <Image
                                                alt="Article Image"
                                                src={item.images[0]} 
                                                height={64} 
                                                width={64}
                                                className="rounded-md object-cover h-16 w-16" 
                                            />
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{new Intl.DateTimeFormat("en-GB").format(item.createdAt)}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost">
                                                    <MoreHorizontal className="w-4 h-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/article/${item.id}`}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={`/admin/article/${item.id}/delete`}>Delete</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}