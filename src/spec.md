# Specification

## Summary
**Goal:** Implement immediate bounty collection when publishers create tasks, with confirmation dialog and cancellation refund capability.

**Planned changes:**
- Add confirmation dialog showing all task details before final publication
- Deduct and lock full bounty amount from publisher's ICP balance immediately upon task creation
- Validate publisher balance and display error if insufficient funds
- Enable task cancellation with full refund when no warrior has accepted yet

**User-visible outcome:** Publishers must have sufficient balance to create tasks, see a confirmation before publishing, have funds immediately locked, and can cancel unaccepted tasks for a full refund.
