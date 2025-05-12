import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { timesOfDay } from "@/types/date";
import { Emoji } from "@/types/emoji";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatGreeting(date: Date): string {
  const hour = date.getHours(); 

  const timeOfDay = timesOfDay.find(({ from, to }) => from < to ? hour >= from && hour < to : hour >= from || hour < to);

  return `Good ${timeOfDay?.time || "Day"}`;
}


export function generateInviteCode(lenght: number = 6) {
  let inviteCode = "";
  
  for (let i = 0; i < lenght; i++) {
    inviteCode += Math.floor(Math.random() * 10);
  }

  return inviteCode;
}

export function generateOrganizationId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `org_${timestamp}_${randomPart}`;
}

export function splitIntoRows(array: Emoji[], itemPerRow: number) {
  const result = [];

  for (let i = 0; i < array.length; i += itemPerRow) {
    result.push(array.slice(i, i + itemPerRow));
  }

  return result;
}