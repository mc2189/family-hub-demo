import assert from "node:assert/strict";
import test from "node:test";
import { reviewTask } from "../lib/workflows/task-review";

const submittedTask = {
  id: "task-demo",
  title: "Demo task",
  description: "Synthetic test task",
  rewardPence: 100,
  assignedTo: "child-a",
  status: "submitted" as const,
};

test("parent can approve a submitted task and create an audit event", () => {
  const result = reviewTask({
    task: submittedTask,
    reviewerRole: "parent",
    reviewerId: "parent-demo",
    approve: true,
    at: "2026-10-13T12:00:00Z",
  });

  assert.equal(result.task.status, "approved");
  assert.equal(result.audit.action, "task_approved");
});

test("child cannot approve a task", () => {
  assert.throws(() =>
    reviewTask({
      task: submittedTask,
      reviewerRole: "child",
      reviewerId: "child-a",
      approve: true,
    })
  );
});
