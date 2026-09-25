import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#08090b] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#30343d] bg-[#111319]">
          <Dumbbell className="h-7 w-7 text-[#c8ff00]" />
        </div>
        <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#c8ff00]">404</p>
        <h1 className="display-font text-5xl uppercase sm:text-7xl">Page not found</h1>
        <p className="mt-5 max-w-md text-sm leading-6 text-[#858b98]">
          This route does not exist. Head back to the workout library and keep training.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#c8ff00] px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:brightness-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to workouts
        </Link>
      </div>
    </main>
  );
}