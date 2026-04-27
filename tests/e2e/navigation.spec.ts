import { test, expect } from "@playwright/test";

test.describe("Navegação", () => {
  test("sidebar tem todos os links principais", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page.getByRole("link", { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /projetos/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /tarefas/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /time/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /configurações/i })).toBeVisible();
  });

  test("navega para página de tarefas", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: /tarefas/i }).click();
    await expect(page).toHaveURL(/\/tasks/);
    await expect( page.getByRole("heading", { name: "Tarefas", exact: true }),).toBeVisible();
  });

  test("navega para página de time", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: /time/i }).click();
    await expect(page).toHaveURL(/\/team/);
    await expect(page.getByRole("heading", { name: /time/i })).toBeVisible();
  });

  test("toggle de dark mode funciona", async ({ page }) => {
  await page.goto("/dashboard");
  const html = page.locator("html");

  // Captura estado inicial — verifica class ou data-theme
  const initialClass = await html.getAttribute("class");
  const initialTheme = await html.getAttribute("data-theme");

  await page.getByRole("button", { name: /tema|dark|light|modo/i }).click();

  // Verifica que algo mudou (class ou data-theme)
  const newClass = await html.getAttribute("class");
  const newTheme = await html.getAttribute("data-theme");

  const classChanged = newClass !== initialClass;
  const themeChanged = newTheme !== initialTheme;

  expect(classChanged || themeChanged).toBe(true);
});

  test("página 404 para rota inexistente", async ({ page }) => {
    await page.goto("/rota-que-nao-existe");
    await expect(page.getByText(/404|não encontrad/i)).toBeVisible();
  });
});