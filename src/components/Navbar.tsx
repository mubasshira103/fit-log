"use client";

import Link from "next/link";
import { Dumbbell, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlan } from "./PlanProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { plan, saved } = usePlan();

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c1f26] bg-[#090a0d]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <Link href="/" onClick={close} className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center text-[#c8ff00]">
            <Dumbbell className="h-6 w-6 -rotate-12" />
          </span>
          <span className="text-lg font-black tracking-tight">FITLOG</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
              pathname === "/" ? "bg-[#182008] text-[#c8ff00]" : "text-[#858b98] hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
              pathname === "/my-plan" ? "bg-[#182008] text-[#c8ff00]" : "text-[#858b98] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/my-plan" className="flex items-center gap-2 text-xs font-bold text-white">
            Plan
            <span
              suppressHydrationWarning
              className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#c8ff00] px-1.5 text-[11px] font-black text-black"
            >
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 text-xs font-bold text-white">
            Saved
            <span
              suppressHydrationWarning
              className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#343943] px-1.5 text-[11px] font-black text-[#d8dbe0]"
            >
              {saved.length}
            </span>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-[#292d35] p-2 text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#1c1f26] bg-[#0b0c10] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={close}
              className={`rounded-lg px-4 py-3 text-sm font-bold ${
                pathname === "/" ? "bg-[#182008] text-[#c8ff00]" : "text-white"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={close}
              className={`rounded-lg px-4 py-3 text-sm font-bold ${
                pathname === "/my-plan" ? "bg-[#182008] text-[#c8ff00]" : "text-white"
              }`}
            >
              My Plan
            </Link>
            <div className="mt-2 flex gap-3 border-t border-[#20232a] pt-4">
              <Link href="/my-plan" onClick={close} className="flex items-center gap-2 text-xs font-bold">
                Plan{" "}
                <span suppressHydrationWarning className="rounded-full bg-[#c8ff00] px-2 py-1 text-black">
                  {plan.length}
                </span>
              </Link>
              <Link href="/my-plan" onClick={close} className="flex items-center gap-2 text-xs font-bold">
                Saved{" "}
                <span suppressHydrationWarning className="rounded-full border border-[#343943] px-2 py-1">
                  {saved.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
