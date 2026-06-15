#!/usr/bin/env python3
"""
Design Spec Parser - Helper to parse Gemini UI specs for implementation.
Extracts key information Claude needs to build the UI.
"""

import json
import sys
from pathlib import Path


def parse_design_spec(spec_path: str | Path) -> dict:
    """Parse a Gemini-generated design spec and extract implementation details."""
    
    with open(spec_path) as f:
        spec = json.load(f)
    
    summary = {
        "title": spec.get("meta", {}).get("title", "Untitled"),
        "framework": spec.get("meta", {}).get("framework", "react"),
        "style": spec.get("meta", {}).get("style", "modern"),
        "component_count": len(spec.get("components", [])),
        "components": [],
        "css_variables": {},
        "implementation_guide": []
    }
    
    # Extract component summary
    for comp in spec.get("components", []):
        summary["components"].append({
            "name": comp.get("name"),
            "type": comp.get("type"),
            "has_state": bool(comp.get("state")),
            "has_events": bool(comp.get("events")),
            "tailwind_classes": comp.get("styling", {}).get("className", "")
        })
    
    # Generate CSS custom properties from color scheme
    colors = spec.get("colorScheme", {})
    for name, value in colors.items():
        var_name = f"--color-{name.replace('_', '-')}"
        summary["css_variables"][var_name] = value
    
    # Generate implementation guide
    summary["implementation_guide"] = [
        f"1. Create {summary['component_count']} components",
        f"2. Use {summary['framework']} with Tailwind CSS",
        f"3. Apply color scheme via CSS variables",
        f"4. Implement interactions: {len(spec.get('interactions', []))} defined",
        f"5. Add accessibility: {bool(spec.get('accessibility'))}"
    ]
    
    return summary


def generate_css_variables(spec: dict) -> str:
    """Generate CSS custom properties from design spec."""
    
    lines = [":root {"]
    
    # Colors
    for name, value in spec.get("colorScheme", {}).items():
        var_name = name.replace("_", "-")
        lines.append(f"  --color-{var_name}: {value};")
    
    # Typography
    typo = spec.get("typography", {})
    if typo.get("fontFamily"):
        lines.append(f"  --font-family: {typo['fontFamily']};")
    if typo.get("headingFont"):
        lines.append(f"  --font-heading: {typo['headingFont']};")
    
    for size_name, size_value in typo.get("scale", {}).items():
        lines.append(f"  --text-{size_name}: {size_value};")
    
    # Spacing
    spacing = spec.get("spacing", {})
    if spacing.get("unit"):
        lines.append(f"  --spacing-unit: {spacing['unit']}px;")
    
    lines.append("}")
    
    return "\n".join(lines)


def generate_component_skeleton(component: dict, framework: str = "react") -> str:
    """Generate a component code skeleton from spec."""
    
    name = component.get("name", "Component")
    comp_type = component.get("type", "div")
    props = component.get("props", {})
    state = component.get("state", {})
    events = component.get("events", {})
    styling = component.get("styling", {})
    
    if framework == "react":
        # Generate React component
        lines = [
            f"import React, {{ useState }} from 'react';",
            "",
            f"export function {name}({{ {', '.join(props.keys())} }}) {{"
        ]
        
        # Add state
        for state_name, state_desc in state.items():
            lines.append(f"  const [{state_name}, set{state_name.title()}] = useState(null); // {state_desc}")
        
        lines.append("")
        
        # Add event handlers
        for event_name, event_desc in events.items():
            handler_name = f"handle{event_name.replace('on', '')}"
            lines.append(f"  const {handler_name} = () => {{")
            lines.append(f"    // {event_desc}")
            lines.append(f"  }};")
            lines.append("")
        
        # Add return
        class_name = styling.get("className", "")
        lines.append(f"  return (")
        lines.append(f'    <div className="{class_name}">')
        lines.append(f"      {{/* {comp_type} content */}}")
        lines.append(f"    </div>")
        lines.append(f"  );")
        lines.append(f"}}")
        
        return "\n".join(lines)
    
    return f"// {framework} skeleton for {name} not implemented"


def main():
    if len(sys.argv) < 2:
        print("Usage: python parse_design.py <design_spec.json> [--css | --skeleton <component_name>]")
        sys.exit(1)
    
    spec_path = sys.argv[1]
    
    with open(spec_path) as f:
        spec = json.load(f)
    
    if len(sys.argv) > 2:
        if sys.argv[2] == "--css":
            print(generate_css_variables(spec))
        elif sys.argv[2] == "--skeleton" and len(sys.argv) > 3:
            comp_name = sys.argv[3]
            for comp in spec.get("components", []):
                if comp.get("name") == comp_name:
                    print(generate_component_skeleton(comp, spec.get("meta", {}).get("framework", "react")))
                    break
            else:
                print(f"Component '{comp_name}' not found", file=sys.stderr)
        elif sys.argv[2] == "--summary":
            summary = parse_design_spec(spec_path)
            print(json.dumps(summary, indent=2))
    else:
        # Default: print summary
        summary = parse_design_spec(spec_path)
        print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
