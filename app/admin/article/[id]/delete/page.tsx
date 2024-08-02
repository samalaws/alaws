import { deleteArticle } from "@/app/actions";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteArticleRoute({ params }: { params: { id: string } }) {
    return (
        <div className="h-[80vh] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>
                        Delete product
                    </CardTitle>
                    <CardDescription>
                        Are you sure you want to delete this product?
                    </CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="secondary" >
                        <Link href="/admin/article">Cancel</Link>
                    </Button>
                    <form action={deleteArticle}>
                        <input type="hidden" name="id" value={params.id} />
                        <SubmitButtons variant="destructive" text="Delete" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}