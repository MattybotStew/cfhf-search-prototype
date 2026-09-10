# Figma — all agents

This project is wired to **Figma’s remote MCP server** at `https://mcp.figma.com/mcp`.
Use it from Grok, Claude Code, Cursor, Cline, VS Code Copilot, Codex, and Gemini.

Pair MCP (live context / screenshots) with the local pipeline (`figma sync`) for tokens, assets, and component scaffolding.

## Authenticate (once per tool)

OAuth is required. On first connect, approve access in the browser.

- **Grok:** `/mcps` → select `figma` → authenticate
- **Claude Code:** `/mcp` → `figma` → Authenticate
- **Cursor / VS Code:** Start / Connect next to the Figma server, then Allow access
- **Cline:** MCP Servers panel → Figma → authenticate

In the Figma file, enable **Share → MCP access** so the server can read it.

## Required flow for design-to-code

1. Paste a Figma file or frame URL (`Copy link to selection`).
2. Call `get_design_context` for the exact node.
3. If the payload is huge or truncated, call `get_metadata` then re-fetch only the needed node(s).
4. Call `get_screenshot` for a visual reference.
5. Only then download assets and implement.
6. Translate MCP output into **this project’s** stack, tokens, and components. Do not paste generated React/Tailwind as-is if the repo uses something else.
7. Check the result against the screenshot before calling the work done.

## Asset rules

- If MCP returns a localhost URL for an image or SVG, use that source directly.
- Do not invent placeholders when a real asset URL was provided.
- Do not add a new icon package when the Figma payload already has the asset.

## html.to.design import (Happenings prototype)

Use this when capturing **HTML → Figma** with the html.to.design plugin (Matt’s userflow on **Wireframes 2** [`553:1219`](https://www.figma.com/design/jcbtHK67Ih9BsBxFQK7F7l/College-Football---Global-Banner?node-id=553-1219)). MCP `get_screenshot` is for design-to-code, not this flow.

### Why images go missing

| Cause | Symptom in Figma |
|-------|------------------|
| CSS `background-image` on heroes | Gray/black hero, no photo |
| Remote WebP (cfbhall.com) or 404 src | Empty `Image (...)` frames on cards |
| `file://` or GitHub Pages before JPEG deploy | Same empty frames |

### Required capture setup

1. From repo root: `python3 -m http.server 8080`
2. Use **absolute** localhost URLs (generators bake these in):
   - **Listing (validated):** `http://127.0.0.1:8080/happenings-listing-import.html`
   - **Full flow:** `screens/01-listing-d.html` (1440) … `09-related-m.html` (390) — index at `screens/index.html`
3. Heroes and cards must be **`<img>`** with `width`/`height` — live pages use `assets/images/happenings/`; import screens use `screens/img/` via generator
4. After editing markup or images, regenerate:
   ```bash
   python3 scripts/generate_figma_import.py
   python3 screens/generate_screens.py
   ```
5. Kaneda/Neusa (Typekit) may not embed — swap to Hall Figma text styles after import

**Do not regress:** no CSS background heroes on import targets; no MCP asset upload as a substitute for re-import when frames are empty.

## Local pipeline (tokens / assets / components)

```bash
figma sync --project .
# or, if this repo has npm scripts:
npm run figma:sync
```

- Config: `figma.config.json`
- Credentials (REST pipeline only): `FIGMA_TOKEN` and `FIGMA_FILE_KEY` in `.env`
- Create a token: Figma → Account → Settings → Security → Personal access tokens

## MCP configs in this folder

| Tool | File |
| ---- | ---- |
| Claude / generic | `.mcp.json` |
| Grok | `.grok/config.toml` |
| Cursor | `.cursor/mcp.json` + `.cursor/rules/figma.mdc` |
| VS Code / Copilot | `.vscode/mcp.json` |
| Codex | `.codex/config.toml` |
| Gemini CLI | `.gemini/settings.json` |
| Claude Code project | `.claude/settings.json` |
