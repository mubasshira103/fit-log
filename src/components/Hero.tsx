import Link from "next/link";
import { ArrowDown, Dumbbell } from "lucide-react";
import Image from "next/image";
import img from "../../public/assets/banner.png";
export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-6 lg:px-8">
      <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#22262f] bg-[#121419]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(200,255,0,0.06),transparent_32%)]" />
        <div className="relative z-10 flex min-h-[420px] items-center px-7 py-12 sm:px-12 lg:w-[67%] lg:px-14">
          <div>
            <p className="mb-5 text-[11px] font-black tracking-[0.25em] text-[#c8ff00]">WORKOUT LIBRARY</p>
            <h1 className="display-font max-w-3xl text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              Train with intent.
              <br />
              Log every set.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-6 text-[#8b909a] sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
              and watch the week&apos;s work add up.
            </p>
            <Link
              href="#library"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#c8ff00] px-5 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:brightness-95"
            >
              <ArrowDown className="h-4 w-4" />
              Browse workouts
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 top-0 hidden w-[43%] lg:block">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#121419_0%,transparent_38%),linear-gradient(0deg,rgba(18,20,25,.15),rgba(18,20,25,.15))]" />
          <Image
            src={img}
            alt="Workout illustration"
            className="h-full w-full object-cover object-center opacity-85"
          />
          <div className="absolute bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#c8ff00]/30 bg-[#c8ff00]/10">
            <Dumbbell className="h-6 w-6 text-[#c8ff00]" />
          </div>
        </div>
      </div>
    </section>
  );
}
