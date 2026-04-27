import type { Metadata } from "next";
import { requireSession } from "@/lib/auth/authorize";
import { ProfileForm } from "@/features/settings/profile-form";
import { PasswordForm } from "@/features/settings/password-form";
import { DeleteAccount } from "@/features/settings/delete-account";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Configurações" };

export default async function SettingsPage() {
  const session = await requireSession();

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie seu perfil e preferências de conta.
        </p>
      </div>

      {/* Perfil */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold">Perfil</h2>
          <p className="text-sm text-muted-foreground">
            Atualize seu nome exibido na plataforma.
          </p>
        </div>
        <Separator />
        <ProfileForm
          name={session.user.name}
          email={session.user.email}
        />
      </section>

      {/* Segurança */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold">Segurança</h2>
          <p className="text-sm text-muted-foreground">
            Altere sua senha de acesso.
          </p>
        </div>
        <Separator />
        <PasswordForm />
      </section>

      {/* Danger Zone */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-destructive">
            Zona de perigo
          </h2>
          <p className="text-sm text-muted-foreground">
            Ações irreversíveis relacionadas à sua conta.
          </p>
        </div>
        <Separator className="bg-destructive/20" />
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Excluir conta</p>
              <p className="text-sm text-muted-foreground">
                Remove permanentemente sua conta e todos os dados associados.
              </p>
            </div>
            <DeleteAccount />
          </div>
        </div>
      </section>
    </div>
  );
}