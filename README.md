# OpenWork Snippets

A collection of custom JavaScript snippets to tweak and enhance the UI of the **OpenWork Desktop App**.

## What's Inside

| Snippet | Description |
|---------|-------------|
| `ALL-IN-ONE.txt` | Combines 4 UI enhancements: custom dark scrollbar, Shiki code-block color fix (invert + hue-rotate), spellcheck disable, and a GitHub-style copy button for code blocks. |
| `katex-renderer.txt` | Renders LaTeX math formulas (`$...$` and `$$...$$`) in chat messages using the KaTeX library — no more seeing raw `$\rightarrow$` instead of →. |

## Getting Started

1. Open the OpenWork Desktop App.
2. Open DevTools (`Ctrl + Shift + I`) → go to the **Console** tab.
3. Copy the content of any snippet file, paste it into the console, and press Enter.
4. The tweaks apply immediately — no reload needed.

> 💡 **Tip:** If OpenWork has a built-in snippet / custom JS editor, you can paste the code there instead to have it run automatically on every launch.

## Snippets Detail

### `ALL-IN-ONE.txt`
Four essential UI fixes packed into one snippet:
- **Custom dark scrollbar** — matches the dark theme
- **Shiki code-block fix** — inverts light-themed code blocks so they look dark
- **Spellcheck disable** — turns off red underlines in chat inputs
- **Copy button** — adds a GitHub-style copy button to every code block

### `katex-renderer.txt`
Makes OpenWork display proper math notation:
- Detects `$...$` (inline) and `$$...$$` (display) patterns in messages
- Renders them using [KaTeX](https://katex.org/) (lightweight, fast)
- Automatically applies to new messages as they arrive (MutationObserver)
- Gracefully falls back to a red error indicator if a formula is invalid

## Why This Repo?

- Keep track of changes over time.
- Easily sync snippets across devices.
- Collaborate or share improvements with the community.

---

*Built for personal use — feel free to fork and adapt.*
