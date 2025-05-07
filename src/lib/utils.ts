// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilidad para unir clases de Tailwind de forma condicional.
 * Elimina conflictos entre clases como 'px-4' y 'px-6'.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
