# Family Hub Demo

A **sanitised public portfolio edition** of a private family-operations application I designed and built as a practical learning project.

This repository contains **synthetic data only**. It does not contain real family names, schedules, locations, banking credentials, photos, school information or private deployment configuration.

The private working application is maintained separately and is not linked through Git history.

## What the project demonstrates

- **Next.js / React / TypeScript** application design
- **Supabase + PostgreSQL** data modelling
- SQL schema design and **Row Level Security (RLS)** patterns
- Parent/child role separation and authorization decisions
- Server-side PIN hashing and constant-time verification
- Approval workflows, audit events and ledger-style records
- External API integration patterns with server-only secrets
- Secure-by-default handling for optional banking integrations
- Testable business rules rather than UI-only prototypes
- Product thinking across tasks, allowances, savings, requests and family routines

## Why I built it

The original idea started as a simple way to manage allowances and household jobs. It expanded into a broader family operations product covering tasks, approvals, savings goals, spending requests, routines, evidence, reminders and audit history.

My professional background is investigations, intelligence and risk rather than software engineering. I use projects like this to develop practical technical capability by solving real product and data problems: permissions, data modelling, API boundaries, safe defaults, failure modes and user experience.

## Public-demo safety model

This portfolio edition deliberately differs from the private working app:

- all people and events are fictional;
- no real travel routes, locations, schools or activity times are included;
- no production URLs or service identifiers are included;
- no real API keys, tokens or credentials are included;
- external banking access is disabled by default;
- example banking routes require an authenticated parent context;
- `.env.example` contains placeholders only;
- no uploaded photos, homework, documents or user-generated family content are included;
- this repository starts with a fresh Git history so private-project history is not exposed.

## Representative architecture

```text
Browser
  |
  +-- Parent UI --------------------+
  |                                 |
  +-- Child UI / limited session    |
                                    v
                            Next.js server routes
                                    |
             +----------------------+------------------+
             |                      |                  |
             v                      v                  v
        Supabase Auth          PostgreSQL/RLS     Optional APIs
             |                      |              (server-side)
             +---------- authorization -----------+
                                    |
                                    v
                               Audit events
```

## Included portfolio examples

### `lib/security/child-pin.ts`
Server-side PIN hashing using PBKDF2, random salts and timing-safe verification.

### `lib/security/permissions.ts`
Small, explicit authorization rules separating parent and child actions.

### `lib/integrations/banking-guard.ts`
A safe pattern for optional financial-data integrations: disabled by default and parent-authenticated before any server-side token is used.

### `sql/schema.sql`
A compact synthetic schema covering families, members, tasks, assignments, savings goals and audit events.

### `sql/rls-policies.sql`
Representative PostgreSQL/Supabase RLS policies demonstrating family-scoped access and append-only audit records. The private application contains a larger schema; this public version keeps only the patterns useful for review.

### `lib/demo-data.ts`
Fictional data used by the demo UI. It is intentionally non-identifying.

## Running locally

```bash
git clone https://github.com/mc2189/family-hub-demo.git
cd family-hub-demo
npm install
npm run dev
```

The demo runs without external services. Supabase and banking environment variables are optional and blank by default.

## Important note

This is a portfolio/learning project rather than production banking software. Financial integration examples are intentionally limited to architecture and safe read-only patterns; no money movement is implemented in this public version.
