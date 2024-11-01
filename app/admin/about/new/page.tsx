"use client";
import { aboutMeSchema } from "@/app/lib/zodSchemas";
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
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import Image from "next/image";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { createAboutMe } from "@/app/actions";

export default function CreateAbout() {
  const [lastResult, action] =
    useFormState(
      createAboutMe,
      undefined
    );
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: aboutMeSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [images, setImages] = useState<
    string[]
  >([]);

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
    <>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size={"icon"}
            asChild>
            <Link href="/admin/about">
              <ChevronLeft className="3-6 w-3" />
            </Link>
          </Button>
          <h1 className="text-lg tracking-tighter text-gray-600">
            Development works
          </h1>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>
              About Me
            </CardTitle>
            <CardDescription>
              Enter a new About me info
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Languages</Label>
                <Select
                  name={
                    fields.languages
                      .name
                  }
                  defaultValue={
                    fields.languages
                      .initialValue
                  }
                  key={
                    fields.languages.key
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">
                      English
                    </SelectItem>
                    <SelectItem value="Arabic">
                      Arabic
                    </SelectItem>
                    <SelectItem value="German">
                      German
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Title</Label>
                <Input
                  placeholder="About me Title"
                  type="text"
                  key={fields.title.key}
                  name={
                    fields.title.name
                  }
                  defaultValue={
                    fields.title
                      .initialValue
                  }
                />
                <p className="text-red-300 text-xs">
                  *{fields.title.errors}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>
                  About me Description
                </Label>
                <Textarea
                  placeholder=" About me Description"
                  name={
                    fields.description
                      .name
                  }
                  defaultValue={
                    fields.description
                      .initialValue
                  }
                  key={
                    fields.description
                      .key
                  }
                />
                <p className="text-red-300 text-xs">
                  *
                  {
                    fields.description
                      .errors
                  }
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>
                  Header Title
                </Label>
                <Input
                  placeholder="Header Title"
                  type="text"
                  key={
                    fields.header.key
                  }
                  name={
                    fields.header.name
                  }
                  defaultValue={
                    fields.header
                      .initialValue
                  }
                />
                <p className="text-red-300 text-xs">
                  *
                  {fields.header.errors}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Header</Label>
                <Textarea
                  placeholder=" Header"
                  name={
                    fields.headerTitle
                      .name
                  }
                  defaultValue={
                    fields.headerTitle
                      .initialValue
                  }
                  key={
                    fields.headerTitle
                      .key
                  }
                  className="h-72"
                />
                <p className="text-red-300 text-xs">
                  *
                  {
                    fields.headerTitle
                      .errors
                  }
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>
                  content Title
                </Label>
                <Input
                  placeholder="Content Title"
                  type="text"
                  key={
                    fields.contentTitle
                      .key
                  }
                  name={
                    fields.contentTitle
                      .name
                  }
                  defaultValue={
                    fields.contentTitle
                      .initialValue
                  }
                />
                <p className="text-red-300 text-xs">
                  *
                  {
                    fields.contentTitle
                      .errors
                  }
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Content</Label>
                <Textarea
                  placeholder=" Content "
                  name={
                    fields.content.name
                  }
                  defaultValue={
                    fields.content
                      .initialValue
                  }
                  key={
                    fields.content.key
                  }
                />
                <p className="text-red-300 text-xs">
                  *
                  {
                    fields.content
                      .errors
                  }
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>
                  Footer Title
                </Label>
                <Input
                  placeholder="Footer Title"
                  type="text"
                  key={
                    fields.footerTitle
                      .key
                  }
                  name={
                    fields.footerTitle
                      .name
                  }
                  defaultValue={
                    fields.footerTitle
                      .initialValue
                  }
                />
                <p className="text-red-300 text-xs">
                  *
                  {
                    fields.footerTitle
                      .errors
                  }
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Footer</Label>
                <Textarea
                  placeholder=" Footer "
                  name={
                    fields.footer.name
                  }
                  defaultValue={
                    fields.footer
                      .initialValue
                  }
                  key={
                    fields.footer.key
                  }
                />
                <p className="text-red-300 text-xs">
                  *
                  {fields.footer.errors}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Images</Label>
                <input
                  type="hidden"
                  value={images}
                  key={
                    fields.images.key
                  }
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
                      (
                        image,
                        index
                      ) => (
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
            <SubmitButtons text="Create new AboutMe" />
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
