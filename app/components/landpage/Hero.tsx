
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 h-[70vh] flex items-center">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-gray-700">Personal website of</h1>
          <h1 className="text-5xl font-bold mb-4 text-gray-700">Samer Alaws</h1>
          <h3 className="text-lg text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi vero, nisi velit rem dolore mollitia possimus cumque, ducimus doloremque quibusdam, exercitationem unde delectus officiis maxime facilis. Animi sit alias iure!</h3>
        </div>
        <div className="w-1/2">
          <Image
            src="/images/hero.webp"
            alt="Hero image"
            width={1920}
            height={1080}
            className="w-full h-[50vh]"
          />
        </div>
      </div>
    </>
  );
}
