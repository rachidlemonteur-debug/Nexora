# Security Specification

## Data Invariants
- `UserPublic`: Must be created by the authenticated user with matching ID. Full name and roles are required.
- `UserPrivate`: Cannot be read by any other user.
- `Service`: Published by a verified freelance user.
- `Order`: Must reference a valid `Service` id. Only connected `clientId` or `freelanceId` can read. Status moves through specific terminal states.
- `Message`: Must belong to a valid order where the sender is either the client or freelance of that order.

## Dirty Dozen Payloads
1. User profile creation with mismatched UID.
2. User private data read by another user.
3. Service creation by unverified string.
4. Service price set to negative.
5. Order creation referencing non-existent service.
6. Order modification bypassing state (e.g., pending directly to completed by client).
7. Message creation by non-participant in order.
8. Injection of a 2000 character ID.
9. Shadow update of `isAdmin` field in user profile.
10. Blanket query read without specifying `where("clientId", "==", uid)`.
11. Order update attempting to change `clientId` or `amount`.
12. Updating an order that is already in `cancelled` state.

## Test Runner
```typescript
// firestore.rules.test.ts
// Omitted for brevity.
```
