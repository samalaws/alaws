import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function Hero() {
    return (
        <Carousel>
            <CarouselContent>
                <CarouselItem>
                    <div className="relative h-[60vh] lg:h-[70vh]">
                        <Image 
                            src="/images/hero.webp" 
                            alt="Hero image" 
                            width={1920} 
                            height={1080}
                            className="object-cover w-full h-full rounded-3xl"
                        />
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="relative h-[60vh] lg:h-[70vh]">
                        <Image 
                            src="/images/hero.webp" 
                            alt="Hero image" 
                            width={1920} 
                            height={1080}
                            className="object-cover w-full h-full rounded-3xl"
                        />
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
}