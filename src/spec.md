# Specification

## Summary
**Goal:** Simplify the language support by removing all languages except English, Simplified Chinese, and Traditional Chinese.

**Planned changes:**
- Remove all language options except English (en), Simplified Chinese (zh-CN), and Traditional Chinese (zh-TW) from LanguageSelection component
- Remove all language options except English (en), Simplified Chinese (zh-CN), and Traditional Chinese (zh-TW) from LanguageSwitcher component
- Update Language type enum to include only 'en', 'zh-CN', and 'zh-TW'
- Remove translation objects for all languages except English, Simplified Chinese, and Traditional Chinese

**User-visible outcome:** Users will see only three language options (English, Simplified Chinese, Traditional Chinese) in the language selection dropdown and language switcher.
