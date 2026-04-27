import type { Page,  } from "@playwright/test";
import { expect } from "@playwright/test";

export class BoardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForBoard() {
    await expect(this.page.getByText(/a fazer/i).first()).toBeVisible();
  }

  async createTask(title: string) {
    // Clica no + da coluna "A fazer" ou "Backlog"
    await this.page
      .getByRole("button", { name: /criar tarefa/i })
      .first()
      .click();

    const input = this.page.getByPlaceholder(/título da tarefa/i);
    await input.waitFor({ state: "visible" });
    await input.fill(title);
    await this.page.getByRole("button", { name: /salvar/i }).click();
  }

  async getTaskCard(title: string) {
    return this.page.getByText(title).first();
  }

  async openTaskModal(title: string) {
    await this.page.getByText(title).first().click();
    await expect(
      this.page.getByRole("dialog"),
    ).toBeVisible();
  }

  async getColumnCount(columnName: string) {
    const header = this.page.locator(`text=${columnName}`).first();
    const countEl = header.locator("..").getByText(/^\d+$/);
    return countEl.textContent();
  }
}