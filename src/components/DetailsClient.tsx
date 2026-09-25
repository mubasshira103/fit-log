'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  ListChecks,
  Star,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getWorkout } from '@/lib/api';
import type { Workout } from '@/lib/types';
import { usePlan } from './PlanProvider';

export default function DetailsClient({ id }: { id: string }) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, saveForLater, isInPlan, isSaved, plan } = usePlan();

  useEffect(() => {
    getWorkout(id)
      .then(setWorkout)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090b] text-white">

        <div className="flex min-h-[70vh] items-center justify-center">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-[#30343c] border-t-[#c8ff00]" />
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#08090b] text-white">

        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
          <p className="text-xs font-black tracking-[0.25em] text-[#c8ff00]">404</p>
          <h1 className="display-font mt-3 text-5xl uppercase">Workout not found</h1>
          <Link
            href="/"
            className="mt-7 rounded-md bg-[#c8ff00] px-5 py-3 text-xs font-black uppercase text-black"
          >
            Back to workouts
          </Link>
        </div>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planFull = plan.length >= 5 && !inPlan;

  function handlePlan() {
    if (!workout) return;

    const added = addToPlan(workout);
    if (added) toast.success("Added to today's plan");
    else if (planFull) toast.error("Today's plan is full — maximum 5 lifts.");
    else toast("This workout is already in today's plan.");
  }

  function handleSave() {
    if (!workout) return;

    const added = saveForLater(workout);
    if (added) toast.success('Saved for later');
    else toast('This workout is already saved.');
  }

  return (
    <div className="min-h-screen bg-[#08090b] text-white">
      <main className="mx-auto max-w-[1280px] px-5 py-7 lg:px-8 lg:py-10">
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-[#858b98] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to library
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-[#242832] bg-[#111318]">
            <div className="aspect-[4/5] h-full max-h-[720px]">
              <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[10px] font-black tracking-[0.24em] text-[#777d88]">
              WORKOUT DETAILS
            </p>
            <h1 className="display-font text-5xl uppercase leading-[0.95] sm:text-6xl">
              {workout.name}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#858b98]">{workout.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#c8ff00] px-3 py-1.5 text-[10px] font-black uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="mt-7 overflow-hidden rounded-xl border border-[#242832] bg-[#111419]">
              {[
                ['Equipment', workout.equipment],
                ['Difficulty', workout.difficulty],
                ['Sets', String(workout.sets)],
                ['Reps', workout.reps],
                ['Duration', `${workout.duration} min`],
                ['Calories', `${workout.caloriesBurned} kcal`],
                ['Rating', String(workout.rating)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-[#22262e] px-5 py-3.5 last:border-b-0"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#676d78]">
                    {label}
                  </span>
                  <span className="text-xs font-bold text-[#e8e9eb]">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-[#c8ff00]" />
                <h2 className="text-xs font-black uppercase tracking-[0.18em]">Instructions</h2>
              </div>
              <ol className="space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li key={instruction} className="flex gap-4 text-sm leading-6 text-[#90959f]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#30343d] text-[10px] font-black text-[#c8ff00]">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handlePlan}
                disabled={inPlan || planFull}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#c8ff00] px-5 py-3.5 text-xs font-black uppercase tracking-wide text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {inPlan ? <Check className="h-4 w-4" /> : <Dumbbell className="h-4 w-4" />}
                {inPlan
                  ? "Added to today's plan"
                  : planFull
                    ? 'Plan is full'
                    : "Add to today's plan"}
              </button>
              <button
                onClick={handleSave}
                disabled={saved}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#30343d] px-5 py-3.5 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#c8ff00] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Bookmark className="h-4 w-4" />
                {saved ? 'Saved' : 'Save for later'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
