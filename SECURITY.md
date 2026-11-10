# Security policy for this learning repository

This is an intentionally incomplete, insecure-by-default **local educational lab**. It contains unimplemented token exchange, proxy guards, and Server Actions, plus inefficient crypto and memory-management examples.

**Do not deploy it publicly, place real secrets in the repo, use real user credentials, or connect it to production data.** The Express listener is configured to bind to 127.0.0.1 and PostgreSQL exposes only a loopback port, but you are still responsible for your local environment and Docker configuration.

If you discover an actual vulnerability in the scaffolding unrelated to the planned exercises, report it privately to the repository owner through GitHub rather than publishing exploit details.

Completing an exercise and passing a simplified unit test does not make the implementation production secure.
