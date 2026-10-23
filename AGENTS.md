# Documentation project instructions

## About this project

- This is the developer documentation for **TNI Rater Autofill**, a Chrome MV3 extension that turns an intake PDF into commercial auto quote answers on carrier raters. The code lives in the private repository `lutfikeskin/tni-rater-autofill`.
- These pages explain how the project fits together. The repository's own `docs/` folder holds the rule-by-rule detail and stays the source of truth: each page here ends with a link to the document it summarizes. When the code or those documents change, update the matching page.
- The site is built on [Mintlify](https://mintlify.com): MDX pages with YAML frontmatter, configuration in `docs.json`.
- Use the Mintlify MCP server, `https://mcp.mintlify.com`, to edit content and settings via MCP, and the Mintlify docs MCP server, `https://www.mintlify.com/docs/mcp`, for questions about Mintlify.

## Diagrams

Diagrams are drawn with [Pele](https://pele.run), a Mermaid renderer whose colors come from CSS variables. Write Mermaid text in a `text` code block inside a `pele-diagram` div:

````mdx
<div className="pele-diagram">
```text
flowchart LR
  A["Intake PDF"] --> B["Client record"]
```
</div>
````

- `pele.js` loads Pele (pinned to one version on jsDelivr) and draws every such block; `style.css` maps the extension's colors onto Pele's variables. Don't use plain ` ```mermaid ` blocks: Mintlify draws those with its own Mermaid in other colors.
- If Pele can't load or the text doesn't parse, the code block shows instead, so the text stays readable.
- The reading column is about 600px on a laptop. Keep a row to four or five short nodes. For a longer flow, use `flowchart TB` with `subgraph … direction LR` rows linked subgraph to subgraph (`A --> B` between subgraph ids). In a subgraph whose nodes aren't linked, use `direction TB` so they sit side by side.
- Below 520px wide (phones), left-to-right diagrams turn vertical by themselves.

## Terminology

- **Intake**: the client's TNI Commercial Insurance Quote Application, a fillable PDF. **Client record**: what the extension reads from it.
- **Carrier** or **rater**: Progressive, AmWINS, GEICO. **Agent**: the licensed TNI agent using the extension.
- **TNI standard**: TNI's own fixed answer for a question the intake doesn't answer. Never call any other default a standard.
- **Fill engine** or **pagekit**: `src/content/pagekit.js`. **Side panel** or **panel**: the extension's interface.
- **Luna**: the AI assistant (OpenAI `gpt-6-luna`).

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references
- Name the panel's buttons and settings exactly as the panel shows them

## Content boundaries

- Never include credentials or tokens (the OpenAI key, `RATER_TOKEN`, `RATER_ADMIN_TOKEN`), client values, or anything from the ignored `layouts/` or `server-data/` folders.
- Don't describe a proposed capability as implemented. Keep the project's distinctions: unknown isn't No; a filled or carrier-accepted answer isn't proof it's correct; mock results aren't live accuracy.
