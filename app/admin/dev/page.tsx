import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore}  from "next/cache";  




async function getData() {
    noStore();
    const data = await prisma.dev.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return data;
}

export default async function Dev(){
    const data = await getData();
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex items-center gap-x-2">
                    <Link href="/admin/dev/new">
                        <PlusCircle className="h-4 w-4"/>
                        <span >Add New DEV</span>
                    </Link>          
                </Button>
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Development</CardTitle>
                    <CardDescription>Development content</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Language</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                            <Image
                                                alt="Dev Image"
                                                src={item.images[0]} 
                                                height={64} 
                                                width={64}
                                                className="rounded-md object-cover h-16 w-16" 
                                            />
                                        </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell >{item.languages}</TableCell>
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
                                                    <Link href={`/admin/dev/${item.id}`}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={`/admin/dev/${item.id}/delete`}>Delete</Link>
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