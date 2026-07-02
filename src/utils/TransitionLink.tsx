import { getHmrRefreshHash } from "next/dist/server/app-render/work-unit-async-storage.external";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
  children,
  href,
  ...prop
}: TransitionLinkProps) => {
  const route = useRouter();

  const handleTransition = async (e: any) => {
    e.preventDefault();

    const body = document.querySelector("body");
    body?.classList.add("page-transition");

    await sleep(100);

    route.push(href);

    await sleep(500);

    body?.classList.remove("page-transition");
  };
  return (
    <Link onClick={handleTransition} href={href} {...prop}>
      {children}
    </Link>
  );
};
