export type Role = "parent" | "child";

export type FamilyMember = {
  id: string;
  displayName: string;
  role: Role;
};

export type TaskStatus = "scheduled" | "submitted" | "approved" | "rejected";

export type Task = {
  id: string;
  title: string;
  description: string;
  rewardPence: number;
  assignedTo: string;
  status: TaskStatus;
};

export type SavingsGoal = {
  id: string;
  ownerId: string;
  title: string;
  targetPence: number;
  currentPence: number;
};

export type AuditEvent = {
  id: string;
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  at: string;
};

export type DemoFamily = {
  id: string;
  name: string;
  members: FamilyMember[];
  tasks: Task[];
  savingsGoals: SavingsGoal[];
  audit: AuditEvent[];
};
