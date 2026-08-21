# Arm configuration

Three arms, one variable: what CRE8 knowledge reaches the agent.

| Arm | What the agent gets |
|---|---|
| `baseline.yaml` | Nothing. Whatever the model already knows about `@tmorrow/cre8-wc`. |
| `a2ui-skill.yaml` | The `cre8-a2ui` skill, copied into the agent's skills directory. Static markdown, read as context. |
| `cre8-mcp.yaml` | The `@tmorrow/cre8-mcp` server over stdio. Live catalog queries: `list_components`, `get_component`, `get_a2ui_catalog`, `validate_a2ui_spec`, `get_content_model`, `get_composition`. |

Everything else is held constant: same tasks, same container image, same
verifier, same model, same attempt count.

Two rules when running these:

- **Do not pass `-a/--agent` or `-m/--model` on the command line.** Harbor
  replaces the config's whole `agents` list when `--agent` is given, which drops
  the skill or MCP server that defines the arm. `--model` without `--agent` is
  ignored outright. The model is pinned in the files instead - change it in all
  arms together, never in one.
- **Run from this directory**, so the relative `skills` path resolves.
