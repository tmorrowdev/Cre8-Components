#!/usr/bin/env python3
"""
Dashboard MCP Client

A test client for the Dashboard Generator MCP Server. This script allows you to:
1. Test the MCP server by sending CSV files for dashboard generation
2. Save the generated HTML dashboards
3. Open the dashboards in a browser for viewing
"""

import os
import sys
import json
import base64
import asyncio
import webbrowser
from pathlib import Path
from typing import Dict, Any, Optional

# Try to import the MCP client library
try:
    from mcp.client import Client
    from mcp.client.stdio import stdio_client
    HAS_MCP = True
except ImportError:
    print("Warning: MCP client library not found. Running in simulated mode.")
    HAS_MCP = False

class DashboardClient:
    """Client for the Dashboard Generator MCP Server"""
    
    def __init__(self, server_command: Optional[str] = None):
        """Initialize the client"""
        self.server_command = server_command or "python dashboard_mcp_server.py"
        self.client = None
        self.output_dir = Path(__file__).parent.parent / "output"
        
        # Ensure output directory exists
        os.makedirs(self.output_dir, exist_ok=True)
    
    async def start(self) -> None:
        """Start the client and connect to the server"""
        if HAS_MCP:
            self.client = await stdio_client(self.server_command)
            print("Connected to MCP server")
        else:
            print(f"Simulating connection to MCP server with command: {self.server_command}")
    
    async def close(self) -> None:
        """Close the client connection"""
        if self.client:
            await self.client.close()
            print("Disconnected from MCP server")
    
    async def get_tools(self) -> list:
        """Get the available tools from the server"""
        if HAS_MCP and self.client:
            tools = await self.client.list_tools()
            return tools
        else:
            # Return simulated tools
            return [
                {"name": "generate_dashboard", "description": "Generate dashboard from CSV data"},
                {"name": "generate_marketing_dashboard", "description": "Generate marketing dashboard"}
            ]
    
    async def generate_dashboard(self, csv_path: str, chart_type: str = "auto", title: str = None) -> str:
        """Generate a dashboard from a CSV file"""
        # Read the CSV file
        csv_path = Path(csv_path)
        with open(csv_path, 'r') as f:
            csv_content = f.read()
        
        # Prepare the request
        filename = csv_path.name
        title = title or f"{filename.split('.')[0]} Dashboard"
        
        request = {
            "csv_content": csv_content,
            "filename": filename,
            "chart_type": chart_type,
            "title": title
        }
        
        print(f"Generating dashboard for {filename} with chart type: {chart_type}")
        
        if HAS_MCP and self.client:
            # Call the MCP server
            response = await self.client.use_tool("generate_dashboard", request)
            html_content = response.content
        else:
            # In simulation mode, use the local function directly
            print("Simulating MCP server call...")
            
            # Import the dashboard generator and generate HTML
            try:
                from mcp_plotly_integration import generate_plotly_dashboard_string
                html_content = generate_plotly_dashboard_string(data_path=csv_path)
                print("Dashboard generated in simulation mode")
            except Exception as e:
                print(f"Error generating dashboard in simulation mode: {str(e)}")
                html_content = f"<html><body><h1>Error</h1><p>{str(e)}</p></body></html>"
        
        # Save the HTML content to a file
        output_path = self.output_dir / f"{filename.split('.')[0]}_dashboard.html"
        with open(output_path, 'w') as f:
            f.write(html_content)
        
        print(f"Dashboard saved to {output_path}")
        
        # Open the dashboard in a browser
        webbrowser.open(f"file://{output_path.absolute()}")
        
        return html_content
    
    async def generate_marketing_dashboard(self, csv_path: str, include_insights: bool = True) -> str:
        """Generate a marketing dashboard from a CSV file"""
        # Read the CSV file
        csv_path = Path(csv_path)
        with open(csv_path, 'r') as f:
            csv_content = f.read()
        
        # Prepare the request
        filename = csv_path.name
        
        request = {
            "csv_content": csv_content,
            "filename": filename,
            "include_insights": include_insights
        }
        
        print(f"Generating marketing dashboard for {filename}")
        
        if HAS_MCP and self.client:
            # Call the MCP server
            response = await self.client.use_tool("generate_marketing_dashboard", request)
            html_content = response.content
        else:
            # In simulation mode, use the local function directly
            print("Simulating MCP server call...")
            
            # Import the dashboard generator and generate HTML
            try:
                from mcp_plotly_integration import generate_plotly_dashboard_string
                html_content = generate_plotly_dashboard_string(data_path=csv_path)
                print("Marketing dashboard generated in simulation mode")
            except Exception as e:
                print(f"Error generating marketing dashboard in simulation mode: {str(e)}")
                html_content = f"<html><body><h1>Error</h1><p>{str(e)}</p></body></html>"
        
        # Save the HTML content to a file
        output_path = self.output_dir / f"{filename.split('.')[0]}_marketing_dashboard.html"
        with open(output_path, 'w') as f:
            f.write(html_content)
        
        print(f"Marketing dashboard saved to {output_path}")
        
        # Open the dashboard in a browser
        webbrowser.open(f"file://{output_path.absolute()}")
        
        return html_content

async def test_client():
    """Test the dashboard client"""
    # Create the client
    client = DashboardClient()
    
    try:
        # Start the client
        await client.start()
        
        # Get the available tools
        tools = await client.get_tools()
        print("Available tools:")
        for tool in tools:
            print(f"- {tool['name']}: {tool.get('description', '')}")
        
        # Define the CSV file path
        csv_path = "/Users/tylersmbp/Documents/Bookexcel.csv"
        
        # Generate a marketing dashboard
        await client.generate_marketing_dashboard(csv_path)
        
        # Wait a bit to ensure the browser has time to open
        await asyncio.sleep(2)
        
        # Generate a regular dashboard with a bar chart
        await client.generate_dashboard(csv_path, chart_type="bar", title="Marketing Campaign Performance")
        
    finally:
        # Close the client
        await client.close()

if __name__ == "__main__":
    asyncio.run(test_client())
