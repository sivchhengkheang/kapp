"use client";
import {
  FaFacebook,
  FaGithub,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";
import { ExternalLink } from "lucide-react";
export function Footer() {
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
    <footer className="pb-9 w-full  m-auto justify-center items-center text-center">
      <div className="w-7xl m-auto flex justify-between gap-10 items-center text-lg border-b-2 border-primary/50 pb-4">
        <div className="flex gap-10 items-center text-start">
          <span>&copy; 2026 serve by KOOMPI team </span>
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
          <a href="/" className="flex gap-1 ">
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
