"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard",     icon: LayoutDashboard },
  { href: "/projects",  label: "Projetos",      icon: FolderKanban },
  { href: "/tasks",     label: "Tarefas",       icon: CheckSquare },
  { href: "/team",      label: "Time",          icon: Users },
  { href: "/settings",  label: "Configurações", icon: Settings },
];

function useActiveHref(pathname: string) {
  return (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

// ─── SVGs inline dos brand icons (Simple Icons) ──────────────────────────────
function GitHubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Sidebar lateral — visível apenas em md+ ─────────────────────────────────
export function Sidebar() {
  const pathname = usePathname();
  const isActive = useActiveHref(pathname);

  return (
    <aside className="hidden md:flex h-full w-56 shrink-0 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-5">
        <span className="text-[15px] font-semibold tracking-tight">
          OrquestraAI
        </span>
      </div>

      {/* Navegação */}
      <nav
        className="flex flex-1 flex-col gap-0.5 p-3"
        aria-label="Navegação principal"
      >
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
              isActive(href)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
            aria-current={isActive(href) ? "page" : undefined}
          >
            <Icon size={15} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4 space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none">
          Desenvolvido por
        </p>
        <p className="text-[13px] font-semibold text-foreground leading-none">
          Douglas Maciel
        </p>
        <div className="flex items-center gap-1">
          <Link
            href="https://github.com/MacielDouglas"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium",
              "text-muted-foreground transition-colors",
              "hover:bg-secondary hover:text-foreground",
            )}
            aria-label="Ver perfil no GitHub"
          >
            <GitHubIcon size={12} />
            GitHub
          </Link>

          <span className="text-border select-none">·</span>

          <Link
            href="https://www.linkedin.com/in/douglas-maciel-4943461b0/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium",
              "text-muted-foreground transition-colors",
              "hover:bg-secondary hover:text-foreground",
            )}
            aria-label="Ver perfil no LinkedIn"
          >
            <LinkedInIcon size={12} />
            LinkedIn
          </Link>
        </div>
      </div>
    </aside>
  );
}

// ─── Bottom tab bar — visível apenas em mobile (< md) ────────────────────────
export function BottomNav() {
  const pathname = usePathname();
  const isActive = useActiveHref(pathname);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-card px-2"
      aria-label="Navegação principal"
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors min-w-11 min-h-11",
            isActive(href)
              ? "text-primary"
              : "text-muted-foreground",
          )}
          aria-current={isActive(href) ? "page" : undefined}
        >
          <Icon
            size={20}
            aria-hidden="true"
            strokeWidth={isActive(href) ? 2.5 : 1.8}
          />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}