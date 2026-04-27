"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { login as setSession, logout as clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await clearSession();
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Campos obrigatórios." };
  }

  try {
    const barber = await prisma.barber.findUnique({
      where: { email },
    });

    if (!barber) {
      return { error: "Usuário não encontrado." };
    }

    const isPasswordValid = await bcrypt.compare(password, barber.password);

    if (!isPasswordValid) {
      return { error: "Senha incorreta." };
    }

    await setSession({
      id: barber.id,
      name: barber.name,
      email: barber.email,
      shopName: barber.shopName,
      slug: barber.slug,
    });
  } catch (err: any) {
    console.error("ERRO NO LOGIN:", err);
    return { error: `Erro de conexão: ${err.message || "Tente novamente mais tarde"}` };
  }

  redirect("/");
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const shopName = formData.get("shopName") as string;

  if (!name || !email || !password || !shopName) {
    return { error: "Todos os campos são obrigatórios." };
  }

  try {
    const existing = await prisma.barber.findUnique({
      where: { email },
    });

    if (existing) {
      return { error: "Email já cadastrado." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const slug = shopName.toLowerCase().replace(/\s+/g, "-") + "-" + Math.random().toString(36).substring(2, 7);

    const barber = await prisma.barber.create({
      data: {
        name,
        email,
        password: hashedPassword,
        shopName,
        slug,
      },
    });

    await setSession({
      id: barber.id,
      name: barber.name,
      email: barber.email,
      shopName: barber.shopName,
      slug: barber.slug,
    });
  } catch (err: any) {
    console.error("ERRO NO REGISTRO:", err);
    return { error: `Erro ao criar conta: ${err.message}` };
  }

  redirect("/");
}
