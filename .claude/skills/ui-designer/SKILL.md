---
name: ui-designer
description: Generate detailed UI design specifications that Claude Opus 4.5 by integrating with Google's Gemini 3 Pro API. Use when users ask to design a UI, want UI generation, need UI wireframes/specs to build in code or recreate in design files, or request a design to code workflow. Triggers on phrases like "create a UI or design an interface", " design", "UI", or "i need to create a UI".
---

# UI Designer Skill

Generate UI designs with Gemini 3 Pro and implement them with Claude Opus 4.5 or Claude Sonnet 4.5 or newer. This skill creates detailed UI design specifications in JSON format that Claude can use to build the actual UI code.

## Workflow

1. **Run the design script** to get UI specs from Gemini 3 Pro
2. **Parse the structured output** (JSON design specification)
3. **Implement the UI** using Claude's standard artifact/file creation capabilities

## Requirements

- `GEMINI_API_KEY` environment variable (from Google AI Studio)
- Python 3.11+ with `google-generativeai` package

## Quick Start

```bash
# Install dependency
pip install google-generativeai --break-system-packages

# Set API key
export GEMINI_API_KEY="your-api-key"

# Run design generation
python /path/to/skill/scripts/gemini_ui_design.py "Create a dashboard for tracking fitness goals"
```

## Script Usage

### Basic Usage
```bash
python scripts/gemini_ui_design.py "<ui_description>"
```

### With Options
```bash
python scripts/gemini_ui_design.py "<ui_description>" \
  --framework react \
  --style modern \
  --thinking-level high \
  --output design_spec.json
```

### Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--framework` | Target framework: `react`, `html`, `vue`, `svelte` | `react` |
| `--style` | Design style: `modern`, `minimal`, `corporate`, `playful` | `modern` |
| `--thinking-level` | Gemini reasoning depth: `low`, `high` | `high` |
| `--output` | Output file path | stdout |

## Output Format

The script outputs a JSON design specification:

```json
{
  "meta": {
    "title": "Fitness Dashboard",
    "description": "Dashboard for tracking fitness goals",
    "framework": "react",
    "style": "modern"
  },
  "layout": {
    "type": "grid",
    "columns": 12,
    "areas": ["header", "sidebar", "main", "footer"]
  },
  "components": [
    {
      "name": "GoalProgressCard",
      "type": "card",
      "props": {...},
      "children": [...],
      "styling": {...}
    }
  ],
  "colorScheme": {...},
  "typography": {...},
  "interactions": [...],
  "implementation_notes": "..."
}
```

## Claude Implementation Phase

After receiving the Gemini design spec, Claude should:

1. **Parse the JSON spec** into component requirements
2. **Generate code** matching the specified framework
3. **Apply styling** per colorScheme and typography
4. **Add interactions** as specified
5. **Output as artifact** or file in `/mnt/user-data/outputs/`

## Prompt Templates

See `references/prompt_templates.md` for customizable prompts sent to Gemini.

## Error Handling

| Error | Solution |
|-------|----------|
| `GEMINI_API_KEY not set` | Export your API key from Google AI Studio |
| `Rate limit exceeded` | Wait or use `--thinking-level low` |
| `Invalid model` | Ensure API key has Gemini 3 Pro access |

## Example End-to-End Workflow

```python
# 1. User request
"Design a task management app with Gemini, then build it"

# 2. Run Gemini design
python scripts/gemini_ui_design.py "Task management app with kanban board, 
task creation, drag-and-drop, and team collaboration" --framework react

# 3. Claude receives JSON spec and implements:
# - React components per spec
# - Tailwind styling per colorScheme
# - Drag-and-drop interactions
# - Outputs to /mnt/user-data/outputs/task-app.jsx
```
