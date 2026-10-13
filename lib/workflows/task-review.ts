import type { AuditEvent, Task } from "@/lib/types";
import { requirePermission } from "@/lib/security/permissions";

export function reviewTask(params: {
  task: Task;
  reviewerRole: "parent" | "child";
  reviewerId: string;
  approve: boolean;
  at?: string;
}): { task: Task; audit: AuditEvent } {
  requirePermission(params.reviewerRole, "approve_task");

  if (params.task.status !== "submitted") {
    throw new Error("Only submitted tasks can be reviewed.");
  }

  const status: Task["status"] = params.approve ? "approved" : "rejected";
  const task = { ...params.task, status };

  return {
    task,
    audit: {
      id: `audit-${params.task.id}-${status}`,
      actorId: params.reviewerId,
      action: params.approve ? "task_approved" : "task_rejected",
      targetType: "task",
      targetId: params.task.id,
      at: params.at ?? new Date().toISOString(),
    },
  };
}
