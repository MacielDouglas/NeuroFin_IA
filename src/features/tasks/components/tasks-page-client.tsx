"use client";

import { useState, useMemo } from "react";
import { Search, Filter,  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskCard } from "./task-card";
import { TASK_STATUS_LABELS, TASK_PRIORITY_LABELS } from "@/lib/utils/task";
import type { TaskWithProject } from "@/types/task";
import type { TaskStatus, TaskPriority } from "@/generated/prisma/client";

type TasksPageClientProps = {
  tasks: TaskWithProject[];
};

export function TasksPageClient({ tasks }: TasksPageClientProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "ALL">("ALL");
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "ALL">("ALL");

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch =
        !search ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.project.name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        filterStatus === "ALL" || task.status === filterStatus;

      const matchPriority =
        filterPriority === "ALL" || task.priority === filterPriority;

      return matchSearch && matchStatus && matchPriority;
    });
  }, [tasks, search, filterStatus, filterPriority]);

  const hasFilters =
    search !== "" || filterStatus !== "ALL" || filterPriority !== "ALL";

  return (
    <div className="space-y-4">
      {/* Barra de filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar tarefas ou projetos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={filterStatus}
            onValueChange={(v) => setFilterStatus(v as TaskStatus | "ALL")}
          >
            <SelectTrigger className="h-9 text-xs w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="text-xs">
                Todos os status
              </SelectItem>
              {(Object.keys(TASK_STATUS_LABELS) as TaskStatus[]).map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {TASK_STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterPriority}
            onValueChange={(v) => setFilterPriority(v as TaskPriority | "ALL")}
          >
            <SelectTrigger className="h-9 text-xs w-36">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="text-xs">
                Todas as prioridades
              </SelectItem>
              {(Object.keys(TASK_PRIORITY_LABELS) as TaskPriority[]).map((p) => (
                <SelectItem key={p} value={p} className="text-xs">
                  {TASK_PRIORITY_LABELS[p]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 text-xs"
              onClick={() => {
                setSearch("");
                setFilterStatus("ALL");
                setFilterPriority("ALL");
              }}
            >
              Limpar
            </Button>
          )}
        </div>
      </div>

      {/* Contador */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} de {tasks.length} tarefa
        {tasks.length !== 1 ? "s" : ""}
        {hasFilters ? " encontrada" : ""}
        {filtered.length !== 1 && hasFilters ? "s" : ""}
      </p>

      {/* Lista agrupada por projeto */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Filter size={32} className="text-muted-foreground/30 mb-3" />
          <p className="text-sm font-medium">Nenhuma tarefa encontrada</p>
          <p className="text-xs text-muted-foreground mt-1">
            Tente ajustar os filtros
          </p>
        </div>
      ) : (
        <TaskGroupedList tasks={filtered} />
      )}
    </div>
  );
}

function TaskGroupedList({ tasks }: { tasks: TaskWithProject[] }) {
  // Agrupa por projeto
  const grouped = useMemo(() => {
    const map = new Map<string, { name: string; tasks: TaskWithProject[] }>();
    for (const task of tasks) {
      const existing = map.get(task.project.id);
      if (existing) {
        existing.tasks.push(task);
      } else {
        map.set(task.project.id, { name: task.project.name, tasks: [task] });
      }
    }
    return Array.from(map.entries());
  }, [tasks]);

  return (
    <div className="space-y-6">
      {grouped.map(([projectId, { name, tasks: projectTasks }]) => (
        <div key={projectId}>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-[13px] font-semibold">{name}</h2>
            <span className="text-[11px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">
              {projectTasks.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {projectTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}