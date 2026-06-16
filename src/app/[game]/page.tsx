"use client";

import Navbar from "@/src/components/utils/Navbar";
import SlideShow from "@/src/components/utils/SlideShow";
import { PRODUCT_DATA } from "@/src/constants";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Download, ExternalLink, Link, Play, X } from "lucide-react";
import windows from "@/public/windows-icon.svg";
import linux from "@/public/linux-icon.svg";

import DownloadButton from "@/src/components/utils/DownloadButton";
import { Footer } from "@/src/components/utils/Footer";

export default function GameDetail() {
  const [showIfram, setShowIfram] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const params = useParams<{ game: string }>();
  const gameName = params?.game;
  const product = gameName ? PRODUCT_DATA.find((p) => p.id === gameName) : null;
  const cover = product?.cover;
  const types = product?.type;
  const iframeUrl = product?.iframeUrl;
  const windowFile = product?.windows.download;

  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Prevent TypeError from MetaMask/Web3 scripts trying to access window.ethereum
    if (typeof window !== "undefined" && !window.ethereum) {
      Object.defineProperty(window, "ethereum", {
        value: undefined,
        writable: true,
        configurable: true,
      });
    }

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000); // Show the button after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showIfram) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [showIfram]);

  const contact = [
    {
      icon: "../../facebook.svg",
      name: "facebook",
      link: "https://facebook.com/chhengcoke",
    },
    {
      icon: "../../github.svg",
      name: "github",
      link: "https://github.com/sivchhengkheang",
    },
    {
      icon: "../../telegram.svg",
      name: "telegram",
      link: "https://t.me/sivchhengkheang",
    },
    {
      icon: "../../instagram.svg",
      name: "instagram",
      link: "https://instagram.com/chhengcoke",
    },
  ];

  return (
    <div className=" min-h-screen w-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col scrollbar-none overflow-y-auto ">
      <div className="mt-14 pt-14 shrink-0 rounded-xl">


        <Navbar />

        <div className=" relative w-full h-full">
          {/* <div className="absolute top-24 left-0 w-full h-fit bg-primary-blue/80">
          <a
            href="/"
            className=" fixed w-fit left-15 py-1 px-5 top-24 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300  hover:-translate-x-1" />
            <span className="font-bold">Back</span>
          </a>
          </div> */}
          <div className="container flex flex-col mx-auto max-w-7xl gap-5">
            <section className="max-w-full overflow-hidden rounded-xl h-fit bg-gray-400">
              <Image
                src={`/${cover}`}
                alt="cover"
                width={1280}
                height={300}
                className="w-full h-full object-contain"
              ></Image>
            </section>
            <section className="max-w-full gap-5 flex flex-col pb-5 ">
              <div className=" w-full overflow-hidden rounded-lg bg-gray-40">
                <div className="p-5 w-full h-full bg-primary-foreground grid grid-cols-5 gap-5 items-center justify-center shadow-lg shadow-slate-300/60 dark:shadow-slate-900/60 rounded-lg">
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
                        <p className="text-sm text-slate-600">
                          {product?.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowIfram(!showIfram)}
                        className={`flex items-center gap-2 text-center px-7 py-3 font-semibold text-lg rounded-lg tracking-widest transition-colors duration-200 ${product?.brandColor ?? "bg-slate-800 hover:bg-slate-700 text-white"}`}
                      >
                        <Play className="w-4 h-4" /> Play Now
                      </button>
                      {/* <button
                        onClick={() => setShowIfram(!showIfram)}
                        className="flex text-center px-7 py-2 font-extrabold text-lg  text-muted bg-primary-blue rounded-lg tracking-widest"
                      >
                        <span className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Play now
                        </span>
                      </button> */}
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
              {/* ── Download Section ── */}
              <div className="w-full overflow-hidden rounded-xl">
                <div className="p-6 w-full h-full bg-primary-foreground shadow-xl shadow-slate-200/80 dark:shadow-slate-950/60 rounded-xl">

                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className={`w-1 h-6 rounded-full ${product?.brandColor?.split(" ")[0] ?? "bg-slate-400"}`} />
                    <h2 className="text-xl font-bold tracking-tight">Download</h2>
                    <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 font-medium">Choose your platform</span>
                  </div>

                  {/* Cards grid — always 2 columns filling full width */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* ── Windows card ── */}
                    <div className="group flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md shadow-slate-200/60 dark:shadow-slate-950/40 hover:shadow-lg hover:shadow-slate-300/60 dark:hover:shadow-slate-900/60 transition-shadow duration-300 overflow-hidden">
                      {/* Colored top accent line */}
                      <div className={`h-1 w-full ${product?.brandColor?.split(" ")[0] ?? "bg-blue-500"}`} />

                      <div className="p-5 flex flex-col gap-4 flex-1">
                        {/* Header: icon + title */}
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 ring-1 ring-blue-100 dark:ring-blue-900/50">
                            <Image src={windows} alt="windows" width={28} height={28} />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold leading-tight">{product?.windows.platform}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product?.windows.osRequirement}</p>
                          </div>
                        </div>

                        {/* Spec rows */}
                        <div className="rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 text-sm">
                          {[
                            ["Version", product?.windows.releaseDetails.version],
                            ["File Size", product?.windows.releaseDetails.fileSize],
                            ["File Type", product?.windows.releaseDetails.fileType],
                            ["Architecture", product?.windows.releaseDetails.architecture],
                            ["Release", product?.windows.releaseDetails.releaseDate],
                          ].map(([label, value], i) => (
                            <div key={label} className={`flex justify-between items-center px-3 py-2 ${i % 2 === 0 ? "bg-slate-50 dark:bg-slate-800/40" : "bg-white dark:bg-slate-900"}`}>
                              <span className="text-slate-500 dark:text-slate-400 font-medium">{label}</span>
                              <span className="text-slate-800 dark:text-slate-200 font-semibold tabular-nums">{value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Download button */}
                        <div className="mt-auto pt-1">
                          <a href={product?.windows.releaseDetails.download} target="_blank" rel="noopener noreferrer">
                            <button className={`w-full py-3 px-6 rounded-lg font-semibold text-base flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 ${product?.brandColor ?? "bg-slate-800 hover:bg-slate-700 text-white"}`}>
                              <Download size={18} />
                              Download for Windows
                            </button>
                          </a>
                          <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-2">
                            {product?.windows.fileName} · {product?.windows.releaseDetails.fileSize}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ── Linux card ── */}
                    <div className="group flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md shadow-slate-200/60 dark:shadow-slate-950/40 hover:shadow-lg hover:shadow-slate-300/60 dark:hover:shadow-slate-900/60 transition-shadow duration-300 overflow-hidden">
                      {/* Colored top accent line */}
                      <div className={`h-1 w-full ${product?.brandColor?.split(" ")[0] ?? "bg-emerald-500"}`} />

                      <div className="p-5 flex flex-col gap-4 flex-1">
                        {/* Header: icon + title */}
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 ring-1 ring-emerald-100 dark:ring-emerald-900/50">
                            <Image src={linux} alt="linux" width={28} height={28} />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold leading-tight">{product?.linux?.platform}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product?.linux?.osRequirement}</p>
                          </div>
                        </div>

                        {/* Spec rows */}
                        <div className="rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 text-sm">
                          {[
                            ["Version", product?.linux?.releaseDetails?.version],
                            ["File Size", product?.linux?.releaseDetails?.fileSize],
                            ["File Type", product?.linux?.releaseDetails?.fileType],
                            ["Architecture", product?.linux?.releaseDetails?.architecture],
                            ["Release", product?.linux?.releaseDetails?.releaseDate],
                          ].map(([label, value], i) => (
                            <div key={label} className={`flex justify-between items-center px-3 py-2 ${i % 2 === 0 ? "bg-slate-50 dark:bg-slate-800/40" : "bg-white dark:bg-slate-900"}`}>
                              <span className="text-slate-500 dark:text-slate-400 font-medium">{label}</span>
                              <span className="text-slate-800 dark:text-slate-200 font-semibold tabular-nums">{value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Download button */}
                        <div className="mt-auto pt-1">
                          <a href={product?.linux?.releaseDetails?.download} target="_blank" rel="noopener noreferrer">
                            <button className={`w-full py-3 px-6 rounded-lg font-semibold text-base flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 ${product?.brandColor ?? "bg-slate-800 hover:bg-slate-700 text-white"}`}>
                              <Download size={18} />
                              Download for Linux
                            </button>
                          </a>
                          <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-2">
                            {product?.linux?.fileName} · {product?.linux?.releaseDetails?.fileSize}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>{/* end cards grid */}

                  {/* Footer bar */}
                  <div className="w-full flex flex-wrap justify-between gap-4 items-center text-sm border-t border-slate-200 dark:border-slate-700 pt-4 mt-6">
                    <div className="flex gap-6 items-center">
                      <span className="text-slate-500 dark:text-slate-400">&copy; 2026 KOOMPI team</span>
                      <div className="flex gap-2">
                        {contact.map((item) => (
                          <a
                            key={item.name}
                            href={item.link}
                            target="_blank"
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <img src={item.icon} alt={item.name} className="size-5" />
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="group">
                      <a href="/" className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                        Sivchheng Kheang
                        <ExternalLink size={11} className="group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </div >
      </div >
      {showIfram && (
        <div className="fixed inset-0 w-full h-screen z-51 overflow-hidden">
          <div className="absolute inset-0 w-full h-screen z-52 flex flex-col items-center justify-center bg-slate-100 pt-14   ">
            <Navbar />
            {/* {showButton && (
              <button
                onClick={() => setShowIfram(false)}
                className=" absolute top-1 left-5 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary shadow-lg shadow-slate-300 border border-slate-300"
              >
                <X className="w-4 h-4 transition-transform duration-300 hover:rotate-90 text-primary" />
              </button>
            )} */}
            <iframe
              src={iframeUrl}
              title={product?.title}
              className=" w-full h-full rounded-xl shadow-2xl shadow-slate-500 "
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-fullscreen "
              onError={() => {/* suppress cross-origin iframe errors */ }}
            />
          </div>
        </div>
      )
      }
    </div >
  );
}
