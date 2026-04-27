import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export class ProjectsPage {
  readonly page: Page;
  readonly newProjectButton: Locator;
  readonly projectNameInput: Locator;
  readonly projectDescInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // ← É um link, não um button
    this.newProjectButton = page.getByRole("link", { name: "Novo projeto" });

    this.projectNameInput = page.getByRole("textbox", { name: "Nome do projeto" });
    this.projectDescInput = page.getByRole("textbox", { name: "Descrição" });

    // Botão de submit dentro do dialog
    this.submitButton = page.getByRole("button", { name: "Criar projeto" });
  }

  async goto() {
    await this.page.goto("/projects");
    await this.page.waitForLoadState("networkidle");
    await expect(
      this.page.getByRole("heading", { name: "Projetos" }),
    ).toBeVisible();
  }

  async createProject(name: string, description?: string) {
    await this.newProjectButton.click();

    // Aguarda o form/dialog abrir
    await this.projectNameInput.waitFor({ state: "visible", timeout: 8_000 });

    await this.projectNameInput.fill(name);

    if (description) {
      await this.projectDescInput.fill(description);
    }

    await this.submitButton.click();

    // Aguarda redirecionar para o board do projeto
    await this.page.waitForURL("**/projects/**", { timeout: 15_000 });
  }

  async getProjectCard(name: string) {
    return this.page.getByRole("heading", { name }).first();
  }
}