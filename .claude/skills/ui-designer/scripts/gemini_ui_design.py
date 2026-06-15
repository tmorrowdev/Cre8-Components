#!/usr/bin/env python3
"""
Gemini UI Designer - Generate UI specifications using Gemini 3 Pro API.
Output is structured JSON for Claude Opus 4.5 to implement.
"""

import argparse
import json
import os
import sys
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("Error: google-generativeai not installed.", file=sys.stderr)
    print("Run: pip install google-generativeai --break-system-packages", file=sys.stderr)
    sys.exit(1)


SYSTEM_PROMPT = """You are an expert UI/UX designer. Generate detailed, implementable UI design specifications.

Output ONLY valid JSON matching this schema:
{
  "meta": {
    "title": "string - descriptive title",
    "description": "string - brief description",
    "framework": "string - target framework",
    "style": "string - design style"
  },
  "layout": {
    "type": "string - grid|flex|stack",
    "columns": "number - grid columns if applicable",
    "areas": ["string array - named layout areas"],
    "responsive": {
      "mobile": "object - mobile layout overrides",
      "tablet": "object - tablet layout overrides"
    }
  },
  "components": [
    {
      "name": "string - PascalCase component name",
      "type": "string - card|button|input|list|modal|nav|chart|table|form|hero|etc",
      "area": "string - layout area placement",
      "props": {
        "key": "value pairs for component props"
      },
      "children": [
        "nested component objects or string content"
      ],
      "styling": {
        "className": "string - Tailwind classes",
        "customCSS": "object - any custom CSS properties"
      },
      "state": {
        "key": "description of state variables"
      },
      "events": {
        "onClick": "description of handler",
        "onChange": "description of handler"
      }
    }
  ],
  "colorScheme": {
    "primary": "hex color",
    "secondary": "hex color",
    "accent": "hex color",
    "background": "hex color",
    "surface": "hex color",
    "text": "hex color",
    "textMuted": "hex color",
    "border": "hex color",
    "success": "hex color",
    "warning": "hex color",
    "error": "hex color"
  },
  "typography": {
    "fontFamily": "string - font stack",
    "headingFont": "string - heading font if different",
    "scale": {
      "xs": "string - size",
      "sm": "string - size",
      "base": "string - size",
      "lg": "string - size",
      "xl": "string - size",
      "2xl": "string - size",
      "3xl": "string - size"
    }
  },
  "spacing": {
    "unit": "number - base spacing unit in px",
    "scale": [1, 2, 3, 4, 6, 8, 12, 16, 24, 32]
  },
  "interactions": [
    {
      "trigger": "string - user action",
      "target": "string - component name",
      "action": "string - what happens",
      "animation": "string - optional animation description"
    }
  ],
  "accessibility": {
    "ariaLabels": {"component": "label"},
    "keyboardNav": "description of keyboard navigation",
    "focusManagement": "description of focus behavior"
  },
  "implementation_notes": "string - additional guidance for the implementing AI"
}

Design principles:
- Create visually appealing, modern interfaces
- Ensure accessibility and responsive design
- Use consistent spacing and visual hierarchy
- Provide specific, actionable component definitions
- Include realistic placeholder content/data"""


STYLE_PROMPTS = {
    "modern": "Use clean lines, subtle shadows, rounded corners, and generous whitespace. Prefer gradient accents and glass-morphism effects where appropriate.",
    "minimal": "Focus on typography and whitespace. Use monochromatic colors with a single accent. Remove all unnecessary decoration.",
    "corporate": "Professional appearance with traditional layouts. Use conservative colors (blues, grays). Include clear hierarchy and data-driven components.",
    "playful": "Use vibrant colors, rounded shapes, micro-animations, and friendly illustrations. Include engaging empty states and delightful details."
}


FRAMEWORK_HINTS = {
    "react": "Design for React with functional components and hooks. Use Tailwind CSS for styling. Consider shadcn/ui component patterns.",
    "html": "Design for vanilla HTML/CSS/JS. Include specific CSS class names and semantic HTML structure.",
    "vue": "Design for Vue 3 Composition API. Use scoped styles and Vue-specific patterns.",
    "svelte": "Design for Svelte with reactive declarations. Use Svelte-specific transitions and actions."
}


def create_design_prompt(description: str, framework: str, style: str) -> str:
    """Build the full prompt for Gemini."""
    style_guidance = STYLE_PROMPTS.get(style, STYLE_PROMPTS["modern"])
    framework_guidance = FRAMEWORK_HINTS.get(framework, FRAMEWORK_HINTS["react"])
    
    return f"""Design a UI for the following request:

"{description}"

Design Style: {style}
{style_guidance}

Target Framework: {framework}
{framework_guidance}

Create a complete, detailed design specification. Include:
1. All necessary components with full prop definitions
2. Realistic sample data and placeholder content
3. Specific color values (not just "primary" - actual hex codes)
4. Responsive considerations
5. Interactive behaviors and state management
6. Accessibility features

Output ONLY the JSON specification, no markdown or explanation."""


def generate_ui_design(
    description: str,
    framework: str = "react",
    style: str = "modern",
    thinking_level: str = "high",
    api_key: str | None = None
) -> dict:
    """Call Gemini 3 Pro to generate UI design specification."""
    
    # Get API key
    key = api_key or os.environ.get("GEMINI_API_KEY")
    if not key:
        raise ValueError(
            "GEMINI_API_KEY not set. Get one at https://aistudio.google.com/apikey"
        )
    
    # Initialize client
    client = genai.Client(api_key=key)
    
    # Build prompt
    user_prompt = create_design_prompt(description, framework, style)
    
    # Configure generation
    config = types.GenerateContentConfig(
        system_instruction=SYSTEM_PROMPT,
        thinking_config=types.ThinkingConfig(
            thinking_level=thinking_level.upper()
        ),
        response_mime_type="application/json",
        temperature=0.7,
        max_output_tokens=8192
    )
    
    # Generate design
    response = client.models.generate_content(
        model="gemini-3-pro-preview",
        contents=user_prompt,
        config=config
    )
    
    # Parse response
    try:
        design_spec = json.loads(response.text)
    except json.JSONDecodeError:
        # Try to extract JSON from response if wrapped
        text = response.text
        start = text.find('{')
        end = text.rfind('}') + 1
        if start >= 0 and end > start:
            design_spec = json.loads(text[start:end])
        else:
            raise ValueError(f"Failed to parse Gemini response as JSON: {text[:500]}")
    
    # Add generation metadata
    design_spec["_generated"] = {
        "model": "gemini-3-pro-preview",
        "framework": framework,
        "style": style,
        "thinking_level": thinking_level,
        "prompt": description
    }
    
    return design_spec


def main():
    parser = argparse.ArgumentParser(
        description="Generate UI designs using Gemini 3 Pro for Claude to implement"
    )
    parser.add_argument(
        "description",
        help="Description of the UI to design"
    )
    parser.add_argument(
        "--framework", "-f",
        choices=["react", "html", "vue", "svelte"],
        default="react",
        help="Target framework (default: react)"
    )
    parser.add_argument(
        "--style", "-s",
        choices=["modern", "minimal", "corporate", "playful"],
        default="modern",
        help="Design style (default: modern)"
    )
    parser.add_argument(
        "--thinking-level", "-t",
        choices=["low", "high"],
        default="high",
        help="Gemini reasoning depth (default: high)"
    )
    parser.add_argument(
        "--output", "-o",
        type=Path,
        help="Output file path (default: stdout)"
    )
    parser.add_argument(
        "--api-key", "-k",
        help="Gemini API key (default: GEMINI_API_KEY env var)"
    )
    
    args = parser.parse_args()
    
    try:
        design = generate_ui_design(
            description=args.description,
            framework=args.framework,
            style=args.style,
            thinking_level=args.thinking_level,
            api_key=args.api_key
        )
        
        output_json = json.dumps(design, indent=2)
        
        if args.output:
            args.output.write_text(output_json)
            print(f"Design saved to {args.output}", file=sys.stderr)
        else:
            print(output_json)
            
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
