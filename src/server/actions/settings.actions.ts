"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/authorize";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/lib/prisma/client";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres").max(60),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Informe a senha atual"),
    newPassword: z.string().min(8, "Nova senha deve ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export async function updateProfile(_: unknown, formData: FormData) {
  const session = await requireSession();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parsed.success) {
    // ✅ Zod 4: .issues em vez de .errors
    return { error: parsed.error.issues[0].message };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name },
  });

  revalidatePath("/settings");
  return { success: "Perfil atualizado com sucesso." };
}

export async function changePassword(_: unknown, formData: FormData) {
  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // ✅ Better Auth não retorna .error — usa try/catch
  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
      },
    });
  } catch {
    return { error: "Senha atual incorreta." };
  }

  return { success: "Senha alterada com sucesso." };
}

export async function deleteAccount() {
  const session = await requireSession();

  await prisma.user.delete({ where: { id: session.user.id } });

  await auth.api.signOut({ headers: await headers() });

  redirect("/sign-in");
}