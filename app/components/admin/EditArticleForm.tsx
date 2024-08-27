"use client";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { SubmitButtons } from "../SubmitButtons";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  articleSchema,
  artSchema,
} from "@/app/lib/zodSchemas";
import { type $Enums } from "@prisma/client";
import { editArticle } from "@/app/actions";

interface iAppProps {
  data: {
    id: string;
    title: string;
    paragraph: string;
    status: $Enums.DevStatus;
    images: string[];
  };
}

export function EditArticleForm({
  data,
}: iAppProps) {
  const [images, setImages] = useState<
    string[]
  >(data.images);
  const [lastResult, action] =
    useFormState(
      editArticle,
      undefined
    );
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
  const handelDelete = (
    index: number
  ) => {
    setImages(
      images.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}>
      <input
        type="hidden"
        name="articleId"
        value={data.id}
      />
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size={"icon"}
          asChild>
          <Link href="/admin/article">
            <ChevronLeft className="3-6 w-3" />
          </Link>
        </Button>
        <h1 className="text-lg tracking-tighter text-gray-600">
          Edit Arts works
        </h1>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            Art Work details
          </CardTitle>
          <CardDescription>
            Enter a new art work details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Title</Label>
              <Input
                placeholder="Project Title"
                type="text"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={
                  data.title
                }
              />
              <p className="text-red-300 text-xs">
                *{fields.title.errors}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Paragraph</Label>
              <Textarea
                placeholder=" Project Description"
                name={
                  fields.paragraph.name
                }
                defaultValue={
                  data.paragraph
                }
                key={
                  fields.paragraph.key
                }
                className="h-72"
              />
              <p className="text-red-300 text-xs">
                *
                {
                  fields.paragraph
                    .errors
                }
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                name={
                  fields.status.name
                }
                defaultValue={
                  data.status
                }
                key={fields.status.key}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    Draft
                  </SelectItem>
                  <SelectItem value="published">
                    Published
                  </SelectItem>
                  <SelectItem value="archived">
                    Archived
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={
                  fields.images.name
                }
                defaultValue={
                  fields.images
                    .initialValue as any
                }
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map(
                    (image, index) => (
                      <div
                        key={index}
                        className="relative w-[100px] h-[100px]">
                        <Image
                          height={100}
                          width={100}
                          src={image}
                          alt="product image"
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <button
                          onClick={() =>
                            handelDelete(
                              index
                            )
                          }
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-lg text-white">
                          <XIcon className="w-2 h-2" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(
                    res
                  ) => {
                    setImages(
                      res.map(
                        (r) => r.url
                      )
                    );
                  }}
                  onUploadError={(
                    res
                  ) => {
                    alert(
                      "Error while uploading"
                    );
                  }}
                />
              )}
              <p className="text-red-500">
                {fields.images.errors}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButtons text="Edit Art work" />
        </CardFooter>
      </Card>
    </form>
  );
}
