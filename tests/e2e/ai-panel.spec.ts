import { test, expect } from "@playwright/test";
import { ProjectsPage } from "./pages/projects.page";

test.use({ storageState: "tests/e2e/.auth/user.json" });

let projectId: string;

test.beforeEach(async ({ page }) => {
  const projectsPage = new ProjectsPage(page);
  const name = `Projeto IA ${Date.now()}`;
  await projectsPage.goto();
  await projectsPage.createProject(name);

  const match = page.url().match(/\/projects\/([^/]+)/);
  projectId = match?.[1] ?? "";
  expect(projectId).not.toBe("");
});

test.describe("Painel IA", () => {
  test("link Painel IA está visível no projeto", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Painel IA" }),
    ).toBeVisible({ timeout: 8_000 });
  });

  test("navega para o painel IA", async ({ page }) => {
    await page.getByRole("link", { name: "Painel IA" }).click();

    await expect(
      page.getByRole("heading", { name: "Painel IA" }),
    ).toBeVisible({ timeout: 8_000 });
  });

  test("painel IA exibe card Resumo do projeto", async ({ page }) => {
    await page.getByRole("link", { name: "Painel IA" }).click();

    await expect(page.getByText("Resumo do projeto")).toBeVisible({ timeout: 8_000 });
  });

  test("painel IA exibe card Detecção de gargalos", async ({ page }) => {
    await page.getByRole("link", { name: "Painel IA" }).click();

    await expect(page.getByText("Detecção de gargalos")).toBeVisible({ timeout: 8_000 });
  });

  test("botão Gerar resumo está clicável", async ({ page }) => {
    await page.getByRole("link", { name: "Painel IA" }).click();

    const btn = page.getByRole("button", { name: "Gerar resumo" });
    await expect(btn).toBeVisible({ timeout: 8_000 });
    await expect(btn).toBeEnabled();
  });

  test("botão Detectar gargalos está clicável", async ({ page }) => {
    await page.getByRole("link", { name: "Painel IA" }).click();

    const btn = page.getByRole("button", { name: "Detectar gargalos" });
    await expect(btn).toBeVisible({ timeout: 8_000 });
    await expect(btn).toBeEnabled();
  });
});