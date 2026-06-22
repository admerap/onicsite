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

// Round number to 2 decimal places
export function round2(value: number | string): number {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((parseFloat(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value must be a number or a string");
  }
}

export function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return JSON.stringify(error);
}
