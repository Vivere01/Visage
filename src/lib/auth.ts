import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// This is a simplified auth for the demonstration
// In a real app, use NextAuth.js or a robust JWT solution

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  shopName: string;
  slug: string;
}

export async function getSession(): Promise<SessionUser | null> {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export async function login(user: SessionUser) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set("session", JSON.stringify(user), { expires, httpOnly: true });
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
  redirect("/login");
}
