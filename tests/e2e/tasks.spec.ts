import { test, expect } from "@playwright/test";
import { ProjectsPage } from "./pages/projects.page";
import { TasksPage } from "./pages/tasks.page";

test.use({ storageState: "tests/e2e/.auth/user.json" });

const BASE_TASK = `Task E2E ${Date.now()}`;

test.beforeEach(async ({ page }) => {
  const projectsPage = new ProjectsPage(page);
  await projectsPage.goto();
  await projectsPage.createProject(`Projeto Tarefas ${Date.now()}`);

  const tasks = new TasksPage(page);
  await tasks.createTask(BASE_TASK);
});

test("cria uma tarefa no board", async ({ page }) => {
  const tasks = new TasksPage(page);
  const name = `Nova Tarefa ${Date.now()}`;

  await tasks.createTask(name);

  await expect(
    page.getByRole("button", { name: new RegExp(name) }).first(),
  ).toBeVisible({ timeout: 8_000 });
});

test("abre modal ao clicar na tarefa", async ({ page }) => {
  const tasks = new TasksPage(page);

  await tasks.openTask(new RegExp(BASE_TASK));

  await expect(tasks.closeModalButton).toBeVisible({ timeout: 8_000 });
});

test("fecha modal com botão Close", async ({ page }) => {
  const tasks = new TasksPage(page);

  await tasks.openTask(new RegExp(BASE_TASK));
  await expect(tasks.closeModalButton).toBeVisible({ timeout: 8_000 });

  await tasks.closeModal();

  await expect(tasks.closeModalButton).not.toBeVisible({ timeout: 5_000 });
});

test("fecha modal com Escape", async ({ page }) => {
  const tasks = new TasksPage(page);

  await tasks.openTask(new RegExp(BASE_TASK));
  await expect(tasks.closeModalButton).toBeVisible({ timeout: 8_000 });

  await page.keyboard.press("Escape");

  await expect(tasks.closeModalButton).not.toBeVisible({ timeout: 5_000 });
});

test("muda status da tarefa pelo modal", async ({ page }) => {
  const tasks = new TasksPage(page);

  await tasks.openTask(new RegExp(BASE_TASK));
  await expect(tasks.closeModalButton).toBeVisible({ timeout: 8_000 });

  await tasks.changeStatus("Em andamento");

  await tasks.closeModal();
});