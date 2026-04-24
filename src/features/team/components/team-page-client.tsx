"use client";

import { Users, Briefcase, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { MemberWithLoad } from "@/server/services/team.service";

type TeamPageClientProps = {
  members: MemberWithLoad[];
};

export function TeamPageClient({ members }: TeamPageClientProps) {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Users size={32} className="text-muted-foreground/30 mb-3" />
        <p className="text-sm font-medium">Nenhum membro encontrado</p>
        <p className="text-xs text-muted-foreground mt-1">
          Adicione membros aos seus projetos para ver a carga de trabalho
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <MemberCard key={member.userId} member={member} />
      ))}
    </div>
  );
}

function MemberCard({ member }: { member: MemberWithLoad }) {
  const completionRate =
    member.taskCounts.total > 0
      ? Math.round((member.taskCounts.done / member.taskCounts.total) * 100)
      : 0;

  const isOverloaded = member.taskCounts.inProgress >= 5;
  const hasOverdue = member.taskCounts.overdue > 0;

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 space-y-4 transition-shadow hover:shadow-md",
        isOverloaded ? "border-orange-200 dark:border-orange-900" : "border-border",
        hasOverdue && !isOverloaded
          ? "border-destructive/30"
          : "",
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
          {member.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold truncate">
            {member.name ?? "Sem nome"}
          </p>
          <p className="text-[11px] text-muted-foreground truncate">
            {member.email}
          </p>
        </div>

        {/* Alerta de sobrecarga */}
        {isOverloaded && (
          <span className="flex items-center gap-1 text-[10px] font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full shrink-0">
            <AlertTriangle size={10} />
            Sobrecarregado
          </span>
        )}
      </div>

      {/* Projetos */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
          Projetos
        </p>
        <div className="flex flex-wrap gap-1">
          {member.projects.map((p) => (
            <span
              key={p.id}
              className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-muted-foreground"
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-2">
        <Metric
          icon={Clock}
          label="Em andamento"
          value={member.taskCounts.inProgress}
          color={isOverloaded ? "text-orange-500" : "text-blue-500"}
        />
        <Metric
          icon={CheckCircle2}
          label="Concluídas"
          value={member.taskCounts.done}
          color="text-green-500"
        />
        <Metric
          icon={Briefcase}
          label="Total"
          value={member.taskCounts.total}
          color="text-muted-foreground"
        />
        <Metric
          icon={AlertTriangle}
          label="Atrasadas"
          value={member.taskCounts.overdue}
          color={hasOverdue ? "text-destructive" : "text-muted-foreground"}
        />
      </div>

      {/* Barra de progresso */}
      {member.taskCounts.total > 0 && (
        <div>
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Progresso</span>
            <span>{completionRate}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-2.5 py-2">
      <Icon size={13} className={color} />
      <div>
        <p className="text-[13px] font-semibold leading-none">{value}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}