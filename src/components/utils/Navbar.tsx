import Link from "next/link";
import { TransitionLink } from "./TransitionLink";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);


  useEffect(() => {
    document.documentElement.classList.remove('overflow-hidden', 'h-screen');
    document.body.classList.remove('overflow-hidden', 'h-screen');
  }, [pathname]);
  return (
    <header className={`fixed top-0  w-full m-auto inset-x-0 z-50 bg-slate-50/90 backdrop-blur-2xl`}>
      <div className="max-w-7xl m-auto inset-x-0 flex items-center justify-between  py-2 px-3`">
        <div className="flex gap-2 justify-center items-center text-black">
          <Link href={"/#"} className="font-bold text-3xl">
            Kapp
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
            Login
          </button>
          <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
