import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const data =
    await prisma.aboutMe.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  return data;
}

export default async function About() {
  const data = await getData();
  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            About me
          </CardTitle>
          <CardDescription>
            About me content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Language
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      alt="Dev Image"
                      src={
                        item.images[0]
                      }
                      height={64}
                      width={64}
                      className="rounded-md object-cover h-16 w-16"
                    />
                  </TableCell>
                  <TableCell>
                    {item.title}
                  </TableCell>
                  <TableCell>
                    {item.languages}
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat(
                      "en-GB"
                    ).format(
                      item.createdAt
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          asChild>
                          <Link
                            href={`/admin/about/${item.id}`}>
                            Edit
                          </Link>
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
