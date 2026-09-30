import Image from "next/image";

export default function LoadingScreen({ title, coverSrc }: { title: string; coverSrc: string }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white dark:bg-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <Image src={coverSrc} alt="" fill className="object-cover opacity-10 scale-110 blur-2xl" aria-hidden="true" sizes="100vw" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-white/10" />
          <div className="absolute w-16 h-16 rounded-full border-t-2 border-teal-500 dark:border-teal-400 animate-spin" />
          <div className="absolute w-10 h-10 rounded-full border-b-2 border-indigo-500 dark:border-indigo-400 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
        </div>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400 mb-1">Loading Game</p>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">{title}</h1>
        </div>
        <div className="w-48 h-0.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 animate-[progress_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
