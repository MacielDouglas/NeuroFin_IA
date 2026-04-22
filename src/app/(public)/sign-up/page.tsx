import { SignUpForm } from "@/features/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Criar conta</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Comece a usar o OrquestraAI.
          </p>
        </div>

        <SignUpForm />
      </div>
    </main>
  );
}