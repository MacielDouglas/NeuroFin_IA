import Link from "next/link";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants/app";
import { Button } from "@/components/ui/button";

export default function PublicHomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 sm:px-8 lg:px-12">
        <span className="mb-4 text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          Gestão de Projetos com IA
        </span>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {APP_NAME}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
          {APP_DESCRIPTION}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/sign-up">
            <Button>Criar conta</Button>
          </Link>

          <Link href="/sign-in">
            <Button variant="secondary">Entrar</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}