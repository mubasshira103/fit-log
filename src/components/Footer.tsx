import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1f26] bg-[#090a0d]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-7 text-xs text-[#737985] sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-2 font-black text-white">
          <Dumbbell className="h-4 w-4 -rotate-12 text-[#c8ff00]" />
          FITLOG
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}