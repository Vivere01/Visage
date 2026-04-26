"use client";

import { logout } from "@/lib/actions/auth";

export function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-white bg-red-600 hover:bg-red-700 rounded-full transition-all active:scale-95 shadow-lg shadow-red-600/20"
      title="Sair do sistema"
    >
      <span className="material-symbols-outlined text-[14px]">logout</span>
      <span className="tracking-tighter">SAIR</span>
    </button>
  );
}
