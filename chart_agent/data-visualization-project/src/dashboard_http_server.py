#!/usr/bin/env python3
"""
Dashboard MCP HTTP Server

This server provides a REST API interface to the Dashboard Generator MCP Server.
It allows clients to submit CSV data and receive interactive dashboards via HTTP.
"""

import os
import sys
import json
import base64
import logging
import asyncio
import tempfile
import subprocess
from pathlib import Path
from typing import Dict, Any, Optional, List, Union

# Add the current directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

# Try to import FastAPI
try:
    from fastapi import FastAPI, HTTPException, BackgroundTasks, Request, Form, File, UploadFile
    from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
    from fastapi.staticfiles import StaticFiles
    from fastapi.templating import Jinja2Templates
    from pydantic import BaseModel
    import uvicorn
    HAS_FASTAPI = True
except ImportError:
    print("FastAPI not installed. Please install it with: pip install fastapi uvicorn jinja2")
    HAS_FASTAPI = False
    sys.exit(1)

# Import the MCP client if available
try:
    from mcp.client import Client
    from mcp.client.stdio import stdio_client
    HAS_MCP = True
except ImportError:
    print("Warning: MCP client library not found. Using direct function calls.")
    HAS_MCP = False

# Import the dashboard generator
from mcp_plotly_integration import generate_plotly_dashboard_string

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(os.path.dirname(__file__), 'dashboard_http.log')),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("dashboard-http")

# Create the FastAPI app
app = FastAPI(
    title="Dashboard Generator API",
    description="API for generating interactive dashboards from CSV data",
    version="1.0.0"
)

# Define request models
class DashboardRequest(BaseModel):
    csv_content: str
    filename: str
    chart_type: str = "auto"
    title: str = "Data Analysis Dashboard"

class MarketingDashboardRequest(BaseModel):
    csv_content: str
    filename: str
    include_insights: bool = True

# Set up static files and templates
templates_dir = Path(__file__).parent.parent / "templates"
output_dir = Path(__file__).parent.parent / "output"
os.makedirs(output_dir, exist_ok=True)

# Mount static files
app.mount("/output", StaticFiles(directory=str(output_dir)), name="output")

# Create templates directory if it doesn't exist
if not templates_dir.exists():
    os.makedirs(templates_dir, exist_ok=True)
    # Create a basic index.html template if it doesn't exist
    index_html_path = templates_dir / "index.html"
    if not index_html_path.exists():
        with open(index_html_path, "w") as f:
            f.write("""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        form {
            background-color: #f4f4f4;
            padding: 20px;
            border-radius: 8px;
        }
        label {
            display: block;
            margin: 10px 0 5px;
            font-weight: bold;
        }
        input, select {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        .api-section {
            margin-top: 30px;
            background-color: #e9f7ef;
            padding: 20px;
            border-radius: 8px;
        }
        pre {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h1>Dashboard Generator</h1>
    
    <form action="/upload" method="post" enctype="multipart/form-data">
        <h2>Upload CSV File</h2>
        <label for="file">CSV File:</label>
        <input type="file" name="file" id="file" accept=".csv" required>
        
        <label for="chart_type">Chart Type:</label>
        <select name="chart_type" id="chart_type">
            <option value="auto">Auto (recommended)</option>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="scatter">Scatter Plot</option>
            <option value="bubble">Bubble Chart</option>
            <option value="heatmap">Heatmap</option>
        </select>
        
        <label for="title">Dashboard Title:</label>
        <input type="text" name="title" id="title" placeholder="Data Analysis Dashboard">
        
        <label>
            <input type="checkbox" name="marketing" value="true"> Generate Marketing Dashboard
        </label>
        
        <button type="submit">Generate Dashboard</button>
    </form>
    
    <div class="api-section">
        <h2>API Documentation</h2>
        <p>You can also use the REST API directly:</p>
        
        <h3>Generate Dashboard</h3>
        <pre>
POST /api/generate
Content-Type: application/json

{
  "csv_content": "column1,column2\\nvalue1,value2\\n...",
  "filename": "data.csv",
  "chart_type": "auto",
  "title": "My Dashboard"
}
        </pre>
        
        <h3>Generate Marketing Dashboard</h3>
        <pre>
POST /api/generate/marketing
Content-Type: application/json

{
  "csv_content": "month,campaign,revenue\\n...",
  "filename": "marketing.csv",
  "include_insights": true
}
        </pre>
    </div>
</body>
</html>
            """)

templates = Jinja2Templates(directory=str(templates_dir))

# Initialize the MCP client
mcp_client = None

async def start_mcp_client():
    """Start the MCP client"""
    global mcp_client
    if HAS_MCP:
        try:
            # Start the MCP server in a subprocess
            mcp_server_path = Path(__file__).parent / "dashboard_mcp_server.py"
            if not mcp_server_path.exists():
                logger.error(f"MCP server not found at {mcp_server_path}")
                return False
            
            # Make sure it's executable
            os.chmod(mcp_server_path, 0o755)
            
            # Start the MCP client connected to the server
            mcp_client = await stdio_client(f"python {mcp_server_path}")
            logger.info("MCP client started and connected to server")
            return True
        except Exception as e:
            logger.error(f"Failed to start MCP client: {e}")
            return False
    else:
        logger.warning("MCP client library not available, using direct function calls")
        return False

# Define routes
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    """Serve the index page"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    chart_type: str = Form("auto"),
    title: str = Form("Data Analysis Dashboard"),
    marketing: str = Form(None)
):
    """Handle file uploads from the web form"""
    try:
        # Read the file content
        content = await file.read()
        content_str = content.decode("utf-8")
        
        # Determine the filename
        filename = file.filename
        
        # Generate a unique output filename
        output_filename = f"{Path(filename).stem}_{chart_type}_dashboard.html"
        output_path = output_dir / output_filename
        
        # Decide which dashboard to generate
        if marketing:
            # Generate a marketing dashboard
            html_content = await generate_marketing_dashboard_http(
                content_str, filename
            )
            output_filename = f"{Path(filename).stem}_marketing_dashboard.html"
        else:
            # Generate a regular dashboard
            html_content = await generate_dashboard_http(
                content_str, filename, chart_type, title
            )
        
        # Save the HTML content
        output_path = output_dir / output_filename
        with open(output_path, "w") as f:
            f.write(html_content)
        
        # Return a redirect to the generated dashboard
        output_url = f"/output/{output_filename}"
        return JSONResponse({
            "status": "success",
            "message": "Dashboard generated successfully",
            "dashboard_url": output_url,
            "html_length": len(html_content)
        })
        
    except Exception as e:
        logger.error(f"Error processing upload: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate")
async def generate_dashboard_api(request: DashboardRequest):
    """API endpoint for generating dashboards"""
    try:
        html_content = await generate_dashboard_http(
            request.csv_content,
            request.filename,
            request.chart_type,
            request.title
        )
        
        # Save the HTML content
        output_filename = f"{Path(request.filename).stem}_{request.chart_type}_dashboard.html"
        output_path = output_dir / output_filename
        with open(output_path, "w") as f:
            f.write(html_content)
        
        # Return the result
        output_url = f"/output/{output_filename}"
        return {
            "status": "success",
            "message": "Dashboard generated successfully",
            "dashboard_url": output_url,
            "html_length": len(html_content)
        }
    except Exception as e:
        logger.error(f"Error in generate_dashboard_api: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate/marketing")
async def generate_marketing_dashboard_api(request: MarketingDashboardRequest):
    """API endpoint for generating marketing dashboards"""
    try:
        html_content = await generate_marketing_dashboard_http(
            request.csv_content,
            request.filename,
            request.include_insights
        )
        
        # Save the HTML content
        output_filename = f"{Path(request.filename).stem}_marketing_dashboard.html"
        output_path = output_dir / output_filename
        with open(output_path, "w") as f:
            f.write(html_content)
        
        # Return the result
        output_url = f"/output/{output_filename}"
        return {
            "status": "success",
            "message": "Marketing dashboard generated successfully",
            "dashboard_url": output_url,
            "html_length": len(html_content)
        }
    except Exception as e:
        logger.error(f"Error in generate_marketing_dashboard_api: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

async def generate_dashboard_http(
    csv_content: str,
    filename: str,
    chart_type: str = "auto",
    title: str = "Data Analysis Dashboard"
) -> str:
    """Generate a dashboard from CSV content"""
    global mcp_client
    
    # Process the request
    if HAS_MCP and mcp_client:
        # Use the MCP client to call the server
        try:
            # Prepare the request
            request = {
                "csv_content": csv_content,
                "filename": filename,
                "chart_type": chart_type,
                "title": title
            }
            
            # Call the MCP server
            response = await mcp_client.use_tool("generate_dashboard", request)
            return response.content
            
        except Exception as e:
            logger.error(f"Error calling MCP server: {str(e)}", exc_info=True)
            # Fall back to direct function call
            logger.info("Falling back to direct function call")
    
    # Direct function call (if MCP is not available or failed)
    try:
        # Create a temporary file for the CSV content
        with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as tmp_file:
            tmp_file.write(csv_content)
            tmp_path = tmp_file.name
        
        # Generate the dashboard HTML
        html_content = generate_plotly_dashboard_string(data_path=tmp_path)
        
        # Clean up the temporary file
        os.unlink(tmp_path)
        
        return html_content
        
    except Exception as e:
        logger.error(f"Error generating dashboard directly: {str(e)}", exc_info=True)
        raise

async def generate_marketing_dashboard_http(
    csv_content: str,
    filename: str,
    include_insights: bool = True
) -> str:
    """Generate a marketing dashboard from CSV content"""
    global mcp_client
    
    # Process the request
    if HAS_MCP and mcp_client:
        # Use the MCP client to call the server
        try:
            # Prepare the request
            request = {
                "csv_content": csv_content,
                "filename": filename,
                "include_insights": include_insights
            }
            
            # Call the MCP server
            response = await mcp_client.use_tool("generate_marketing_dashboard", request)
            return response.content
            
        except Exception as e:
            logger.error(f"Error calling MCP server: {str(e)}", exc_info=True)
            # Fall back to direct function call
            logger.info("Falling back to direct function call")
    
    # Direct function call (if MCP is not available or failed)
    try:
        # Create a temporary file for the CSV content
        with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as tmp_file:
            tmp_file.write(csv_content)
            tmp_path = tmp_file.name
        
        # Generate the dashboard HTML
        html_content = generate_plotly_dashboard_string(data_path=tmp_path)
        
        # Clean up the temporary file
        os.unlink(tmp_path)
        
        return html_content
        
    except Exception as e:
        logger.error(f"Error generating marketing dashboard directly: {str(e)}", exc_info=True)
        raise

@app.on_event("startup")
async def startup_event():
    """Initialize the MCP client when the server starts"""
    await start_mcp_client()

def main():
    """Start the HTTP server"""
    # Check if FastAPI is installed
    if not HAS_FASTAPI:
        print("FastAPI not installed. Please install it with: pip install fastapi uvicorn jinja2")
        sys.exit(1)
    
    # Start the server
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

if __name__ == "__main__":
    main()
