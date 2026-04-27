import { Suspense } from "react";
import { SignInForm } from "@/features/auth/sign-in-form";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Entrar</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Acesse o OrquestraAI com seu email e senha.
          </p>
        </div>

        <Suspense fallback={
          <div className="space-y-5 animate-pulse">
            <div className="space-y-2">
              <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-11 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-11 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="h-11 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        }>
          <SignInForm />
        </Suspense>
      </div>
    </main>
  );
}