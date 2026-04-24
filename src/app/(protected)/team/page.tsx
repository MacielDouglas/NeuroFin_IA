import { requireSession } from "@/lib/auth/authorize";
import { teamService } from "@/server/services/team.service";
import { TeamPageClient } from "@/features/team/components/team-page-client";

export default async function TeamPage() {
  const session = await requireSession();
  const members = await teamService.listByUser(session.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Time</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Membros e carga de trabalho dos seus projetos
        </p>
      </div>
      <TeamPageClient members={members} />
    </div>
  );
}