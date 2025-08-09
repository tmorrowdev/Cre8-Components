#!/usr/bin/env python3
"""
MCP Integration Example
Shows how to integrate the plotly dashboard generator with the MCP framework
"""

import os
import sys
import json
import pandas as pd
from pathlib import Path

# Add the current directory to the path for imports
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

try:
    # Import the MCP server
    from mcp.server import Server
    from mcp.types import Tool, TextContent
    
    # Import our dashboard generator
    from mcp_plotly_integration import generate_plotly_dashboard_string, NpEncoder
    
    HAS_MCP = True
except ImportError:
    print("Warning: MCP framework not found. Running in demo mode.")
    HAS_MCP = False

def setup_mcp_server():
    """Set up the MCP server with the dashboard generator tool"""
    
    # Create the MCP server
    app = Server("plotly-dashboard-generator")
    
    @app.list_tools()
    async def handle_list_tools():
        """List available tools"""
        return [
            Tool(
                name="generate_marketing_dashboard",
                description="Generate an interactive marketing campaign performance dashboard",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "file_content": {
                            "type": "string",
                            "description": "Raw CSV content or base64 encoded content"
                        },
                        "filename": {
                            "type": "string",
                            "description": "Original filename with extension (e.g., 'campaign_data.csv')"
                        }
                    },
                    "required": ["file_content", "filename"]
                }
            )
        ]
    
    @app.handle_tool("generate_marketing_dashboard")
    async def handle_generate_dashboard(request):
        """Handle the dashboard generation request"""
        try:
            # Get the file content and filename
            file_content = request.get("file_content", "")
            filename = request.get("filename", "")
            
            # Create a temporary file
            with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as tmp_file:
                tmp_file.write(file_content)
                tmp_path = tmp_file.name
            
            # Generate the dashboard
            html_string = generate_plotly_dashboard_string(data_path=tmp_path)
            
            # Clean up the temp file
            os.unlink(tmp_path)
            
            # Return the HTML string
            return TextContent(
                content=html_string,
                metadata={
                    "content_type": "text/html",
                    "filename": filename.replace(".csv", "_dashboard.html")
                }
            )
        except Exception as e:
            return TextContent(
                content=f"Error generating dashboard: {str(e)}",
                metadata={"error": True}
            )
    
    return app

def demo_mode():
    """Run in demo mode when MCP is not available"""
    print("\nRunning in demo mode (MCP framework not available)")
    
    # Use a sample data path
    data_path = Path('/Users/tylersmbp/Documents/Bookexcel.csv')
    if not data_path.exists():
        print(f"Error: Sample data file not found at {data_path}")
        return
    
    # Import the function directly
    from mcp_plotly_integration import generate_plotly_dashboard_string
    
    # Generate the dashboard
    html_string = generate_plotly_dashboard_string(data_path=data_path)
    
    # Save it to a file
    output_dir = Path(__file__).parent.parent / 'output'
    output_file = output_dir / 'mcp_integration_demo.html'
    os.makedirs(output_dir, exist_ok=True)
    
    with open(output_file, 'w') as f:
        f.write(html_string)
    
    print(f"Dashboard saved to {output_file}")
    
    # Open it in the browser
    import webbrowser
    webbrowser.open(f"file://{output_file}")

if __name__ == "__main__":
    if HAS_MCP:
        # Start the MCP server
        app = setup_mcp_server()
        print("Starting MCP server for plotly dashboard generation...")
        app.start()
    else:
        # Run in demo mode
        demo_mode()
