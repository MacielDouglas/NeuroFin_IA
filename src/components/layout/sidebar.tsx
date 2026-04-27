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

// ─── Sidebar lateral — visível apenas em md+ ─────────────────────────────────
export function Sidebar() {
  const pathname = usePathname();
  const isActive = useActiveHref(pathname);

  return (
    <aside className="hidden md:flex h-full w-56 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex h-14 items-center border-b border-border px-5">
        <span className="text-[15px] font-semibold tracking-tight">
          OrquestraAI
        </span>
      </div>

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