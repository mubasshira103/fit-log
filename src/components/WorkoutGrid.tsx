"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/lib/types";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutGrid() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="library" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-16 lg:px-8">
      <div className="mb-7">
        <h2 className="display-font text-4xl uppercase sm:text-5xl">The Library</h2>
        <p className="mt-2 text-sm text-[#7f8590]">Twelve lifts covering every major muscle group.</p>
      </div>

      {loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-[#242832] bg-[#101217]">
          <div className="flex flex-col items-center gap-4">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-[#323640] border-t-[#c8ff00]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#777d88]">Loading workouts…</p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8 text-center text-sm text-red-300">
          Could not load workouts. Please refresh and try again.
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
