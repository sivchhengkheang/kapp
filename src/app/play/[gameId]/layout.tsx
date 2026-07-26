/**
 * Immersive gameplay layout — /play/[gameId]
 *
 * Intentionally minimal: inherits only the root <html>/<body> + AuthProvider
 * from app/layout.tsx. No Navbar, no Footer, no sidebar — just the game canvas.
 */
export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="play-layout h-full w-full">
      {children}
    </div>
  );
}
