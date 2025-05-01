import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { timesOfDay } from "@/types/date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatGreeting(date: Date): string {
  const hour = date.getHours(); 

  const timeOfDay = timesOfDay.find(({ from, to }) => from < to ? hour >= from && hour < to : hour >= from || hour < to);

  return `Good ${timeOfDay?.time || "Day"}`;
}
