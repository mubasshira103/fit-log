"use client";

import { useMemo, useState } from "react";
import { Bookmark, CheckCircle2, Clock3, Dumbbell, Flame, ListFilter, Star } from "lucide-react";

import type { SortKey, Workout } from "@/lib/types";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import { usePlan } from "@/components/PlanProvider";
import Link from "next/link";

type Tab = "plan" | "saved";

export default function MyPlanClient() {
  const { plan, saved, doneIds, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortKey>("duration");

  const current = tab === "plan" ? plan : saved;

  const sorted = useMemo(() => {
    return [...current].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
      return a.duration - b.duration;
    });
  }, [current, sort]);

  const metrics = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((sum, item) => sum + item.duration, 0),
      calories: plan.reduce((sum, item) => sum + item.caloriesBurned, 0)
    }),
    [plan]
  );

  function handleRemove(id: number) {
    if (tab === "plan") {
      removeFromPlan(id);
      alert("Removed from today's plan");
    } else {
      removeFromSaved(id);
      alert("Removed from saved");
    }
  }

  function handleDone(id: number) {
    markDone(id);
    alert("Workout marked as done");
  }

  return (
    <div className="min-h-screen bg-[#08090b] text-white">
      <main className="mx-auto max-w-[1280px] px-5 py-10 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-[10px] font-black tracking-[0.24em] text-[#c8ff00]">YOUR TRAINING LOG</p>
          <h1 className="display-font text-5xl uppercase sm:text-6xl">My Plan</h1>
          <p className="mt-3 text-sm text-[#777d88]">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#242832] bg-[#111318] sm:grid-cols-3">
          <Metric icon={<Dumbbell />} label="Exercises" value={metrics.exercises} />
          <Metric icon={<Clock3 />} label="Minutes" value={metrics.minutes} />
          <Metric icon={<Flame />} label="Calories" value={metrics.calories} />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-b border-[#20232a] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-lg bg-[#111318] p-1">
            <button
              onClick={() => setTab("plan")}
              className={`rounded-md px-4 py-2.5 text-[10px] font-black uppercase transition ${
                tab === "plan" ? "bg-[#c8ff00] text-black" : "text-[#777d88] hover:text-white"
              }`}
            >
              Today&apos s Plan
            </button>
            <button
              onClick={() => setTab("saved")}
              className={`rounded-md px-4 py-2.5 text-[10px] font-black uppercase transition ${
                tab === "saved" ? "bg-[#c8ff00] text-black" : "text-[#777d88] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <label className="flex items-center gap-2 text-[10px] font-black uppercase text-[#6f7580]">
            <ListFilter className="h-4 w-4" />
            Sort By
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="rounded-md border border-[#30343d] bg-[#111318] px-3 py-2 text-[10px] font-bold text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        <section className="mt-5">
          {sorted.length === 0 ? (
            <EmptyState tab={tab} />
          ) : (
            <div className="space-y-3">
              {sorted.map((workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  savedTab={tab === "saved"}
                  done={doneIds.includes(workout.id)}
                  onRemove={handleRemove}
                  onDone={handleDone}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Metric({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="border-b border-[#242832] px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#666c77]">
        <span className="text-[#c8ff00]">{icon}</span>
        {label}
      </div>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
    </div>
  );
}

function EmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-[#242832] bg-[#101217] px-5 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#30343d] text-[#c8ff00]">
        {tab === "plan" ? <Dumbbell className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
      </div>
      <h2 className="display-font mt-5 text-3xl uppercase">Nothing here yet</h2>
      <p className="mt-2 max-w-sm text-xs leading-5 text-[#777d88]">
        Browse the library and add a lift to get today moving.
      </p>
      <Link href="/" className="mt-6 rounded-md bg-[#c8ff00] px-5 py-3 text-[10px] font-black uppercase text-black">
        Go to workouts
      </Link>
    </div>
  );
}
