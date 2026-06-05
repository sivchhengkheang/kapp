"use client";
import { Button } from "@/src/components/ui/button";
import Navbar from "@/src/components/utils/Navbar";
import SlideShow from "@/src/components/utils/SlideShow";
import { PRODUCT_DATA } from "@/src/constants";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function GameDetail() {
  const [showIfram, setShowIfram] = useState(false);
  const params = useParams<{ game: string }>();
  const gameName = params?.game;
  const product = gameName ? PRODUCT_DATA.find((p) => p.id === gameName) : null;
  const cover = product?.cover;
  const types = product?.type;
  const iframeUrl = product?.iframeUrl;

  return (
    <div className=" min-h-screen w-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col  ">
      <div>
        <Navbar />
      </div>
      <div className=" relative pt-28">
        <div className="container flex flex-col mx-auto max-w-7xl gap-5">
          <section className="max-w-full overflow-hidden rounded-xl h-[525px] bg-gray-400">
            <Image
              src={`/${cover!}`}
              alt="cover"
              width={1280}
              height={300}
              className="w-full h-full object-contain"
            ></Image>
          </section>
          <section className="max-w-full ">
            <div className=" w-full overflow-hidden rounded-lg bg-gray-400 h-[20vh]">
              <div className="p-5 w-full h-full bg-primary-foreground grid grid-cols-5 gap-5 items-center justify-center">
                {/* left side */}
                <div className="col-span-3 h-full w-full flex flex-col gap-2  ">
                  <div className="w-full flex items-start gap-2 left-0">
                    {types?.map(
                      (type: { text: string; color: string }, idx: number) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-sm text-xs font-medium ${type.color}`}
                        >
                          {type.text}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="w-full gap-2 flex items-start flex-col right-0 space-x-1">
                    <div className="">
                      <h3 className="font-bold text-lg tracking-wider">
                        {product?.title}
                      </h3>
                      <p className="text-sm text-primary/80">
                        {product?.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowIfram(!showIfram)}
                      className="flex text-center px-7 py-2 font-extrabold text-lg  text-muted bg-dark-blue/90 rounded-lg tracking-widest"
                    >
                      Play now Free
                    </button>
                  </div>
                </div>
                <div className="col-span-1" />

                {/* right side */}
                <div className=" relative col-span-1 flex  h-full w-full  justify-center items-center m-auto">
                  <div className="absolute w-fit h-full text-center justify-end items-end m-auto">
                    <h1 className="text-5xl font-bold ">{product?.rate}</h1>
                    <span className="text-xs">{product?.starRate}</span>
                    <p className="text-xs">User Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {showIfram && (
        <div className="absolute inset-0 w-full h-screen aspect-video overflow-hidden shadow-lg z-51">
          <button
            onClick={() => setShowIfram(false)}
            className="absolute bottom-8 left-8 m-3 z-52 text-2xl text-muted bg-primary-blue px-7 py-2 rounded-2xl"
          >
            back
          </button>
          <iframe
            src={iframeUrl}
            title={product?.title}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
