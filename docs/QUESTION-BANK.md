# Question bank: ten interview questions and why the answer works

These are the questions that inspired this repository. Read them after attempting each exercise; this is a study guide, **not** a production security checklist.

### 01 — Hourly prices, weekly descriptions

**Question:** An e-commerce product page built with Next.js has prices that change hourly, but product descriptions and images only change weekly. Which fetching strategy balances performance and freshness?

- A. ISR with a revalidate time of 3600 seconds
- B. SSR on every request
- C. Pure SSG with an hourly full-site rebuild
- D. Client-side fetch in every `useEffect`

**Expected: A.** ISR avoids per-request rendering and revalidates stale content in the background. A revalidate interval is not a precise freshness SLA, so checkout must validate prices independently. In an advanced design, split stable catalog content from more frequently updated prices. [Exercise](challenges/01-isr.md).

### 02 — React.memo and callback identity

**Question:** A memoized child receiving an `onItemClick` prop still re-renders on every parent state update. What causes this?

- A. `React.memo` only works with class components
- B. The child needs `useLayoutEffect`
- C. The callback is recreated; memoize with `useCallback` and correct dependencies
- D. Move all state to Redux

**Expected: C.** Shallow prop comparison sees a fresh function reference on every render. Memoizing only helps if other props also remain stable. [Exercise](challenges/02-memo.md).

### 03 — CPU-heavy Node.js requests

**Question:** Heavy cryptography makes an Express server unresponsive to concurrent requests. What is the best architectural change?

- A. Increase `UV_THREADPOOL_SIZE` to 128 for synchronous JavaScript
- B. Wrap synchronous work in `setImmediate`
- C. Switch Express to Koa
- D. Offload work to a worker pool or external workers

**Expected: D.** Running expensive JavaScript off the event loop restores responsiveness. Note: native asynchronous `crypto.pbkdf2` or asynchronous bcrypt already uses libuv's thread pool; prefer that when possible rather than adding unnecessary workers. [Exercise](challenges/03-crypto.md).

### 04 — Global authentication in Next.js

**Question:** Where should Next.js App Router intercept unauthenticated requests?

- A. A client-side effect in the root layout
- B. A custom `_document.js` with React state
- C. Top-level `middleware.ts` on Edge
- D. `getServerSideProps` in every page

**Expected in the original quiz: C.** Request-boundary routing checks are better than client-only redirects. **For Next.js 16, the modern equivalent is `proxy.ts` on Node.js**, not an Edge `proxy.ts`. Sensitive reads and mutations still need server-side authorization. [Exercise](challenges/04-proxy.md).

### 05 — PostgreSQL slow join

**Question:** A join between 1m users and 10m orders on `user_id` is slow; EXPLAIN shows a sequential scan of orders. First step?

- A. Composite index on users.id and orders.id
- B. Rewrite as a subquery
- C. Copy user data into orders
- D. Index `orders(user_id)`

**Expected: D.** Index the foreign-key lookup used by selective joins. Verify with `EXPLAIN (ANALYZE, BUFFERS)`; a sequential scan can still be optimal for an unfiltered large result. [Exercise](challenges/05-index.md).

### 06 — Access and refresh tokens

**Question:** Which browser storage pattern helps mitigate XSS and CSRF with JWTs?

- A. Refresh token in sessionStorage; access token in insecure cookie
- B. Both in one HttpOnly SameSite=None cookie; disable CSRF
- C. Both in localStorage
- D. Access token in memory; refresh token in HttpOnly, Secure, SameSite=Strict cookie

**Expected: D.** Limits direct refresh-token access from injected scripts and reduces cross-site cookie sending. XSS is not eliminated; cookie-scoped refresh operations may still need origin/CSRF defenses. Rotate refresh tokens and detect reuse. [Exercise](challenges/06-tokens.md).

### 07 — High-frequency global state

**Question:** Why might Context degrade performance in a frequently updating stock-price UI?

- A. All context consumers re-render when the value changes, even when their own data slice did not
- B. Context is deprecated
- C. Context cannot perform async actions
- D. Context forces SSR every update

**Expected: A.** Context propagation is not slice-based subscription. Use independent contexts or `useSyncExternalStore`/selector-based stores for frequently changing values. [Exercise](challenges/07-context.md).

### 08 — Hydration mismatch

**Question:** Why does server text differ from client text during React hydration?

- A. Different React versions in local/prod
- B. Environment-specific initial render data like `new Date()` or `window.innerWidth`
- C. CSS-in-JS always needs a Babel plugin
- D. CDN network failure

**Expected: B.** Server and client's **first render** must agree. Defer browser-specific readings until after hydration, or pass a deterministic server value. [Exercise](challenges/08-hydration.md).

### 09 — Node.js heap growth

**Question:** What often explains steady memory growth and eventual out-of-memory crashes?

- A. Repeated callbacks/listeners attached to a global emitter without cleanup
- B. `JSON.parse()` permanently locks V8 memory
- C. Using `const` instead of `let`
- D. Not closing every DB connection inside a function

**Expected: A.** Listeners retain closures and objects until removed. `once()` is not sufficient if its event never fires. [Exercise](challenges/09-listeners.md).

### 10 — Server Actions

**Question:** How are Next.js `'use server'` actions secured and executed?

- A. Direct database execution with no network
- B. Compiled into callable HTTP POST endpoints; developers must validate input and authorize in the action
- C. Automatic user/role verification by Next.js
- D. Client-side WASM

**Expected: B.** Server Actions are remotely invocable and must be treated as untrusted entry points. Next.js provides some request-level protections, but session verification, input validation and resource ownership checks remain your responsibility. [Exercise](challenges/10-actions.md).
