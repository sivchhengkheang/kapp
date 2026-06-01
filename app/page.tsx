import Navbar from "../component/Navbar";
import Image from "next/image";
import cover from "../public/cover1.png";
import { MagicCard } from "@/components/ui/magic-card";
export default function Home() {
  return (
    <div className=" justify-center items-center h-[100vh] w-full ">
      <div>
        <Navbar />
      </div>

      <div className="container m-auto relative max-w-6xl bg-red-50  flex flex-col justity-center text-center  ">
        <div className=" w-full h-2/3 flex items-center justify-center pt-20 pb-10">
          <div className="rounded-2xl w-full">
            <Image
              src={cover}
              alt="cover"
              className="object-cover w-full rounded-2xl"
            />
          </div>
        </div>
        <div className="items-start flex max-w-8xl justify-start">
          <div className="gap-10 flex flex-col ">
            <div className="text-left">
              <h2 className="text-3xl font-black">KOOMPI App,</h2>
              <p className="text-lg tracking-width">
                You might be like to play these game.
              </p>
            </div>
            <div className="grid grid-cols-5 w-full items-center justify-center">
              <MagicCard>
                <div className="p-4">
                  <Image src={cover} alt="Typing code game" />
                  <span>Hover me</span>
                </div>
              </MagicCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
