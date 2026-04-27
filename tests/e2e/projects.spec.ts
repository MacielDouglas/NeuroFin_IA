import { test, expect } from "@playwright/test";
import { ProjectsPage } from "./pages/projects.page";
import { BoardPage } from "./pages/board.page";

test.describe("Projetos", () => {
  test("lista projetos existentes", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();

    // Deve mostrar pelo menos o cabeçalho
    await expect(page.getByRole("heading", { name: /projetos/i })).toBeVisible();
  });

  test("cria um novo projeto e redireciona para o board", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    const projectName = `Projeto E2E ${Date.now()}`;

    await projectsPage.goto();
    await projectsPage.createProject(projectName, "Projeto criado pelo Playwright");

    // Deve estar no board do projeto
    await expect(page).toHaveURL(/\/projects\/.+/);

    const board = new BoardPage(page);
    await board.waitForBoard();

    // Nome do projeto aparece no header
    await expect(page.getByText(projectName)).toBeVisible();
  });

test("exibe informações do projeto na listagem", async ({ page }) => {
  const projectsPage = new ProjectsPage(page);
  await projectsPage.goto();

  // Os cards são links para os projetos — verifica que existe pelo menos um
  await expect(
    page.getByRole("link", { name: "Novo projeto" }),
  ).toBeVisible();

  // Verifica que há pelo menos um card de projeto na listagem
  await expect(page.locator(".group\\/card").first()).toBeVisible();
});

  test("exibe badge de status do projeto", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();
    await expect(page.getByText(/ativo/i).first()).toBeVisible();
  });
});