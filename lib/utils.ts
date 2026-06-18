import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular js object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(value: number): string {
  const [integerPart, decimalPart] = value.toString().split(".");
  return decimalPart
    ? `${integerPart}.${decimalPart.slice(0, 2)}`
    : integerPart;
}
