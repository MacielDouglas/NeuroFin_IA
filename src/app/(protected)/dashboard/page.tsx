import { requireSession } from "@/lib/auth/authorize";

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        Bem-vindo, {session.user.name}.
      </p>
    </main>
  );
}