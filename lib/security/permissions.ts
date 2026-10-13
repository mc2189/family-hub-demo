import type { Role } from "@/lib/types";

export type Action =
  | "view_own_tasks"
  | "submit_own_task"
  | "view_own_savings"
  | "approve_task"
  | "edit_allowance"
  | "view_audit"
  | "use_banking_integration";

const parentActions = new Set<Action>([
  "view_own_tasks",
  "submit_own_task",
  "view_own_savings",
  "approve_task",
  "edit_allowance",
  "view_audit",
  "use_banking_integration",
]);

const childActions = new Set<Action>([
  "view_own_tasks",
  "submit_own_task",
  "view_own_savings",
]);

export function can(role: Role, action: Action): boolean {
  return role === "parent" ? parentActions.has(action) : childActions.has(action);
}

export function requirePermission(role: Role, action: Action): void {
  if (!can(role, action)) {
    throw new Error(`Role '${role}' is not allowed to '${action}'.`);
  }
}
