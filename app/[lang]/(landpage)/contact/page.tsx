"use client";
import { useRouter } from 'next/router';
import { redirect } from "next/navigation";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { contactSchema } from "@/app/lib/zodSchemas";
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
import useDictionary from '@/lib/useDictionary';

export default function Contact() {

  const data: Partial<{
    SubmitButtons: string;
    messagePlaceholder: string;
    message: string;
    subjectPlaceholder: string;
    subject: string;
    selectOptionTwo: string;
    selectOptionOne: string;
    select: string;
    email: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    name: string;
    header: string;
    CardDescription: string;
  }> = useDictionary();  

  async function sendEmail(prevState: unknown,formData: FormData) {
    
    const submission = parseWithZod(formData, {
        schema: contactSchema});
    if (submission.status !== "success") {
        return submission.reply();
    }
    fetch('/api/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission.value),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error)); 
    
    redirect("/");

}
  const [lastResult, action] = useFormState(sendEmail, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
        return parseWithZod(formData, {
            schema: contactSchema,
        });
    },    
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
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
            </h1>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>
              {data.header}
              </CardTitle>
              <CardDescription>
                {data.CardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Label>{data.name}</Label>
                  <Input 
                    placeholder={data.namePlaceholder}
                    type="text"
                    key={fields.name.key}
                    name={fields.name.name}
                    defaultValue={fields.name.initialValue}
                  />
                  <Label>{data.email}</Label>
                  <Input 
                    placeholder={data.emailPlaceholder}
                    type="text"
                    key={fields.email.key}
                    name={fields.email.name}
                    defaultValue={fields.email.initialValue}
                  />
                  <Select
                    name={fields.reason.name}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={data.select} />
                    </SelectTrigger>
                    <SelectContent >
                      <SelectItem value="Personal">{data.selectOptionOne} </SelectItem>
                      <SelectItem value="Business">{data.selectOptionTwo}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label>{data.subject}</Label>
                  <Input 
                    placeholder={data.subjectPlaceholder}
                    type="text"
                    key={fields.subject.key}
                    name={fields.subject.name}
                    defaultValue={fields.subject.initialValue}
                  />
                  <Label>{data.message}</Label>
                  <Textarea
                    placeholder={data.messagePlaceholder}
                    className="h-44"
                    key={fields.message.key}
                    name={fields.message.name}
                    defaultValue={fields.message.initialValue}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButtons text={data.SubmitButtons || 'Send'} />
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}