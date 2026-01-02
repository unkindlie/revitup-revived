# Server TODOs

## 28-11-2025

- Finishing Password Reset module
  - ~~Add the password change by request (if not logged)~~ (done: 19-12-2025)
  - Change the password (if logged) and store the request as completed with `LOGGED` source (done: 02-01-2026)
  - ~~Handle different error cases~~ (done: 19-12-2025)

## 27-11-2025

- ~~Add the proper functionality just to reset the password (reducing interaction with DB data)~~
  - After that try to turn it into the full working action request
- ~~Separate the user in `AuthPayloadDto` from tokens~~ (done: 02-01-2026)
  - Nah, just decided to rename the decorator for now
- Implement the verification of the user
  ~~- For now just to add the `isVerified` column in `users` table~~ (done: 01-01-2026)
- ~~Replace `@keyv/redis` package with `@keyv/valkey`~~ (done: 28-11-2025)

## 26-11-2025

- ~~Replace a singular role value in DB and token payload with an array of roles~~ (done: 27-11-2025)
- ~~Add a **Role** guard that checks for roles in decoded user~~ (done: 27-11-2025)
- ~~Add `created_at` and `updated_at` columns to available tables~~ (done: 27-11-2025)
- ~~Check if caching works with Valkey~~ (done: 27-11-2025)
- ~~Start to create a **Password Reset** feature~~ (done: 27-11-2025)
  - Added the module :)
