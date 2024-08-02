import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";


interface DevCardProps {
    dev: {
        id:             string;
        title:          string;
        description:    string;
        gitHubLink:     string;
        onlineLink:     string ;
        images:         string[];
    }
}

export default function DevCard({ dev }: DevCardProps) {
    return (
        <>
            <div className="max-w-md mx-auto rounded-md border-solid border-2 shadow-md mb-10">
            <Image 
                src={dev.images[0]}
                alt={dev.title}
                width={250}
                height={250}
                className="h-60 w-full full-object rounded-t-md"
            />
            <div className="p-6">
                <h1 className="text-xl font-bold mb-2">{dev.title}</h1>
                <p className="text-gray-700 h-12 overflow-hidden text-ellipsis">{dev.description}</p>
                <div className="mt-4">
                    <a
                        href={dev.gitHubLink}
                        target="_blank" 
                        className="text-blue-500 hover:underline"
                    >
                        GitHub
                    </a>
                    <span className="mx-2">|</span>
                    <a 
                            href={dev.onlineLink}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                    >
                        Online
                    </a>
                    <span className="mx-2">|</span>
                    <Link 
                        href={`/dev/${dev.id}`}
                        className="text-blue-500 hover:underline mr-1"                            
                    >
                        Read more..
                    </Link>
                </div>
                </div>
            </div>
        </>
        


                
    );
}