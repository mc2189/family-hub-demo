import assert from "node:assert/strict";
import test from "node:test";
import { can } from "../lib/security/permissions";

test("children can submit their own tasks", () => {
  assert.equal(can("child", "submit_own_task"), true);
});

test("children cannot approve tasks", () => {
  assert.equal(can("child", "approve_task"), false);
});

test("parents can view audit history", () => {
  assert.equal(can("parent", "view_audit"), true);
});

test("banking integration is parent-only", () => {
  assert.equal(can("child", "use_banking_integration"), false);
  assert.equal(can("parent", "use_banking_integration"), true);
});
