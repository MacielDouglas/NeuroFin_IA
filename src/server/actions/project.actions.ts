"use server";

import { AppError } from "@/lib/errors/app-error";
import { fail, ok } from "@/lib/errors/action-result";
import { createProjectSchema, updateProjectSchema } from "@/lib/validations/project";
import { getServerSession } from "@/lib/auth/session";
import { projectService } from "@/server/services/project.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { firstIssue } from "@/lib/validations/parse-error";

export async function createProjectAction(formData: FormData) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  const parsed = createProjectSchema.safeParse(raw);
  if (!parsed.success) {
    return fail(parsed.error.issues[0].message, "VALIDATION_ERROR");
  }

  try {
    const project = await projectService.create(parsed.data, session.user.id);
    revalidatePath("/projects");
    return ok(project);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao criar projeto");
  }
}

export async function updateProjectAction(id: string, formData: FormData) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
  };

  const parsed = updateProjectSchema.safeParse(raw);
if (!parsed.success) {
  return fail(firstIssue(parsed.error), "VALIDATION_ERROR");
}

  try {
    const project = await projectService.update(id, parsed.data, session.user.id);
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    return ok(project);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao atualizar projeto");
  }
}

export async function archiveProjectAction(id: string) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  try {
    await projectService.archive(id, session.user.id);
    revalidatePath("/projects");
    redirect("/projects");
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao arquivar projeto");
  }
}