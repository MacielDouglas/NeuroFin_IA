"use client";

import { useActionState } from "react";
import { updateProfile } from "@/server/actions/settings.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  name: string;
  email: string;
}

export function ProfileForm({ name, email }: Props) {
  const [state, action, isPending] = useActionState(updateProfile, null);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          defaultValue={name}
          placeholder="Seu nome"
          required
          minLength={2}
          maxLength={60}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          disabled
          className="cursor-not-allowed opacity-60"
        />
        <p className="text-xs text-muted-foreground">
          O email não pode ser alterado.
        </p>
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          {state.success}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </form>
  );
}