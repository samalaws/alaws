"use client"
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { SubmitButtons } from "../SubmitButtons";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { devSchema } from "@/app/lib/zodSchemas";
import { type $Enums } from "@prisma/client";
import { editDev } from "@/app/actions";
import { statuses } from "@/app/lib/statuses";


interface iAppProps {
    data: {
        id:             string;
        title:          string;
        description:    string;
        gitHubLink:     string;
        onlineLink:     string ;
        status:         $Enums.DevStatus;
        images:         string[];
    }
}

export function EditDevForm({ data }: iAppProps) {

    const [images, setImages] = useState<string[]>(data.images);
    const [lastResult, action] = useFormState(editDev, undefined);
    const [form, fields]= useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: devSchema
            })
        },
        shouldValidate:"onBlur",
        shouldRevalidate:"onInput",
    });
    const handelDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };
    

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action} >
            <input type="hidden" name="devId" value={data.id} />
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild >
                    <Link href="/admin/dev">
                        <ChevronLeft className="w-4 h-4"/>
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">Edit DEV WORK</h1>
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>DEV work details</CardTitle>
                    <CardDescription>Enter DEV details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>Title</Label>
                            <Input  
                                type="text" 
                                key={fields.title.key}
                                name={fields.title.name}
                                defaultValue={data.title}
                                className="w-full"
                            />
                            <p className="text-red-500">{fields.title.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={data.description}
                                className="h-72"
                            />
                            <p className="text-red-500">{fields.description.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>GitHUB Link</Label>
                            <Input  
                                type="text" 
                                key={fields.gitHubLink.key}
                                name={fields.gitHubLink.name}
                                defaultValue={data.gitHubLink}
                                className="w-full"
                            />
                            <p className="text-red-500">{fields.gitHubLink.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Online Link</Label>
                            <Input  
                                type="text" 
                                key={fields.onlineLink.key}
                                name={fields.onlineLink.name}
                                defaultValue={data.onlineLink}
                                className="w-full"
                            />
                            <p className="text-red-500">{fields.onlineLink.errors}</p>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select
                                key={fields.status.key}
                                name={fields.status.name}
                                defaultValue={data.status}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((status) => (
                                        <SelectItem key={status.id} value={status.name}>{status.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.status.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input
                                type="hidden"
                                value={images}
                                key={fields.images.key}
                                name={fields.images.name}
                                defaultValue={fields.images.initialValue as any}
                            />
                            {images.length > 0 ? (
                                <div className="flex gap-5">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative w-[100px] h-[100px]">
                                            <Image 
                                                height={100}
                                                width={100}
                                                src={image} 
                                                alt="product image"
                                                className="w-full h-full object-cover rounded-lg border"
                                            />
                                            <button
                                                onClick={() => handelDelete(index)}
                                                type="button"
                                                className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                                                <XIcon className="w-2 h-2"/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ):(
                                <UploadDropzone 
                                endpoint="imageUploader" 
                                onClientUploadComplete={(res) => {
                                    setImages(res.map((r)=> r.url));
                                }}
                                onUploadError={(res) => {
                                    alert("Error while uploading")}}
                            />
                            )}
                            <p className="text-red-500">{fields.images.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButtons text="Update Product"/>
                </CardFooter>
            </Card>
        </form>
    )
}