"use client";

import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import type { Workout } from "@/lib/types";

type Props = {
  workout: Workout;
  savedTab: boolean;
  done: boolean;
  onRemove: (id: number) => void;
  onDone: (id: number) => void;
};

export default function PlanWorkoutCard({ workout, savedTab, done, onRemove, onDone }: Props) {
  return (
    <div className={`rounded-xl border bg-[#111318] p-3 transition ${done ? "border-[#c8ff00]/30" : "border-[#242832]"}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-24 w-full shrink-0 overflow-hidden rounded-lg sm:w-36">
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {workout.muscleGroups.slice(0, 2).map((group) => (
              <span key={group} className="rounded-full bg-[#c8ff00] px-2 py-0.5 text-[8px] font-black uppercase text-black">
                {group}
              </span>
            ))}
          </div>
          <h3 className="display-font mt-2 text-xl uppercase">{workout.name}</h3>
          <p className="mt-1 text-xs text-[#777d88]">{workout.equipment}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] font-bold text-[#818792]">
            <span className="flex items-center gap-1"><Clock3 className="h-3 w-3" />{workout.duration} min</span>
            <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-[#c8ff00]" />{workout.caloriesBurned} kcal</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-[#c8ff00]" />{workout.rating}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          <Link
            href={`/workouts/${workout.id}`}
            className="rounded-md border border-[#30343d] px-3 py-2 text-[10px] font-black uppercase text-white hover:border-[#c8ff00]"
          >
            View Details
          </Link>

          {!savedTab && (
            <button
              onClick={() => onDone(workout.id)}
              disabled={done}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#c8ff00] px-3 py-2 text-[10px] font-black uppercase text-black disabled:opacity-45"
            >
              <Check className="h-3 w-3" />
              {done ? "Done" : "Mark as Done"}
            </button>
          )}

          <button
            aria-label={`Remove ${workout.name}`}
            onClick={() => onRemove(workout.id)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#30343d] text-[#8b909a] hover:border-red-500 hover:text-red-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}