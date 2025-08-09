#!/usr/bin/env python3
"""
Enhanced Dashboard MCP Client

An advanced client for the Enhanced Dashboard Generator MCP Server. This script provides:
1. Testing and visualization of the dashboard recommendation tool
2. Dashboard generation with customized parameters
3. Deployment and management of the dashboard web server
4. A simple command-line interface for interacting with the MCP server
"""

import os
import sys
import json
import base64
import asyncio
import webbrowser
import argparse
from pathlib import Path
from typing import Dict, Any, Optional, List

# Try to import the MCP client library
try:
    from mcp.client import Client
    from mcp.client.stdio import stdio_client
    # Force simulation mode due to MCP compatibility issues
    HAS_MCP = False
    print("Running in simulated mode for better compatibility.")
except ImportError:
    print("Warning: MCP client library not found. Running in simulated mode.")
    HAS_MCP = False

# Import internal modules if running in simulation mode
def import_internal_modules():
    """Import internal modules for simulation mode"""
    global generate_plotly_dashboard_string, DashboardRecommender
    try:
        from mcp_plotly_integration import generate_plotly_dashboard_string
        from dashboard_recommender import DashboardRecommender
        return True
    except ImportError as e:
        print(f"Error importing internal modules: {str(e)}")
        return False

class EnhancedDashboardClient:
    """Enhanced Client for the Dashboard Generator MCP Server"""
    
    def __init__(self, server_command: Optional[str] = None):
        """Initialize the client"""
        self.server_command = server_command or "python enhanced_dashboard_mcp_server_compatible.py"
        self.client = None
        self.output_dir = Path(__file__).parent.parent / "output"
        self.simulation_mode = not HAS_MCP
        
        # Ensure output directory exists
        os.makedirs(self.output_dir, exist_ok=True)
    
    async def start(self) -> None:
        """Start the client and connect to the server"""
        if HAS_MCP:
            try:
                self.client = await stdio_client(self.server_command)
                print("Connected to Enhanced MCP server")
            except Exception as e:
                print(f"Error connecting to MCP server: {str(e)}")
                print("Make sure the server is properly installed and the command is correct.")
                print(f"Server command: {self.server_command}")
                sys.exit(1)
        else:
            print(f"Simulating connection to Enhanced MCP server with command: {self.server_command}")
            if not import_internal_modules():
                print("Failed to import required modules for simulation mode.")
                sys.exit(1)
    
    async def close(self) -> None:
        """Close the client connection"""
        if self.client:
            await self.client.close()
            print("Disconnected from Enhanced MCP server")
    
    async def get_tools(self) -> list:
        """Get the available tools from the server"""
        if HAS_MCP and self.client:
            try:
                tools = await self.client.list_tools()
                return tools
            except Exception as e:
                print(f"Error getting tools: {str(e)}")
                return []
        else:
            # Return simulated tools
            return [
                {"name": "generate_dashboard", "description": "Generate dashboard from CSV data"},
                {"name": "generate_marketing_dashboard", "description": "Generate marketing dashboard"},
                {"name": "recommend_dashboard", "description": "Recommend visualizations based on data analysis"},
                {"name": "deploy_dashboard_server", "description": "Deploy a web server for dashboards"},
                {"name": "list_deployed_dashboards", "description": "List all deployed dashboards"}
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
            try:
                response = await self.client.use_tool("generate_dashboard", request)
                html_content = response.content
            except Exception as e:
                print(f"Error calling MCP server: {str(e)}")
                return None
        else:
            # In simulation mode, use the local function directly
            print("Simulating MCP server call...")
            
            # Import the dashboard generator and generate HTML
            try:
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
            try:
                response = await self.client.use_tool("generate_marketing_dashboard", request)
                html_content = response.content
            except Exception as e:
                print(f"Error calling MCP server: {str(e)}")
                return None
        else:
            # In simulation mode, use the local function directly
            print("Simulating MCP server call...")
            
            # Import the dashboard generator and generate HTML
            try:
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
    
    async def recommend_dashboard(self, csv_path: str, generate_preview: bool = False) -> Dict:
        """Analyze data and recommend dashboard visualizations"""
        # Read the CSV file
        csv_path = Path(csv_path)
        with open(csv_path, 'r') as f:
            csv_content = f.read()
        
        # Prepare the request
        filename = csv_path.name
        
        request = {
            "csv_content": csv_content,
            "filename": filename,
            "generate_preview": generate_preview
        }
        
        print(f"Analyzing {filename} for dashboard recommendations")
        
        if HAS_MCP and self.client:
            # Call the MCP server
            try:
                response = await self.client.use_tool("recommend_dashboard", request)
                recommendations = json.loads(response.content)
            except Exception as e:
                print(f"Error calling MCP server: {str(e)}")
                return None
        else:
            # In simulation mode, use the local function directly
            print("Simulating MCP server call...")
            
            try:
                import pandas as pd
                df = pd.read_csv(csv_path)
                recommender = DashboardRecommender()
                recommendations = recommender.analyze_and_recommend(df)
                
                # Generate preview if requested
                if generate_preview:
                    preview_html = generate_plotly_dashboard_string(dataframe=df)
                    recommendations["preview_html"] = preview_html
                    
                    # Save preview HTML
                    preview_path = self.output_dir / f"{filename.split('.')[0]}_recommended_dashboard.html"
                    with open(preview_path, 'w') as f:
                        f.write(preview_html)
                        
                    recommendations["preview_url"] = f"file://{preview_path.absolute()}"
                    
                    # Open in browser
                    webbrowser.open(f"file://{preview_path.absolute()}")
                
                print("Recommendations generated in simulation mode")
            except Exception as e:
                print(f"Error generating recommendations in simulation mode: {str(e)}")
                recommendations = {"error": str(e)}
        
        # Save the recommendations to a file
        output_path = self.output_dir / f"{filename.split('.')[0]}_recommendations.json"
        with open(output_path, 'w') as f:
            json.dump(recommendations, f, indent=2)
        
        print(f"Recommendations saved to {output_path}")
        
        # Display the recommendations
        print("\nRecommended Dashboard Structure:")
        print(f"Title: {recommendations.get('recommendations', {}).get('dashboard_title', 'Unknown')}")
        print(f"Structure: {recommendations.get('recommendations', {}).get('dashboard_structure', 'Unknown')}")
        
        charts = recommendations.get('recommendations', {}).get('charts', [])
        if charts:
            print("\nRecommended Charts:")
            for i, chart in enumerate(charts):
                print(f"{i+1}. {chart.get('title', 'Untitled')} ({chart.get('chart_type', 'unknown')})")
        
        insights = recommendations.get('insights', [])
        if insights:
            print("\nData Insights:")
            for insight in insights:
                severity = insight.get('severity', 'info')
                severity_marker = '!' if severity == 'warning' else 'i'
                print(f"[{severity_marker}] {insight.get('message', '')}")
        
        if generate_preview and recommendations.get("preview_url"):
            print(f"\nPreview dashboard available at: {recommendations['preview_url']}")
        
        return recommendations
    
    async def deploy_dashboard_server(self, port: int = 8000, open_browser: bool = True) -> Dict:
        """Deploy a web server to serve the generated dashboards"""
        request = {
            "port": port,
            "open_browser": open_browser
        }
        
        print(f"Deploying dashboard server on port {port}...")
        
        if HAS_MCP and self.client:
            # Call the MCP server
            try:
                response = await self.client.use_tool("deploy_dashboard_server", request)
                result = json.loads(response.content)
            except Exception as e:
                print(f"Error calling MCP server: {str(e)}")
                return None
        else:
            # In simulation mode, just return a fake result
            print("Simulating dashboard server deployment (not actually starting a server)")
            result = {
                "status": "simulated",
                "port": port,
                "url": f"http://localhost:{port}",
                "message": "This is a simulation. No server is actually running."
            }
        
        # Display the result
        if result.get("status") == "success" or result.get("status") == "already_running":
            print(f"Dashboard server is running at {result.get('url')}")
        else:
            print(f"Failed to deploy dashboard server: {result.get('message')}")
        
        return result
    
    async def list_deployed_dashboards(self) -> Dict:
        """List all deployed dashboards"""
        if HAS_MCP and self.client:
            # Call the MCP server
            try:
                response = await self.client.use_tool("list_deployed_dashboards", {})
                result = json.loads(response.content)
            except Exception as e:
                print(f"Error calling MCP server: {str(e)}")
                return None
        else:
            # In simulation mode, just return a fake result
            result = {
                "status": "simulated",
                "message": "This is a simulation. No actual server information available.",
                "dashboards": []
            }
        
        # Display the result
        if result.get("status") == "success":
            dashboards = result.get("dashboards", [])
            if dashboards:
                print(f"\nDeployed Dashboards at {result.get('url')}:")
                for i, dashboard in enumerate(dashboards):
                    print(f"{i+1}. {dashboard.get('name')} - {dashboard.get('url')}")
                    print(f"   Created: {dashboard.get('timestamp')}")
            else:
                print("No dashboards have been deployed yet.")
        else:
            print(f"Dashboard server status: {result.get('status')}")
            print(result.get('message', ''))
        
        return result

async def interactive_client():
    """Run the client in interactive mode"""
    parser = argparse.ArgumentParser(description="Enhanced Dashboard MCP Client")
    parser.add_argument("--server", help="Custom command to start the MCP server", default=None)
    parser.add_argument("--csv", help="Path to CSV file to analyze", default=None)
    parser.add_argument("--deploy", help="Deploy dashboard server", action="store_true")
    parser.add_argument("--port", help="Port for dashboard server", type=int, default=8000)
    args = parser.parse_args()
    
    # Create the client
    client = EnhancedDashboardClient(server_command=args.server)
    
    try:
        # Start the client
        await client.start()
        
        # Get the available tools
        tools = await client.get_tools()
        print("Available tools:")
        for i, tool in enumerate(tools):
            print(f"{i+1}. {tool['name']}: {tool.get('description', '')}")
        
        # Process command line arguments
        if args.deploy:
            await client.deploy_dashboard_server(port=args.port)
        
        if args.csv:
            # Define the CSV file path
            csv_path = args.csv
            
            # Ask what to do with the CSV
            print("\nWhat would you like to do with the CSV file?")
            print("1. Generate standard dashboard")
            print("2. Generate marketing-focused dashboard")
            print("3. Get dashboard recommendations")
            print("4. Get recommendations and preview dashboard")
            
            choice = input("Enter your choice (1-4): ")
            
            if choice == "1":
                await client.generate_dashboard(csv_path)
            elif choice == "2":
                await client.generate_marketing_dashboard(csv_path)
            elif choice == "3":
                await client.recommend_dashboard(csv_path, generate_preview=False)
            elif choice == "4":
                await client.recommend_dashboard(csv_path, generate_preview=True)
            else:
                print("Invalid choice.")
        else:
            # Interactive menu
            while True:
                print("\nEnhanced Dashboard Client Menu:")
                print("1. Generate dashboard from CSV")
                print("2. Generate marketing dashboard from CSV")
                print("3. Get dashboard recommendations from CSV")
                print("4. Deploy dashboard server")
                print("5. List deployed dashboards")
                print("6. Exit")
                
                choice = input("Enter your choice (1-6): ")
                
                if choice == "1":
                    csv_path = input("Enter CSV file path: ")
                    chart_type = input("Enter chart type (auto, bar, line, pie, scatter) [auto]: ") or "auto"
                    title = input("Enter dashboard title [auto]: ") or None
                    await client.generate_dashboard(csv_path, chart_type, title)
                    
                elif choice == "2":
                    csv_path = input("Enter CSV file path: ")
                    include_insights = input("Include AI-generated insights? (y/n) [y]: ").lower() != "n"
                    await client.generate_marketing_dashboard(csv_path, include_insights)
                    
                elif choice == "3":
                    csv_path = input("Enter CSV file path: ")
                    generate_preview = input("Generate preview dashboard? (y/n) [n]: ").lower() == "y"
                    await client.recommend_dashboard(csv_path, generate_preview)
                    
                elif choice == "4":
                    port = input("Enter port number [8000]: ") or "8000"
                    open_browser = input("Open in browser? (y/n) [y]: ").lower() != "n"
                    await client.deploy_dashboard_server(int(port), open_browser)
                    
                elif choice == "5":
                    await client.list_deployed_dashboards()
                    
                elif choice == "6":
                    print("Exiting...")
                    break
                    
                else:
                    print("Invalid choice. Please try again.")
                    
                print("\nPress Enter to continue...")
                input()
                
    finally:
        # Close the client
        await client.close()

if __name__ == "__main__":
    asyncio.run(interactive_client())
