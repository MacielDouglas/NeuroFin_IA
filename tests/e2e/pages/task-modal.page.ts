import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class TaskModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get dialog() {
    return this.page.getByRole("dialog");
  }

  async waitForOpen(title: string) {
    await expect(this.dialog).toBeVisible();
    await expect(this.dialog.getByRole("heading", { name: title })).toBeVisible();
  }

  async changeStatus(status: string) {
    await this.dialog.getByRole("combobox").first().click();
    await this.page.getByRole("option", { name: status }).click();
  }

  async addDescription(text: string) {
    await this.dialog.getByText(/clique para adicionar/i).click();
    await this.dialog.getByRole("textbox").fill(text);
    await this.dialog.getByRole("button", { name: /salvar/i }).first().click();
  }

  async addSubtask(title: string) {
    await this.dialog.getByRole("button", { name: /adicionar subtarefa/i }).click();
    const input = this.dialog.getByPlaceholder(/título da subtarefa/i);
    await input.waitFor({ state: "visible" });
    await input.fill(title);
    await this.dialog.getByRole("button", { name: /salvar/i }).last().click();
  }

  async close() {
    await this.page.keyboard.press("Escape");
    await expect(this.dialog).not.toBeVisible();
  }
}