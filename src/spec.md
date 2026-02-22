# Specification

## Summary
**Goal:** Implement a complete ICP-based financial payment system with dynamic deposit rates, automated reward distribution, and a three-tier dispute resolution mechanism with community voting.

**Planned changes:**
- Integrate ICP Ledger Canister for real token transfers (deposits, rewards, platform fees)
- Implement dynamic deposit calculation starting at 50% of bounty, reducing by 3% per successful completion down to 2% minimum
- Reset deposit rate to 50% when warriors abandon quests or lose dispute votes
- Create automated reward distribution with 6% platform fee, executing atomically after 24-hour objection period
- Build three-tier dispute resolution system: auto-release → weighted voting (30% publisher + 15% admin + 55% community) → written reasoning → admin final decision
- Add community voting interface displaying quest details, arguments, and real-time weighted vote distribution
- Create appeal submission forms for publishers and warriors to submit dispute reasoning (minimum 100 characters)
- Extend quest data model with deposit amount, deposit rate, dispute status, voting records, appeal submissions, and auto-release timer
- Display warrior credit score and deposit rate progress in Personal Center with credit history
- Update Quest Cards to show required deposit based on warrior's credit score and trigger ICP deposit collection on acceptance

**User-visible outcome:** Warriors can accept quests by depositing ICP tokens that decrease with successful completions. Upon quest completion, funds automatically distribute after 24 hours unless disputes arise, which are resolved through weighted community voting with multiple appeal tiers. Users can track their credit score progress and participate in dispute resolution voting.
