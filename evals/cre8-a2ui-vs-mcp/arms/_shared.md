# Arm configuration

Three arms, one variable: what CRE8 knowledge reaches the agent.

| Arm | What the agent gets |
|---|---|
| `baseline.yaml` | Nothing. Whatever the model already knows about `@tmorrow/cre8-wc`. |
| `a2ui-skill.yaml` | The `cre8-a2ui` skill, copied into the agent's skills directory. Static markdown, read as context. |
| `cre8-mcp.yaml` | The `@tmorrow/cre8-mcp` server over stdio. Live catalog queries: `list_components`, `get_component`, `get_a2ui_catalog`, `validate_a2ui_spec`, `get_content_model`, `get_composition`. |

Everything else is held constant: same tasks, same container image, same
verifier, same model, same attempt count.

## The freecode arm

`cre8-mcp-freecode.yaml` is deliberately **not** part of that comparison. It
runs one task, `mcp-freecode-portfolio`, and the other four configs exclude
that task by name.

The three-arm tasks all ask for a hand-authored A2UI JSON file. That is a fair
question for `baseline` and `a2ui-skill`, but a circular one for `cre8-mcp`:
the server ships `validate_a2ui_spec` and `get_a2ui_catalog`, which check
against the exact schema the task is graded on. cre8-mcp's real mode is
generating code, so the freecode task asks for real React using
`@tmorrow/cre8-react` and scores it by building and rendering it for real, then
auditing the live DOM against the same catalog-fidelity dimensions.

That means it cannot hold the same variable constant, and does not try to:

- **Bash is allowed** (the other arms disallow it). The deliverable has to
  typecheck and build against a real installed `@tmorrow/cre8-react`, so the
  library's `.d.ts` files are in `node_modules` either way. Withholding Bash
  would only stop the agent from running the build its instructions require,
  while leaving the catalog just as readable.
- **It measures what cre8-mcp produces under realistic conditions**, not a
  like-for-like knowledge-isolation contrast. Don't read its reward next to the
  three-arm numbers as if it were a fourth column.

Two rules when running these:

- **Do not pass `-a/--agent` or `-m/--model` on the command line.** Harbor
  replaces the config's whole `agents` list when `--agent` is given, which drops
  the skill or MCP server that defines the arm. `--model` without `--agent` is
  ignored outright. The model is pinned in the files instead - change it in all
  arms together, never in one.
- **Run from this directory**, so the relative `skills` path resolves.
