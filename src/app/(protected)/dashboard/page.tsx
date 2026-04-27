import type { Metadata } from "next";
import { requireSession } from "@/lib/auth/authorize";
import { getDashboardStats } from "@/server/services/dashboard.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await requireSession();
  const stats = await getDashboardStats(session.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Seja bem vindo, {session.user.name.split(" ")[0]}.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Aqui está o resumo dos seus projetos.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Projetos ativos</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {stats.activeProjects}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-success/15 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium">
              Tudo certo
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Tarefas pendentes</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {stats.pendingTasks}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="warning">Em andamento</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Gargalos detectados</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {stats.overdueTasks}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={stats.overdueTasks > 0 ? "destructive" : "outline"}>
              {stats.overdueTasks > 0 ? "Atenção" : "Nenhum"}
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}