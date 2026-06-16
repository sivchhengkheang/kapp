"use client";
import {
  FaFacebook,
  FaGithub,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";
import { ExternalLink, Heart } from "lucide-react";
export function Footer() {
  const contact = [
    {
      icon: "../../facebook.svg",
      name: "facebook",
      link: "https://facebook.com/koompi",
    },
    {
      icon: "../../github.svg",
      name: "github",
      link: "https://github.com/koompi",
    },
    {
      icon: "../../telegram.svg",
      name: "telegram",
      link: "https://t.me/koompi",
    },
    {
      icon: "../../instagram.svg",
      name: "instagram",
      link: "https://instagram.com/koompi official",
    },
  ];
  return (
    <footer className="pb-9 w-full  m-auto justify-center items-center text-center">
      <div className="w-7xl m-auto flex justify-between gap-10 items-center text-lg border-b-2 border-primary/50 pb-4">
        <div className="flex gap-10 items-center text-start">
          <span className="flex items-center gap-1">Built with <Heart className="size-5 text-rose-500" fill="red" /> by
            <a href="https://koompi.com" target="_blank" className="hover:scale-110 transition-all duration-300">
              <img src="/koompi-footer.png" alt="koompi" width={100} height={100} />
            </a>
            for next generation of builders.</span>
          <div className="flex gap-2">
            {contact.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                className="hover:shadow-2xl hover:shadow-cyan-100 hover:scale-110"
              >
                <img src={item.icon} alt="icon" className="size-6" />
              </a>
            ))}
          </div>
        </div>
        <div className=" group ">
          <a href="https://github.com/sivchhengkheang" target="_blank" className="flex gap-1 ">
            Sivchheng Kheang{" "}
            <ExternalLink
              size={12}
              className="font-bold group-hover:scale-110  "
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
