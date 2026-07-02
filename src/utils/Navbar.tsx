import Link from "next/link";
import { TransitionLink } from "./TransitionLink";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuthModel from "./AuthModel";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine, Signal } from "lucide-react";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isAuthModelOpen, setIsAuthModelOpen] = useState(false);


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
    if (isAuthModelOpen) {
      document.documentElement.classList.add('overflow-hidden', 'h-screen');
      document.body.classList.add('overflow-hidden', 'h-screen');
    } else {
      document.documentElement.classList.remove('overflow-hidden', 'h-screen');
      document.body.classList.remove('overflow-hidden', 'h-screen');
    }
  }, [isAuthModelOpen]);


  const handleLogin = () => {
    setIsAuthModelOpen(true);
  }

  useEffect(() => {
    document.documentElement.classList.remove('overflow-hidden', 'h-screen');
    document.body.classList.remove('overflow-hidden', 'h-screen');
  }, [pathname]);
  return (
    <>
      <header className={`fixed top-0  w-full m-auto inset-x-0 z-50 bg-slate-50/90 backdrop-blur-2xl`}>
        <div className="max-w-7xl m-auto inset-x-0 flex items-center justify-between  py-2 px-3`">
          <div className="flex gap-2 justify-center items-center text-black">
            <Link href={"/#"} className="font-bold text-3xl">
              Kapp
            </Link>
          </div>

          {/* <div className="flex items-center gap-3">
            <button onClick={handleLogin} className="rounded-full flex items-center gap-1  flex-row group border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
              Login
              <ArrowRightFromLine className="w-4 h-4 group-hover:translate-x-1 transition-all duration-200" />
            </button>

          </div> */}

        </div>

      </header>
      {isAuthModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-100/80 backdrop-blur-sm">
          <AuthModel onClose={() => setIsAuthModelOpen(false)} />
        </div>
      )}
    </>
  );
}
