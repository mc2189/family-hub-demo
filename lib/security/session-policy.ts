import type { Role } from "@/lib/types";

export type SessionContext = {
  userId: string;
  familyId: string;
  role: Role;
  authenticated: boolean;
};

export function requireAuthenticatedSession(
  session: SessionContext | null
): SessionContext {
  if (!session?.authenticated || !session.userId || !session.familyId) {
    throw new Error("Authenticated family session required.");
  }
  return session;
}

export function requireParentSession(
  session: SessionContext | null
): SessionContext {
  const valid = requireAuthenticatedSession(session);
  if (valid.role !== "parent") {
    throw new Error("Parent authorization required.");
  }
  return valid;
}
