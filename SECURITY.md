# Security

This repository is a **sanitised public portfolio edition** of a separate private application.

## Public repository rules

- No real family names, travel schedules, locations, schools, photos or household records.
- No production database URLs or service identifiers.
- No API tokens, passwords, PINs, access keys or private certificates.
- `.env*`, local databases, uploads and private files are excluded from Git.
- External financial integrations are disabled by default.
- Example financial access is treated as parent-only and server-side.
- Service-role credentials must never be exposed to browser code.
- Demo data is synthetic and can be replaced freely.

## Authentication and authorization

The private application contains fuller authentication flows. This public edition intentionally exposes only the **authorization model and security decisions** useful for portfolio review.

Parent and child capabilities are represented separately. Sensitive operations such as approvals, audit access and optional financial integrations require a parent context.

Supabase/PostgreSQL examples use Row Level Security to scope authenticated access to the family owned by the signed-in user.

## Financial integration boundary

This public demo does not implement money movement.

Any future external financial-data integration must:

1. remain disabled unless explicitly enabled server-side;
2. require an authenticated parent session;
3. keep tokens server-side only;
4. return only the minimum data needed by the UI;
5. avoid logging secrets or raw provider responses unnecessarily;
6. fail closed when configuration or authorization is missing.

## Private-project separation

This repository has a fresh Git history and is not a fork of the private project. Sanitisation therefore applies to both the current tree and its history.

If you identify a security issue in this public demo, please report it privately rather than opening an issue containing exploit details.
