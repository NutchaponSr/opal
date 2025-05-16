import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { timesOfDay } from "@/types/date";
import { EmojiData, EmojiItem } from "@/types/emoji";

import emojisData from "@/constants/emojis.json";

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

export function getEmojis() {
  const emojiObject = emojisData as EmojiData;

  const emojis = Object.entries(emojiObject.emojis).reduce((acc, [category, subCategory]) => {
    acc[category] = Object.values(subCategory).flatMap((emojiList) =>
      emojiList.map((emoji: EmojiItem) => ({
        name: emoji.name,
        emoji: emoji.emoji,
      }))
    );

    return acc;
  }, {} as Record<string, { emoji: string; name: string }[]>);

  return Object.entries(emojis).map(([category, emojis]) => ({
    label: category,
    emojis
  }));
}