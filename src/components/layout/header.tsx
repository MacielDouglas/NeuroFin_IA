"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { signOut } from "better-auth/api";

type HeaderProps = {
  user: {
    name: string | null;
    email: string;
    image?: string | null;
  };
};

export function Header({ user }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Evita hydration mismatch — tema só é conhecido no cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-1.5 focus:text-sm focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>

      <div />

      <div className="flex items-center gap-2">
        {/* Toggle tema — só renderiza no cliente */}
        {mounted ? (
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
            }
          >
            {theme === "dark" ? (
              <Sun size={15} aria-hidden="true" />
            ) : (
              <Moon size={15} aria-hidden="true" />
            )}
          </Button>
        ) : (
          // Placeholder com mesma dimensão para evitar layout shift
          <div className="size-8" aria-hidden="true" />
        )}

        {/* Avatar */}
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5" title={user.email}>
          <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
            {user.name?.[0]?.toUpperCase() ?? <User size={13} aria-hidden="true" />}
          </span>
          <span className="hidden text-[13px] font-medium sm:block">
            {user.name ?? user.email}
          </span>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={handleSignOut}
          aria-label="Sair da conta"
        >
          <LogOut size={14} aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}