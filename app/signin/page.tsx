import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"

export default async function SignIn() {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Card className="w-[350px]">
                        <CardHeader className="justify-center items-center">
                            <CardTitle className="pb-2">ALAWS</CardTitle>
                            <CardDescription>sign in to admin page</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LoginLink>
                                <Button className="w-full ">Sign in</Button>
                            </LoginLink>
                    </CardContent>
                    <CardFooter>
                        <p className="text-center text-xs text-gray-400">to access admin page you need to sign in successfully</p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}