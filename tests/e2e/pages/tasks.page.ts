import type { Page, Locator } from "@playwright/test";

export class TasksPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get createTaskButton(): Locator {
    return this.page.getByRole("button", { name: "Criar tarefa" }).first();
  }

  get taskNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Título da tarefa..." });
  }

  get saveTaskButton(): Locator {
    return this.page.getByRole("button", { name: "Salvar" });
  }

  get closeModalButton(): Locator {
    return this.page.getByRole("button", { name: "Close" }).last();
  }


  get statusCombobox(): Locator {
    return this.page
      .getByRole("combobox")
      .filter({ hasText: "A fazer" });
  }

  async createTask(name: string) {
    await this.createTaskButton.click();
    await this.taskNameInput.fill(name);
    await this.saveTaskButton.click();
  }

  async openTask(namePattern: string | RegExp) {
    await this.page
      .getByRole("button", { name: namePattern })
      .first()
      .click();
  }

  async closeModal() {
    try {
      await this.closeModalButton.click({ timeout: 3_000 });
    } catch {
      await this.page.keyboard.press("Escape");
    }
  }

 
async changeStatus(newStatus: string) {
  // 1. Abre o dropdown clicando no trigger
  await this.page
    .getByRole("combobox")
    .filter({ hasText: "A fazer" })
    .click();

  await this.page
    .getByLabel(newStatus)
    .getByText(newStatus)
    .click();
}
}