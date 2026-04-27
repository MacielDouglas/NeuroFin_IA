import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("deve redirecionar ao acessar dashboard sem sessão", async ({ page }) => {
  await page.goto("/dashboard");
  // Apenas verifica que saiu do /dashboard — para onde vai depende do Better Auth
  await expect(page).not.toHaveURL(/\/dashboard/);
});

test("deve exibir página de sign-in corretamente", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
  await expect(page.getByRole("button", { name: /entrar/i })).toBeVisible();
});

test("deve exibir página de sign-up corretamente", async ({ page }) => {
  await page.goto("/sign-up");
  await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
});