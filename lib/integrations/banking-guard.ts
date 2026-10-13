import { requireParentSession, type SessionContext } from "@/lib/security/session-policy";

export function bankingIntegrationEnabled(): boolean {
  return process.env.BANKING_INTEGRATION_ENABLED === "true";
}

export function requireBankingAccess(session: SessionContext | null): void {
  if (!bankingIntegrationEnabled()) {
    throw new Error("Banking integration is disabled in this public demo.");
  }

  requireParentSession(session);

  if (!process.env.BANKING_ACCESS_TOKEN) {
    throw new Error("Banking integration is not configured.");
  }
}

export function getSafeBankingStatus() {
  return {
    enabled: bankingIntegrationEnabled(),
    configured: Boolean(process.env.BANKING_ACCESS_TOKEN),
    note: "No token value is ever returned to the client.",
  };
}
