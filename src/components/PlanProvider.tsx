"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Workout } from "@/lib/types";

type PlanContextValue = {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextValue | null>(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

function getInitialData<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  // Lazy State Initialization
  const [plan, setPlan] = useState<Workout[]>(() => getInitialData(PLAN_KEY, []));
  const [saved, setSaved] = useState<Workout[]>(() => getInitialData(SAVED_KEY, []));
  const [doneIds, setDoneIds] = useState<number[]>(() => getInitialData(DONE_KEY, []));

  useEffect(() => {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem(DONE_KEY, JSON.stringify(doneIds));
  }, [doneIds]);

  const value = useMemo<PlanContextValue>(
    () => ({
      plan,
      saved,
      doneIds,
      addToPlan: (workout) => {
        if (plan.length >= 5 || plan.some((item) => item.id === workout.id)) return false;
        setPlan((current) => [...current, workout]);
        return true;
      },
      saveForLater: (workout) => {
        if (saved.some((item) => item.id === workout.id)) return false;
        setSaved((current) => [...current, workout]);
        return true;
      },
      removeFromPlan: (id) => {
        setPlan((current) => current.filter((item) => item.id !== id));
        setDoneIds((current) => current.filter((doneId) => doneId !== id));
      },
      removeFromSaved: (id) => {
        setSaved((current) => current.filter((item) => item.id !== id));
      },
      markDone: (id) => {
        setDoneIds((current) => (current.includes(id) ? current : [...current, id]));
      },
      isInPlan: (id) => plan.some((item) => item.id === id),
      isSaved: (id) => saved.some((item) => item.id === id)
    }),
    [plan, saved, doneIds]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider");
  return context;
}
