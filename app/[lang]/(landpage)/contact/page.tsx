"use client";
import { createDev } from "@/app/actions";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { devSchema } from "@/app/lib/zodSchemas";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function Contact() {
  const [lastResult, action] =
    useFormState(createDev, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: devSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size={"icon"}
              asChild>
              <Link href="/">
                <ChevronLeft className="3-6 w-3" />
              </Link>
            </Button>
            <h1 className="text-lg tracking-tighter text-gray-600">
              Contect
            </h1>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>
                Contect
              </CardTitle>
              <CardDescription>
                send us a message 
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="Enter your full name"
                    type="text"
                  />
                  <Label>Email</Label>
                  <Input 
                    placeholder="Enter your email"
                    type="text"
                  />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Reason for Contact" />
                    </SelectTrigger>
                    <SelectContent >
                      <SelectItem value="Personal">Personal </SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label>Subject</Label>
                  <Input 
                    placeholder="Enter your subject"
                    type="text"
                  />
                  <Label>Message</Label>
                  <Textarea
                    placeholder="Enter your message"
                    className="h-44"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButtons text={"Send Message"} />
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
