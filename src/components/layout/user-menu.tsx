"use client";

import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

export function UserMenu() {
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await authClient.signOut();
    window.location.href = "/sign-in";
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Menu do usuário"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        className="size-9 rounded-full"
      >
        <User size={15} aria-hidden="true" />
      </Button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <Card
            role="menu"
            className={cn(
              "absolute right-0 top-11 z-20 w-44",
              "overflow-hidden py-1 shadow-lg",
            )}
          >
            <CardContent className="p-0">
              <button
                role="menuitem"
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut size={14} aria-hidden="true" />
                Sair
              </button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}