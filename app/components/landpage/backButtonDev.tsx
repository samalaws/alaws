import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function BackButtonDev() {
  const t = useTranslations(
    "NavbarLinks"
  );
  return (
    <>
      <div className="flex items-center gap-4 pb-5">
        <Button
          variant="outline"
          size={"icon"}
          asChild>
          <Link href={t("dev.href")}>
            <ChevronLeft className="3-6 w-3" />
          </Link>
        </Button>
        <h1 className="text-lg tracking-tighter text-gray-600">
          {t("dev.name")}
        </h1>
      </div>
    </>
  );
}
