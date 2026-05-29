import { Menu, Search } from "lucide-react";
import Image from "next/image";
import logo from "../public/kapp.png";

export default function Navbar() {
  return (
    <div className="w-full max-w-full inset-0 px-4 py-2 flex justify-between gap-10 z-100 bg-gray-300">
      <div className="flex gap-2 justify-center items-center text-black">
        <Menu className="" />
        <h1 className="font-bold text-3xl">Kapp</h1>
      </div>

      <div className="p-2 border border-blue rounded-2xl ">
        <form action="search" className="flex justify-start gap-2">
          <div className="">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Type To Search"
            className="w-full h-full outline-none pl-1.5"
          />
        </form>
      </div>

      <div className="flex gap-2 items-center ">
        <button className="py-1 px-4 rounded-2xl hover:bg-muted-foreground hover:text-white ">Login</button>
        <button className="py-1 px-4 bg-dark-blue rounded-2xl border-2 text-white">
          Sign Up
        </button>
      </div>
    </div>
  );
}
