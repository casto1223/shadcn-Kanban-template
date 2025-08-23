"use client";

import { useState } from "react";
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from "@/components/ui/shadcn-io/kanban";

type Task = {
  id: string;
  name: string;
  column: string;
  description?: string;
  priority?: "low" | "medium" | "high";
};

type Column = {
  id: string;
  name: string;
};

const initialColumns: Column[] = [
  { id: "todo", name: "To Do" },
  { id: "in-progress", name: "In Progress" },
  { id: "review", name: "Review" },
  { id: "done", name: "Done" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    name: "Design landing page",
    column: "todo",
    description: "Create wireframes and mockups",
    priority: "high",
  },
  {
    id: "2",
    name: "Setup authentication",
    column: "todo",
    description: "Implement user login and registration",
    priority: "medium",
  },
  {
    id: "3",
    name: "Build dashboard",
    column: "in-progress",
    description: "Create main dashboard interface",
    priority: "high",
  },
  {
    id: "4",
    name: "Write documentation",
    column: "review",
    description: "API documentation and user guide",
    priority: "low",
  },
  {
    id: "5",
    name: "Deploy to production",
    column: "done",
    description: "Final deployment and testing",
    priority: "high",
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-l-red-500";
      case "medium":
        return "border-l-4 border-l-yellow-500";
      case "low":
        return "border-l-4 border-l-green-500";
      default:
        return "border-l-4 border-l-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            YT AI Talent Manager
          </h1>
          <p className="text-muted-foreground">
            Manage your YouTube talent pipeline with this Kanban board
          </p>
        </div>

        <div className="h-[calc(100vh-200px)]">
          <KanbanProvider
            columns={initialColumns}
            data={tasks}
            onDataChange={setTasks}
          >
            {(column) => (
              <KanbanBoard key={column.id} id={column.id}>
                <KanbanHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{column.name}</h3>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">
                      {tasks.filter((task) => task.column === column.id).length}
                    </span>
                  </div>
                </KanbanHeader>
                <KanbanCards id={column.id}>
                  {(task: Task) => (
                    <KanbanCard
                      key={task.id}
                      id={task.id}
                      name={task.name}
                      column={task.column}
                      className={getPriorityColor(task.priority)}
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">{task.name}</h4>
                        {task.description && (
                          <p className="text-xs text-muted-foreground">
                            {task.description}
                          </p>
                        )}
                        {task.priority && (
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }`}
                          >
                            {task.priority}
                          </span>
                        )}
                      </div>
                    </KanbanCard>
                  )}
                </KanbanCards>
              </KanbanBoard>
            )}
          </KanbanProvider>
        </div>
      </div>
    </div>
  );
}
