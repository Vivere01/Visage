import { nanoid } from "nanoid";

/**
 * Gera um slug curto e URL-safe (8 chars)
 */
export function generateSlug(): string {
  return nanoid(8);
}

/**
 * Formata data para pt-BR
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Gera link do WhatsApp
 */
export function whatsappLink(phone: string, message?: string): string {
  const clean = phone.replace(/\D/g, "");
  const base = `https://wa.me/${clean}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Classname merge helper (sem dependência externa)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
