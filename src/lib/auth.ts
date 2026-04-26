import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// This is a simplified auth for the demonstration
// In a real app, use NextAuth.js or a robust JWT solution

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return JSON.parse(session);
}

export async function login(user: any) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set("session", JSON.stringify(user), { expires, httpOnly: true });
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
  redirect("/login");
}
