# OpenWork Snippets

A collection of custom JavaScript snippets to tweak and enhance the UI of the **OpenWork Desktop App**.

## What's Inside

| Snippet | Description |
|---------|-------------|
| `ALL-IN-ONE.txt` | Combines 4 UI enhancements: custom dark scrollbar, Shiki code-block color fix (invert + hue-rotate), spellcheck disable, and a GitHub-style copy button for code blocks. |
| `openwork-mathjax-inject.js` | Renders LaTeX math formulas (`$...$` and `$$...$$`) in chat messages using MathJax 3 — ideal for discussing math, physics, or any technical notation. |

## Getting Started

1. Open the OpenWork Desktop App.
2. Open DevTools (`Ctrl + Shift + I`) → go to the **Console** tab.
3. Copy the content of any snippet file, paste it into the console, and press Enter.
4. The tweaks apply immediately — no reload needed.

> **Tip:** For the MathJax snippet, it's better to use **Sources > Snippets** (persistent, re-runnable) rather than the Console.

## Snippets Detail

### `ALL-IN-ONE.txt`
Four essential UI fixes packed into one snippet:
- **Custom dark scrollbar** — matches the dark theme
- **Shiki code-block fix** — inverts light-themed code blocks so they look dark
- **Spellcheck disable** — turns off red underlines in chat inputs
- **Copy button** — adds a GitHub-style copy button to every code block

### `openwork-mathjax-inject.js`
Makes OpenWork display proper math notation using MathJax 3:
- Renders `$$...$$` as display math (left-aligned)
- Renders `$...$` as inline math
- Auto-renders new messages as they arrive (MutationObserver with 500ms debounce)
- Exposes `window.renderMath()` for manual re-rendering
- Falls back to an alternative CDN if the primary one is unreachable

**Known limitation:** `\begin{cases}...`, `\begin{vmatrix}...` and similar multi-line environments collapse to a single line. The workaround handles all other standard LaTeX (integrals, sums, fractions, aligned equations, etc.) well.

### `katex-renderer.txt` *(removed)*
Replaced by `openwork-mathjax-inject.js` — MathJax provides better coverage of LaTeX features (AMS environments, `\tag`, etc.).

## Why This Repo?

- Keep track of changes over time.
- Easily sync snippets across devices.
- Collaborate or share improvements with the community.

---

*Built for personal use — feel free to fork and adapt.*
