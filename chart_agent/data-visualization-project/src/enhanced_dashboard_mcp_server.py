#!/usr/bin/env python3
"""
Enhanced Dashboard Generator MCP Server

This server provides a Model Context Protocol interface for generating interactive
dashboards from CSV data files. It includes advanced features like:
1. Dashboard recommendation based on data analysis
2. Marketing campaign analysis dashboards
3. Custom visualization generation
4. Deployment capabilities
"""

import os
import sys
import json
import logging
import tempfile
import base64
import asyncio
from pathlib import Path
from typing import Dict, Any, Optional, List, Union

# Add the current directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

# Import MCP framework
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent
from mcp.server.models import InitializationOptions

# Import dashboard generator and recommender
from mcp_plotly_integration import generate_plotly_dashboard_string
from dashboard_recommender import DashboardRecommender
import pandas as pd
import numpy as np

# For deployment
import shutil
import socket
import subprocess
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(os.path.dirname(__file__), 'enhanced_dashboard_mcp.log')),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("enhanced-dashboard-mcp")

# Custom JSON encoder for NumPy types
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, pd.Series):
            return obj.tolist()
        if isinstance(obj, pd.Timestamp):
            return str(obj)
        return super(NpEncoder, self).default(obj)

# Initialize the MCP server
app = Server("enhanced-dashboard-generator-mcp")

# Initialize the dashboard recommender
recommender = DashboardRecommender()

# Global deployment information
deployment_info = {
    "server": None,
    "port": None,
    "thread": None,
    "deployment_dir": None,
    "dashboards": []
}

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
        ),
        
        Tool(
            name="recommend_dashboard",
            description="Analyze data and recommend the most appropriate dashboard visualizations",
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
                    "generate_preview": {
                        "type": "boolean",
                        "description": "Whether to generate a preview dashboard based on recommendations",
                        "default": False
                    }
                },
                "required": ["csv_content", "filename"]
            }
        ),
        
        Tool(
            name="deploy_dashboard_server",
            description="Deploy a web server to serve the generated dashboards",
            inputSchema={
                "type": "object",
                "properties": {
                    "port": {
                        "type": "integer",
                        "description": "Port number to serve the dashboards on",
                        "default": 8000
                    },
                    "open_browser": {
                        "type": "boolean",
                        "description": "Whether to open the dashboard in a browser",
                        "default": True
                    }
                }
            }
        ),
        
        Tool(
            name="list_deployed_dashboards",
            description="List all deployed dashboards",
            inputSchema={
                "type": "object",
                "properties": {}
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
        
        # Create a progress token for updates
        progress_token = ProgressToken()
        
        # First send a progress notification
        await app.progress_notification(
            progress_token, 
            progress=0.1, 
            total=1.0, 
            message=f"Processing {filename} and generating dashboard..."
        )
        
        # Process CSV content (handling base64 if needed)
        processed_csv = await process_csv_content(csv_content)
        
        # Create a temporary file for the CSV content
        with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as tmp_file:
            tmp_file.write(processed_csv)
            tmp_path = tmp_file.name
            
        logger.info(f"CSV data saved to temporary file: {tmp_path}")
        
        # Send another progress notification
        await app.progress_notification(
            progress_token, 
            progress=0.4, 
            total=1.0, 
            message=f"Analyzing data and creating visualizations..."
        )
        
        # Generate the dashboard HTML
        dashboard_html = generate_plotly_dashboard_string(data_path=tmp_path)
        
        # Clean up the temporary file
        os.unlink(tmp_path)
        
        # If deployment server is running, save a copy there
        output_filename = filename.replace(".csv", "_dashboard.html")
        if deployment_info["deployment_dir"]:
            output_path = os.path.join(deployment_info["deployment_dir"], output_filename)
            with open(output_path, 'w') as f:
                f.write(dashboard_html)
                
            # Add to the list of dashboards
            dashboard_url = f"http://localhost:{deployment_info['port']}/{output_filename}"
            deployment_info["dashboards"].append({
                "name": output_filename,
                "url": dashboard_url,
                "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            
            logger.info(f"Dashboard also saved to deployment server: {output_path}")
        
        # Return the HTML content
        return TextContent(
            content=dashboard_html,
            metadata={
                "content_type": "text/html",
                "filename": output_filename,
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
        
        # If deployment server is running, save a copy there
        output_filename = filename.replace(".csv", "_marketing_dashboard.html")
        if deployment_info["deployment_dir"]:
            output_path = os.path.join(deployment_info["deployment_dir"], output_filename)
            with open(output_path, 'w') as f:
                f.write(dashboard_html)
                
            # Add to the list of dashboards
            dashboard_url = f"http://localhost:{deployment_info['port']}/{output_filename}"
            deployment_info["dashboards"].append({
                "name": output_filename,
                "url": dashboard_url,
                "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            
            logger.info(f"Dashboard also saved to deployment server: {output_path}")
        
        # Return the HTML content
        return TextContent(
            content=dashboard_html,
            metadata={
                "content_type": "text/html",
                "filename": output_filename,
                "include_insights": include_insights
            }
        )
        
    except Exception as e:
        logger.error(f"Error generating marketing dashboard: {str(e)}", exc_info=True)
        return TextContent(
            content=f"Error generating marketing dashboard: {str(e)}",
            metadata={"error": True}
        )

@app.handle_tool("recommend_dashboard")
async def handle_recommend_dashboard(request: Dict[str, Any]) -> Union[TextContent, BinaryContent]:
    """Handle requests to analyze data and recommend dashboard visualizations"""
    try:
        # Extract parameters
        csv_content = request.get("csv_content", "")
        filename = request.get("filename", "data.csv")
        generate_preview = request.get("generate_preview", False)
        
        logger.info(f"Analyzing {filename} for dashboard recommendations")
        
        # Stream a partial response
        await app.stream_partial_content(StreamPartialContent(
            content=f"Analyzing {filename} to determine optimal visualizations..."
        ))
        
        # Process CSV content (handling base64 if needed)
        processed_csv = await process_csv_content(csv_content)
        
        # Create a temporary file for the CSV content
        with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as tmp_file:
            tmp_file.write(processed_csv)
            tmp_path = tmp_file.name
        
        # Read the data
        df = pd.read_csv(tmp_path)
        
        # Analyze the data and get recommendations
        recommendations = recommender.analyze_and_recommend(df)
        
        # Clean up the temporary file
        os.unlink(tmp_path)
        
        # Generate a preview dashboard if requested
        if generate_preview:
            # Stream update
            await app.stream_partial_content(StreamPartialContent(
                content=f"Generating preview dashboard based on recommendations..."
            ))
            
            # Generate dashboard using the recommendations
            # This would be an advanced feature to auto-generate a dashboard from recommendations
            preview_html = generate_plotly_dashboard_string(dataframe=df)
            
            # If deployment server is running, save a copy there
            output_filename = filename.replace(".csv", "_recommended_dashboard.html")
            if deployment_info["deployment_dir"]:
                output_path = os.path.join(deployment_info["deployment_dir"], output_filename)
                with open(output_path, 'w') as f:
                    f.write(preview_html)
                    
                # Add to the list of dashboards
                dashboard_url = f"http://localhost:{deployment_info['port']}/{output_filename}"
                deployment_info["dashboards"].append({
                    "name": output_filename,
                    "url": dashboard_url,
                    "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
                })
                
                # Add the URL to the recommendations
                recommendations["preview_url"] = dashboard_url
            
            # Include the HTML in the response
            recommendations["preview_html"] = preview_html
        
        # Return the recommendations as JSON
        return TextContent(
            content=json.dumps(recommendations, cls=NpEncoder, indent=2),
            metadata={
                "content_type": "application/json",
                "filename": filename.replace(".csv", "_recommendations.json")
            }
        )
        
    except Exception as e:
        logger.error(f"Error recommending dashboard: {str(e)}", exc_info=True)
        return TextContent(
            content=json.dumps({"error": str(e)}, indent=2),
            metadata={"error": True}
        )

@app.handle_tool("deploy_dashboard_server")
async def handle_deploy_dashboard_server(request: Dict[str, Any]) -> TextContent:
    """Deploy a local web server to serve the dashboards"""
    try:
        # Extract parameters
        port = request.get("port", 8000)
        open_browser = request.get("open_browser", True)
        
        # Check if a server is already running
        if deployment_info["server"]:
            return TextContent(
                content=json.dumps({
                    "status": "already_running",
                    "port": deployment_info["port"],
                    "message": f"Dashboard server is already running at http://localhost:{deployment_info['port']}",
                    "dashboards": deployment_info["dashboards"]
                }, indent=2),
                metadata={"content_type": "application/json"}
            )
        
        # Create a deployment directory if it doesn't exist
        project_dir = Path(__file__).parent.parent
        deployment_dir = project_dir / "deployment"
        os.makedirs(deployment_dir, exist_ok=True)
        
        # Create an index.html file for the deployment directory
        index_html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dashboard Deployment Server</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
            color: #212529;
        }}
        .container {{
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 15px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #343a40;
            text-align: center;
            margin-bottom: 30px;
            font-weight: 300;
            font-size: 2.5em;
        }}
        .dashboard-list {{
            list-style-type: none;
            padding: 0;
        }}
        .dashboard-item {{
            background-color: #ffffff;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .dashboard-name {{
            font-weight: bold;
            font-size: 1.2em;
        }}
        .dashboard-time {{
            color: #6c757d;
            font-size: 0.9em;
        }}
        .view-button {{
            background-color: #0d6efd;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
            transition: background-color 0.2s;
            text-decoration: none;
        }}
        .view-button:hover {{
            background-color: #0b5ed7;
        }}
        .refresh-container {{
            text-align: center;
            margin-top: 20px;
        }}
        .refresh-button {{
            background-color: #6c757d;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
        }}
        .upload-section {{
            margin-top: 30px;
            padding: 20px;
            background-color: #f1f8ff;
            border-radius: 8px;
        }}
        .upload-title {{
            font-size: 1.2em;
            margin-bottom: 15px;
        }}
        #fileInput {{
            margin-bottom: 10px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Dashboard Deployment Server</h1>
        
        <div class="dashboard-list" id="dashboardList">
            <!-- Dashboards will be listed here dynamically -->
            <div class="dashboard-item">
                <div>
                    <div class="dashboard-name">No dashboards available yet</div>
                    <div class="dashboard-time">Generate a dashboard to see it here</div>
                </div>
            </div>
        </div>
        
        <div class="refresh-container">
            <button class="refresh-button" onclick="location.reload()">Refresh List</button>
        </div>
    </div>
    
    <script>
        // JavaScript could be added here to dynamically update the dashboard list
    </script>
</body>
</html>
"""
        
        with open(os.path.join(deployment_dir, "index.html"), "w") as f:
            f.write(index_html)
            
        # Define the HTTP request handler
        class DashboardHTTPHandler(SimpleHTTPRequestHandler):
            def __init__(self, *args, **kwargs):
                # Set the directory to serve files from
                self.directory = str(deployment_dir)
                super().__init__(*args, **kwargs)
                
            def log_message(self, format, *args):
                # Suppress log messages to prevent console spam
                return
        
        # Find an available port starting from the requested one
        while True:
            try:
                # Try to create a server on the port
                server = HTTPServer(("", port), DashboardHTTPHandler)
                break
            except socket.error:
                logger.info(f"Port {port} is in use, trying {port+1}")
                port += 1
                if port > 65535:
                    raise Exception("No available ports")
        
        # Store deployment information
        deployment_info["server"] = server
        deployment_info["port"] = port
        deployment_info["deployment_dir"] = deployment_dir
        deployment_info["dashboards"] = []
        
        # Start the server in a separate thread
        def run_server():
            logger.info(f"Starting dashboard server on port {port}")
            server.serve_forever()
            
        server_thread = threading.Thread(target=run_server, daemon=True)
        server_thread.start()
        deployment_info["thread"] = server_thread
        
        # Wait a moment for the server to start
        await asyncio.sleep(1)
        
        # Open the browser if requested
        url = f"http://localhost:{port}"
        if open_browser:
            webbrowser.open(url)
        
        return TextContent(
            content=json.dumps({
                "status": "success",
                "port": port,
                "url": url,
                "message": f"Dashboard server successfully started at {url}",
                "deployment_dir": str(deployment_dir)
            }, indent=2),
            metadata={"content_type": "application/json"}
        )
        
    except Exception as e:
        logger.error(f"Error deploying dashboard server: {str(e)}", exc_info=True)
        return TextContent(
            content=json.dumps({
                "status": "error",
                "message": f"Error deploying dashboard server: {str(e)}"
            }, indent=2),
            metadata={"error": True}
        )

@app.handle_tool("list_deployed_dashboards")
async def handle_list_deployed_dashboards(request: Dict[str, Any]) -> TextContent:
    """List all deployed dashboards"""
    try:
        if not deployment_info["server"]:
            return TextContent(
                content=json.dumps({
                    "status": "not_running",
                    "message": "Dashboard server is not running. Use deploy_dashboard_server tool first.",
                    "dashboards": []
                }, indent=2),
                metadata={"content_type": "application/json"}
            )
            
        return TextContent(
            content=json.dumps({
                "status": "success",
                "port": deployment_info["port"],
                "url": f"http://localhost:{deployment_info['port']}",
                "dashboards": deployment_info["dashboards"]
            }, indent=2),
            metadata={"content_type": "application/json"}
        )
        
    except Exception as e:
        logger.error(f"Error listing dashboards: {str(e)}", exc_info=True)
        return TextContent(
            content=json.dumps({
                "status": "error",
                "message": f"Error listing dashboards: {str(e)}"
            }, indent=2),
            metadata={"error": True}
        )

def main():
    """Start the MCP server"""
    logger.info("Starting Enhanced Dashboard Generator MCP Server")
    stdio_server(app)

if __name__ == "__main__":
    main()
