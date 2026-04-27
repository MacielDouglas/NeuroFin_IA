import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Autenticação", () => {
  test("redireciona para login quando não autenticado", async ({ page }) => {
    await page.goto("/dashboard");
    // Better Auth redireciona para / ou /login — ajustar conforme comportamento real
    await expect(page).not.toHaveURL(/\/dashboard/);
  });

  test("exibe erro com credenciais inválidas", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Entrar" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill("invalido@teste.com");
    await page.getByRole("textbox", { name: "Senha" }).fill("senhaerrada");
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(
  page.getByText(/não foi possível entrar|verifique suas credenciais/i),
).toBeVisible({ timeout: 8_000 });
  });

  test("login bem-sucedido redireciona para área autenticada", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Entrar" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill(process.env.E2E_USER_EMAIL!);
    await page.getByRole("textbox", { name: "Senha" }).fill(process.env.E2E_USER_PASSWORD!);
    await page.getByRole("button", { name: "Entrar" }).click();

    await page.waitForURL(/\/(dashboard|projects|app)/, { timeout: 30_000 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});