import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";
import Image from "next/image";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group overflow-hidden rounded-xl border border-[#242832] bg-[#111318] transition duration-200 hover:-translate-y-1 hover:border-[#3a404b]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#171a20]">
        <Image
          src={workout.image}
          alt={workout.name}
          width={240}
          height={240}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#c8ff00] px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-black"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="display-font text-xl uppercase leading-none">{workout.name}</h3>
        <p className="mt-2 text-xs text-[#7f8590]">{workout.equipment}</p>
        <div className="mt-5 flex items-center gap-4 border-t border-[#232730] pt-4 text-[11px] font-semibold text-[#838994]">
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-[#a0a5af]" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-[#c8ff00]" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-[#c8ff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
