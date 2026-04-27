import { test as setup,  } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, ".auth/user.json");

setup("autenticar usuário de teste", async ({ page }) => {
  const email = process.env.E2E_USER_EMAIL!;
  const password = process.env.E2E_USER_PASSWORD!;

  if (!email || !password) {
    throw new Error(
      "E2E_USER_EMAIL e E2E_USER_PASSWORD devem estar definidos no .env.local",
    );
  }

  // A rota raiz redireciona para login — conforme o Codegen mostrou
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Clica em "Entrar" na landing/home para abrir o login
  await page.getByRole("button", { name: "Entrar" }).click();

  // Preenche usando os seletores exatos do Codegen
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Senha" }).fill(password);

  // Submete
  await page.getByRole("button", { name: "Entrar" }).click();

  // Aguarda redirecionar para área autenticada
  await page.waitForURL(/\/(dashboard|projects|app)/, { timeout: 30_000 });

  // Salva sessão
  await page.context().storageState({ path: authFile });

  console.log(`✅ Autenticado como: ${email}`);
  console.log(`✅ URL após login: ${page.url()}`);
});