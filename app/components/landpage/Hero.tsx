import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <Image
          src="/images/hero.webp"
          alt="Hero image"
          width={1920}
          height={1080}
          className=" mx-auto w-full rounded-3xl"
        />
      </div>
    </>
  );
}
