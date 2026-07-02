import type { Metadata } from "next";
import { PRODUCT_DATA } from "@/src/constants";

type Props = {
    params: Promise<{ game: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { game } = await params;
    const product = PRODUCT_DATA.find((p) => p.id === game);

    return {
        title: product?.title || `Game Details`,
        description: product?.description || "View game details and download.",
    };
}

export default function GameLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
