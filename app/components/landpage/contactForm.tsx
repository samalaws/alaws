import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";


async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }));
}

export default async function ContactForm( lang: Locale) {
  const { ContactPage } = await getDictionary(lang)

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-6">
          <Button
            variant="outline"
            size={"icon"}
            asChild>
            <Link href="/">
              <ChevronLeft className="3-6 w-3" />
            </Link>
          </Button>
          <h1 className="text-lg tracking-tighter text-gray-600">{ContactPage.header}</h1>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            {ContactPage.header}
          </CardTitle>
          <CardDescription>
            {ContactPage.CardDescription}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
