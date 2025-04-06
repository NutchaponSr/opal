import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cuid() {
  const timestamp = Date.now().toString(36);

  let counter = 0;
  const count = (counter++).toString(36);

  const random = Array.from({ length: 8 }, () => Math.random().toString(36).substring(2, 3)).join("");

  return "c" + timestamp + count + random;
}