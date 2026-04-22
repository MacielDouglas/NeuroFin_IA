"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { APP_NAME } from "@/lib/constants/app";

const navItems = [
  { label: "Dashboard",     href: "/dashboard", icon: LayoutDashboard },
  { label: "Projetos",      href: "/projects",  icon: FolderKanban },
  { label: "Tarefas",       href: "/tasks",     icon: BarChart3 },
  { label: "Time",          href: "/team",      icon: Users },
  { label: "Configurações", href: "/settings",  icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
      <div className="flex h-14 items-center border-b border-sidebar-border px-5">
        <span className="text-[15px] font-semibold tracking-tight text-sidebar-foreground">
          {APP_NAME}
        </span>
      </div>

      <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto p-2">
        <ul role="list" className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium",
                    "transition-colors duration-150",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}