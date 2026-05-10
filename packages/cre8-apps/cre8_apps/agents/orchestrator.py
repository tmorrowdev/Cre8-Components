import json
import os
from google import genai

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-pro")

VALID_STEPS = ["UIDesignerAgent", "DBProvisionerAgent", "CodeGeneratorAgent"]

SYSTEM = """You are a routing agent for a full-stack app builder pipeline.
Given conversation history and current app state, decide which agents to run for the user's latest request.

Output ONLY valid JSON (no markdown, no explanation):
{"steps": [...], "reason": "..."}

Valid steps (always in this order if included):
- "UIDesignerAgent" - redesigns the component layout/structure
- "DBProvisionerAgent" - changes the database schema
- "CodeGeneratorAgent" - updates page.tsx logic, wiring, or style

Rules:
- Pure question with no change request → {"steps": [], "reason": "question only"}
- Logic/text/color change only → {"steps": ["CodeGeneratorAgent"], "reason": "..."}
- Visual layout change → {"steps": ["UIDesignerAgent", "CodeGeneratorAgent"], "reason": "..."}
- New data entity or schema change → {"steps": ["DBProvisionerAgent", "CodeGeneratorAgent"], "reason": "..."}
- Major redesign or unclear → {"steps": ["UIDesignerAgent", "DBProvisionerAgent", "CodeGeneratorAgent"], "reason": "..."}
"""


def decide_steps(
    history: list[dict],
    current_page_tsx: str,
    current_tables: list[str],
) -> list[str]:
    """Call Gemini directly to decide which pipeline steps to run."""
    client = genai.Client()

    history_text = "\n".join(
        f"{m['role'].upper()}: {m['text']}" for m in history
    )
    tables_text = ", ".join(current_tables) if current_tables else "none"

    prompt = f"""Conversation history:
{history_text}

Current state:
- Tables: {tables_text}
- page.tsx (first 800 chars): {current_page_tsx[:800]}

Decide which agents to run for the user's latest message."""

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config={"system_instruction": SYSTEM},
    )

    try:
        plan = json.loads(response.text.strip())
        steps = [s for s in plan.get("steps", VALID_STEPS) if s in VALID_STEPS]
        # Enforce ordering
        return [s for s in VALID_STEPS if s in steps]
    except (json.JSONDecodeError, AttributeError):
        # Fallback: run everything
        return list(VALID_STEPS)
