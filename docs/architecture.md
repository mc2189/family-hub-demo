# Architecture notes

## Goal

Family Hub models a small household workflow system rather than a conventional banking product. The interesting engineering problems are permissions, state transitions, auditability, data boundaries and optional external-service integrations.

## High-level design

- **Next.js** provides the UI and server routes.
- **TypeScript** is used across UI and server code.
- **Supabase Auth** is the intended parent authentication provider.
- **PostgreSQL** stores family-scoped records.
- **Row Level Security** provides database-side isolation for authenticated parents.
- Child-facing capabilities are deliberately narrower than parent capabilities.
- External integrations are server-side only and disabled when configuration is absent.

## Domain boundaries

### Parent capabilities

Typical parent actions include creating tasks, reviewing submissions, changing allowance settings, reviewing audit history and enabling optional integrations.

### Child capabilities

Typical child actions include viewing assigned work, submitting completion, viewing their own savings state and creating requests that require parent approval.

### Audit

Important state-changing actions generate audit events. The SQL example exposes read + append policies but no update/delete policy for audit records, making the intended integrity model visible.

## Why the public edition is smaller

The private project grew iteratively and contains substantially more product functionality, migrations and UI. The public repo intentionally contains a **curated architecture slice** rather than a complete duplicate.

That approach serves two purposes:

1. it avoids exposing private household information or historical data;
2. it makes the technical decisions easier for a reviewer to find quickly.

## Representative review path

For a quick technical review:

1. Read `README.md`.
2. Review `lib/security/permissions.ts`.
3. Review `lib/workflows/task-review.ts` and its tests.
4. Review `sql/schema.sql` and `sql/rls-policies.sql`.
5. Review `lib/integrations/banking-guard.ts` and `SECURITY.md`.
