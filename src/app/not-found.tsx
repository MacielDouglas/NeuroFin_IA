export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          O recurso que você tentou acessar não existe ou foi movido.
        </p>
      </div>
    </main>
  );
}