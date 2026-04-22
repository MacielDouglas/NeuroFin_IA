import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "./user-menu";

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div>{/* Breadcrumb virá na Etapa 4 */}</div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}