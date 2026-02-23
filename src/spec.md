# Specification

## Summary
**Goal:** Fix non-responsive Cancel Quest (取消任务) and Delete (删除) buttons in the Personal Center so they properly trigger their respective confirmation dialogs.

**Planned changes:**
- Wire up the Cancel Quest button to open CancelQuestDialog when clicked
- Wire up the Delete button to open DeleteQuestDialog when clicked
- Add loading states and disable buttons during processing to prevent double-clicks
- Ensure proper success/error feedback after actions complete

**User-visible outcome:** Users can successfully cancel or delete quests from their Personal Center. Clicking the buttons opens confirmation dialogs, and visual feedback shows when actions are processing.
