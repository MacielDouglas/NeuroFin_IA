import { expect, test } from "@playwright/test";

test("deve redirecionar para sign-in ao acessar dashboard sem sessão", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/sign-in/);
  await expect(page.getByRole("heading", { name: /entrar/i })).toBeVisible();
});

test("deve exibir página de sign-in corretamente", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page.getByRole("heading", { name: /entrar/i })).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/senha/i)).toBeVisible();
});

test("deve exibir página de sign-up corretamente", async ({ page }) => {
  await page.goto("/sign-up");
  await expect(page.getByRole("heading", { name: /criar conta/i })).toBeVisible();
  await expect(page.getByLabel(/nome/i)).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/senha/i)).toBeVisible();
});