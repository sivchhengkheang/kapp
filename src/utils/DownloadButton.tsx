"use client";

import { useRef } from "react";

export default function DownloadButton({ className }: { className?: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = async () => {
    const response = await fetch("/api/download");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = "example.pdf";
      linkRef.current.click();
      // Revoke the URL after a short delay to allow download to start
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    }
  };

  return (
    <>
      <a ref={linkRef}>
        <button onClick={handleDownload} className={className}>
          download file
        </button>
      </a>
    </>
  );
}
