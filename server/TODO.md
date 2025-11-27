# Server TODOs

## 27-11-2025

- Separate the user in `AuthPayloadDto` from tokens
- Implement the verification of the user
  - For now just to add the `isVerified` column in `users` table

## 26-11-2025

- ~~Replace a singular role value in DB and token payload with an array of roles~~ (done: 27-11-2025)
- Add a **Role** guard that checks for roles in decoded user
- Add `created_at` and `updated_at` columns to available tables
- Check if caching works with Valkey
- Start to create a **Password Reset** feature
