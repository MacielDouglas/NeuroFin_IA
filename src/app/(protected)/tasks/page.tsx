import { TasksPageClient } from "@/features/tasks/components/tasks-page-client";
import { requireSession } from "@/lib/auth/authorize";
import { taskService } from "@/server/services/task.service";

export default async function TasksPage() {
  const session = await requireSession();
  const tasks = await taskService.listByUser(session.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Tarefas</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Todas as suas tarefas em todos os projetos
        </p>
      </div>
      <TasksPageClient tasks={tasks} />
    </div>
  );
}