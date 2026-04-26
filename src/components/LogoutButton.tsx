"use client";

import { logout } from "@/lib/actions/auth";

export function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-error hover:bg-error/10 rounded-lg transition-colors"
      title="Sair do sistema"
    >
      <span className="material-symbols-outlined text-sm">logout</span>
      <span className="hidden sm:inline">SAIR</span>
    </button>
  );
}
