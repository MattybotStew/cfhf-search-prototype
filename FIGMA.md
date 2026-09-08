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
