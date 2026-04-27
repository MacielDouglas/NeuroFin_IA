import type { ReactNode } from "react";
import { requireSession } from "@/lib/auth/authorize";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";


type ProtectedLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = await requireSession();

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Sidebar fixo à esquerda */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={session.user} />

      <main id="main-content" className="flex-1 overflow-y-auto p-6 lg:p-8" tabIndex={0}>
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}