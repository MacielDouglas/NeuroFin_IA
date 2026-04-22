import { expect, test } from "@playwright/test";

test("deve exibir a home do OrquestraAI", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /orquestraai/i }),
  ).toBeVisible();
});