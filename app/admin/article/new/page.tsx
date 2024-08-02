"use client"

import { createArticle } from "@/app/actions";
import { articleSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { SubmitButtons } from "@/app/components/SubmitButtons";


export default function AddNewArticle(){
    const [lastResult, action] = useFormState(createArticle, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: articleSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });
    const [images,setImages] = useState<string[]>([]);

    const handelDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    }

    return (
        <>
            <form action={action} id={form.id} onSubmit={form.onSubmit}>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size={"icon"} asChild>
                        <Link href="/admin/article">
                            <ChevronLeft className="3-6 w-3"/>
                        </Link>
                    </Button>
                    <h1 className="text-lg tracking-tighter text-gray-600">Articles</h1>
                </div>
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Articles</CardTitle>
                        <CardDescription>Enter a new article</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                                <Label>Languages</Label>
                                <Select
                                    name={fields.languages.name}
                                    defaultValue={fields.languages.initialValue}
                                    key={fields.languages.key}                                
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="English" >English</SelectItem>
                                        <SelectItem value="Arabic">Arabic</SelectItem>
                                        <SelectItem value="German">German</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Title</Label>
                                <Input 
                                    placeholder="Project Title"
                                    type="text"
                                    key={fields.title.key}
                                    name={fields.title.name}
                                    defaultValue={fields.title.initialValue}
                                />
                                <p className="text-red-300 text-xs">*{fields.title.errors}</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Paragraph</Label>
                                <Textarea
                                    placeholder=" Article Text"
                                    name={fields.paragraph.name}
                                    defaultValue={fields.paragraph.initialValue}
                                    key={fields.paragraph.key}
                                />
                                <p className="text-red-300 text-xs">*{fields.paragraph.errors}</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label>Status</Label>
                                <Select
                                    name={fields.status.name}
                                    defaultValue={fields.status.initialValue}
                                    key={fields.status.key}                                
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="draft" >Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                                    className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-lg text-white">
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
                        <SubmitButtons text="Create new article" />
                    </CardFooter>          
                </Card>
            </form>
        </>
    )
}