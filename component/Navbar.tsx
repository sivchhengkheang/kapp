import { Menu, Search } from "lucide-react";
import Image from "next/image";
import logo from "../public/kapp.png";

export default function Navbar() {
  return (
    <div className="fixed h-fit top-0 w-full max-w-full inset-0 px-16 py-2 flex justify-between gap-10 z-100 bg-background">
        <div className="flex gap-2 justify-center items-center text-black">
          <h1 className="font-bold text-3xl">Kapp</h1>
        </div>

        <div className="flex gap-2 items-center ">
          <button className="py-1 px-4 rounded-2xl hover:bg-muted-foreground hover:text-white ">
            Login
          </button>
          <button className="py-1 px-4 bg-dark-blue rounded-2xl border-2 text-white">
            Sign Up
          </button>
        </div>
    </div>
  );
}
