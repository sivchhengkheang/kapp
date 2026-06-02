export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-slate-200/70 bg-white/95 px-4 py-4 backdrop-blur-xl shadow-sm shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/95">
    <div className="fixed h-fit top-0 w-full max-w-full inset-0 px-16 py-2 flex justify-between gap-10 z-100 bg-background">
        <div className="flex gap-2 justify-center items-center text-black">
          <h1 className="font-bold text-3xl">Kapp</h1>
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
