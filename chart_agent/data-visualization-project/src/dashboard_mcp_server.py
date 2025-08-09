#!/usr/bin/env python3
"""
Dashboard Generator MCP Server

This server provides a Model Context Protocol interface for generating interactive
dashboards from CSV data files. It leverages Plotly for visualization and returns
HTML dashboards that can be viewed in any browser.
"""

import os
import sys
import json
import logging
import tempfile
import base64
import asyncio
from pathlib import Path
from typing import Dict, Any, Optional, List

# Add the current directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

# Import MCP framework
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent, StreamPartialContent
from mcp.server.models import InitializationOptions

# Import dashboard generator
from mcp_plotly_integration import generate_plotly_dashboard_string

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(os.path.dirname(__file__), 'dashboard_mcp.log')),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("dashboard-mcp")

# Initialize the MCP server
app = Server("dashboard-generator-mcp")

@app.list_tools()
async def handle_list_tools() -> List[Tool]:
    """List available tools for dashboard generation"""
    return [
        Tool(
            name="generate_dashboard",
            description="Generate an interactive dashboard from CSV data",
            inputSchema={
                "type": "object",
                "properties": {
                    "csv_content": {
                        "type": "string",
                        "description": "Raw CSV content or base64 encoded CSV data"
                    },
                    "filename": {
                        "type": "string",
                        "description": "Original filename with extension (e.g., 'campaign_data.csv')"
                    },
                    "chart_type": {
                        "type": "string",
                        "description": "Optional chart type preference (bar, line, pie, etc.)",
                        "enum": ["auto", "bar", "line", "pie", "scatter", "bubble", "heatmap"],
                        "default": "auto"
                    },
                    "title": {
                        "type": "string",
                        "description": "Optional dashboard title",
                        "default": "Data Analysis Dashboard"
                    }
                },
                "required": ["csv_content", "filename"]
            }
        ),
        
        Tool(
            name="generate_marketing_dashboard",
            description="Generate a marketing campaign performance dashboard",
            inputSchema={
                "type": "object",
                "properties": {
                    "csv_content": {
                        "type": "string",
                        "description": "Raw CSV content or base64 encoded CSV data for marketing campaign"
                    },
                    "filename": {
                        "type": "string",
                        "description": "Original filename with extension (e.g., 'campaign_data.csv')"
                    },
                    "include_insights": {
                        "type": "boolean",
                        "description": "Whether to include AI-generated insights about the data",
                        "default": True
                    }
                },
                "required": ["csv_content", "filename"]
            }
        )
    ]

async def process_csv_content(csv_content: str) -> str:
    """Process CSV content, handling potential base64 encoding"""
    try:
        # Try to decode as base64
        decoded_content = base64.b64decode(csv_content).decode('utf-8')
        return decoded_content
    except:
        # If not base64, assume it's already raw CSV
        return csv_content

@app.handle_tool("generate_dashboard")
async def handle_generate_dashboard(request: Dict[str, Any]) -> TextContent:
    """Handle requests to generate dashboards from CSV data"""
    try:
        # Extract parameters
        csv_content = request.get("csv_content", "")
        filename = request.get("filename", "data.csv")
        chart_type = request.get("chart_type", "auto")
        title = request.get("title", "Data Analysis Dashboard")
        
        logger.info(f"Generating dashboard for {filename} with chart_type={chart_type}")
        
        # First stream a partial response to indicate processing
        await app.stream_partial_content(StreamPartialContent(
            content=f"Processing {filename} and generating dashboard..."
        ))
        
        # Process CSV content (handling base64 if needed)
        processed_csv = await process_csv_content(csv_content)
        
        # Create a temporary file for the CSV content
        with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as tmp_file:
            tmp_file.write(processed_csv)
            tmp_path = tmp_file.name
            
        logger.info(f"CSV data saved to temporary file: {tmp_path}")
        
        # Stream another update
        await app.stream_partial_content(StreamPartialContent(
            content=f"Analyzing data and creating visualizations..."
        ))
        
        # Generate the dashboard HTML
        dashboard_html = generate_plotly_dashboard_string(data_path=tmp_path)
        
        # Clean up the temporary file
        os.unlink(tmp_path)
        
        # Return the HTML content
        return TextContent(
            content=dashboard_html,
            metadata={
                "content_type": "text/html",
                "filename": filename.replace(".csv", "_dashboard.html"),
                "chart_type": chart_type,
                "title": title
            }
        )
        
    except Exception as e:
        logger.error(f"Error generating dashboard: {str(e)}", exc_info=True)
        return TextContent(
            content=f"Error generating dashboard: {str(e)}",
            metadata={"error": True}
        )

@app.handle_tool("generate_marketing_dashboard")
async def handle_generate_marketing_dashboard(request: Dict[str, Any]) -> TextContent:
    """Handle requests specifically for marketing campaign dashboards"""
    try:
        # Extract parameters
        csv_content = request.get("csv_content", "")
        filename = request.get("filename", "marketing_data.csv")
        include_insights = request.get("include_insights", True)
        
        logger.info(f"Generating marketing dashboard for {filename}")
        
        # Stream a partial response
        await app.stream_partial_content(StreamPartialContent(
            content=f"Processing marketing data from {filename}..."
        ))
        
        # Process CSV content (handling base64 if needed)
        processed_csv = await process_csv_content(csv_content)
        
        # Create a temporary file for the CSV content
        with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as tmp_file:
            tmp_file.write(processed_csv)
            tmp_path = tmp_file.name
            
        # Stream another update
        await app.stream_partial_content(StreamPartialContent(
            content=f"Creating marketing performance dashboard..."
        ))
        
        # Generate the dashboard HTML using our specialized marketing dashboard
        dashboard_html = generate_plotly_dashboard_string(data_path=tmp_path)
        
        # Clean up the temporary file
        os.unlink(tmp_path)
        
        # Return the HTML content
        return TextContent(
            content=dashboard_html,
            metadata={
                "content_type": "text/html",
                "filename": filename.replace(".csv", "_marketing_dashboard.html"),
                "include_insights": include_insights
            }
        )
        
    except Exception as e:
        logger.error(f"Error generating marketing dashboard: {str(e)}", exc_info=True)
        return TextContent(
            content=f"Error generating marketing dashboard: {str(e)}",
            metadata={"error": True}
        )

def main():
    """Start the MCP server"""
    logger.info("Starting Dashboard Generator MCP Server")
    stdio_server(app)

if __name__ == "__main__":
    main()
