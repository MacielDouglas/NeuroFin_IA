import prisma from "@/lib/prisma/client";

async function main() {
  const email = process.env.E2E_USER_EMAIL ?? "test@orquestra.dev";
  const password = process.env.E2E_USER_PASSWORD ?? "Test@123456";

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log(`✅ Usuário de teste já existe: ${email}`);
    return;
  }


  const response = await fetch("http://localhost:3000/api/auth/sign-up/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      name: "Usuário de Teste E2E",
    }),
  });

  if (response.ok) {
    console.log(`✅ Usuário criado: ${email}`);
  } else {
    const err = await response.text();
    console.error(`❌ Erro ao criar usuário:`, err);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());