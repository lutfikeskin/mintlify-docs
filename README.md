# TNI Rater Autofill docs

Developer documentation for TNI Rater Autofill, built with [Mintlify](https://mintlify.com). It explains how the extension is structured and how its parts work, with diagrams drawn by [Pele](https://pele.run). The source repository's `docs/` folder stays the source of truth for rule-by-rule detail.

## Layout

| Path | Holds |
| --- | --- |
| `docs.json` | Site settings, theme and navigation |
| `index.mdx`, `get-started/` | Overview, setup, repository map |
| `how-it-works/` | Architecture, the fill lifecycle, the side panel, data and privacy |
| `carriers-and-rules/` | Intake, rules, browser filling, carriers, TNI standards, adding a carrier |
| `ai-and-learning/` | The AI assistant, usage events, the learning loop, corrections |
| `server-and-data/` | The collection server, daily review, quoting history database |
| `dev-workflow/` | Testing, type checking, releasing |
| `pele.js`, `style.css` | Diagram rendering and the extension's colors, loaded on every page |
| `logo/`, `favicon.png` | Built from the extension's logo |

`AGENTS.md` has the writing rules, terminology and the diagram convention.

## Preview locally

```bash
npx mint dev
```

The preview is at `http://localhost:3000` (`--port` changes it). Check links with `npx mint broken-links`.

## Publishing

Mintlify deploys the default branch automatically after a push. Edits made in the Mintlify dashboard editor are drafts until published there.
