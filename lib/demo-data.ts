import type { DemoFamily } from "./types";

export const demoFamily: DemoFamily = {
  id: "family-demo",
  name: "Demo Household",
  members: [
    { id: "parent-demo", displayName: "Parent", role: "parent" },
    { id: "child-a", displayName: "Sam", role: "child" },
    { id: "child-b", displayName: "Riley", role: "child" },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Tidy bedroom",
      description: "Floor clear, clothes away and desk usable.",
      rewardPence: 100,
      assignedTo: "child-a",
      status: "submitted",
    },
    {
      id: "task-2",
      title: "Load dishwasher",
      description: "Load dishes after the evening meal.",
      rewardPence: 75,
      assignedTo: "child-b",
      status: "approved",
    },
  ],
  savingsGoals: [
    {
      id: "goal-1",
      ownerId: "child-a",
      title: "New headphones",
      targetPence: 6000,
      currentPence: 2450,
    },
    {
      id: "goal-2",
      ownerId: "child-b",
      title: "Skateboard",
      targetPence: 8000,
      currentPence: 3100,
    },
  ],
  audit: [
    {
      id: "audit-1",
      actorId: "child-a",
      action: "task_submitted",
      targetType: "task",
      targetId: "task-1",
      at: "2026-10-10T16:30:00Z",
    },
    {
      id: "audit-2",
      actorId: "parent-demo",
      action: "task_approved",
      targetType: "task",
      targetId: "task-2",
      at: "2026-10-10T18:15:00Z",
    },
  ],
};
