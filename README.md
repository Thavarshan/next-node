# Next + Node Learning Lab

**Ten realistic, test-driven full-stack challenges** built with Next.js App Router, React, Express, PostgreSQL, and Turborepo.

This repository is designed for learning by **reproducing a problem, writing or unlocking a test, implementing a fix, and measuring the result**. It intentionally contains incomplete or inefficient code. **Do not deploy it or expose its demo endpoints to the internet.**

## Prerequisites

- Node.js 22 or newer; npm 10
- Docker Desktop / a compatible Docker Engine for the PostgreSQL lab
- Git and a code editor

## Quick start

```bash
git clone https://github.com/Thavarshan/next-node.git
cd next-node
npm install
npm run dev
```

You will find:

- Next.js web lab: http://localhost:3000
- Express API health check: http://127.0.0.1:4000/health
- Optional PostgreSQL lab: `npm run db:up` (localhost port 5433)


## Workspace map

```text
apps/
  web/                       Next.js 16 App Router + React 19
    proxy.ts                  Lab 04: protected requests
    src/app/products/         Lab 01: ISR
    src/components/           Labs 02, 07, 08: React performance / hydration
    src/app/settings/actions.ts  Lab 10: Server Action security
    src/tests/*challenge*     Opt-in tests
  api/                       Express 5 + TypeScript
    src/challenges/           Labs 03, 06, 09
    src/tests/*challenge*     Opt-in tests
packages/
  database/                  Local PostgreSQL schema + SQL migration + test
docs/
  QUESTION-BANK.md           All original multiple-choice questions + explanations
  WORKFLOW.md                Red/green/refactor learning workflow
  challenges/                Detailed step-by-step implementation briefs
```

## Your learning path

| # | Problem | Where | Issue | Brief |
|---|---|---|---|---|
| 01 | Hourly product prices vs weekly catalog updates | Next.js | [#1](../../issues/1) | [ISR](docs/challenges/01-isr.md) |
| 02 | React.memo still re-renders child items | React | [#2](../../issues/2) | [Callbacks](docs/challenges/02-memo.md) |
| 03 | CPU-bound crypto blocks Node.js requests | Express | [#3](../../issues/3) | [Workers](docs/challenges/03-crypto.md) |
| 04 | Prevent unauthenticated route access | Next.js | [#4](../../issues/4) | [Proxy](docs/challenges/04-proxy.md) |
| 05 | Slow PostgreSQL join | PostgreSQL | [#5](../../issues/5) | [Index](docs/challenges/05-index.md) |
| 06 | Secure access/refresh token storage | Express | [#6](../../issues/6) | [JWT](docs/challenges/06-tokens.md) |
| 07 | Context causes needless high-frequency re-renders | React | [#7](../../issues/7) | [Stock feeds](docs/challenges/07-context.md) |
| 08 | Server/client hydration mismatch | Next.js | [#8](../../issues/8) | [Hydration](docs/challenges/08-hydration.md) |
| 09 | Event listeners leak memory | Express | [#9](../../issues/9) | [Leaks](docs/challenges/09-listeners.md) |
| 10 | Unprotected Server Action | Next.js | [#10](../../issues/10) | [Actions](docs/challenges/10-actions.md) |

## Test-driven exercise workflow

Initially, each challenge suite starts with `describe.skip(...)`. This makes scaffold CI green while leaving the exercises unsolved.

1. Read a brief and open its source and test files.
2. Change only that challenge's `describe.skip` to `describe`.
3. Run the relevant package's tests; **confirm at least one test fails**.
4. Implement a fix without deleting or weakening the assertions.
5. Run the tests again, then run `npm test` and `npm run typecheck`.
6. Record what you changed and any measured results in the issue or a PR.

```bash
npm run test --workspace=@lab/web
npm run test --workspace=@lab/api
npm run test --workspace=@lab/database
npm test
npm run typecheck
```

A CI-green starter does **not** mean all labs are solved. The intentionally skipped tests become active when you work on them.

## Safety and accuracy

- The security exercises are intentionally incomplete; do not treat them as deployable authentication solutions.
- ISR's `revalidate = 3600` does not guarantee price correctness at checkout. Validate a current price when purchasing.
- In Next.js **16**, `proxy.ts` is the current convention; it uses the Node.js runtime. Older quizzes may refer to Edge `middleware.ts`.
- Indexes are useful for selective queries; PostgreSQL may correctly choose a sequential scan for broad queries.
- JS event-loop blocking differs from native asynchronous bcrypt/PBKDF2, which already uses libuv workers.
- The exercise is about fundamentals, not blindly applying each multiple-choice answer.

Start with [WORKFLOW.md](docs/WORKFLOW.md), then [Lab 01](docs/challenges/01-isr.md).
