#!/usr/bin/env python3
"""
Data-Viz-MCP Bar Chart Generator
This script uses the mcp_data_viz_tool to create a bar chart for campaign vs Revenue
and automatically opens it in the browser.
"""

import os
import sys
import pandas as pd
import json
import webbrowser
from pathlib import Path
import base64
import tempfile

# Find the script's directory and add it to path if needed
script_dir = Path(__file__).parent
project_dir = script_dir.parent

# Add src directory to path
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

try:
    from mcp_data_viz_tool import MCPDataVisualizationAgent
except ImportError:
    print("Error importing MCPDataVisualizationAgent. Make sure you're running this from the src directory.")
    sys.exit(1)

def main():
    # Paths
    data_dir = project_dir / "data"
    output_dir = project_dir / "output"
    csv_path = data_dir / "Bookexcel.csv"
    
    # Ensure output directory exists
    output_dir.mkdir(exist_ok=True)
    
    print(f"Reading data from: {csv_path}")
    
    # Read the CSV data
    if not csv_path.exists():
        print(f"Error: File not found: {csv_path}")
        return
    
    # Read the file content
    with open(csv_path, 'r') as f:
        file_content = f.read()
    
    # Create visualization agent
    agent = MCPDataVisualizationAgent()
    
    # Create a custom query for what we want
    user_query = "Create a bar chart showing Revenue by Campaign Name, sorted by Revenue in descending order"
    
    try:
        # Analyze the data using the agent
        analysis = agent.analyze_data(
            file_content=file_content,
            filename="Bookexcel.csv",
            user_query=user_query,
            max_recommendations=1
        )
        
        # Get the HTML component
        html_component = analysis.html_component
        
        # Write to file
        output_path = output_dir / "campaign_revenue_bar_chart.html"
        with open(output_path, 'w') as f:
            f.write(html_component)
        
        print(f"Chart generated at: {output_path}")
        
        # Open the chart in a browser
        webbrowser.open(f"file://{output_path.absolute()}")
        print("Opened chart in browser")
        
    except Exception as e:
        print(f"Error generating visualization: {e}")
        
        # Fallback: Create a simple visualization directly
        print("Using fallback visualization method...")
        create_fallback_visualization(csv_path, output_dir)

def create_fallback_visualization(csv_path, output_dir):
    """Create a simple bar chart visualization if the agent fails"""
    try:
        # Read the CSV
        df = pd.read_csv(csv_path)
        
        # Group by campaign and sum Revenue
        grouped_data = df.groupby('campaign')['Revenue'].sum().sort_values(ascending=False).reset_index()
        
        # Create a simple HTML
        html = create_simple_bar_chart_html(
            x_values=grouped_data['campaign'].tolist(),
            y_values=grouped_data['Revenue'].tolist(),
            title="Campaign Revenue Comparison",
            x_title="Campaign Name",
            y_title="Revenue (USD)"
        )
        
        # Save to file
        output_path = output_dir / "campaign_revenue_simple_chart.html"
        with open(output_path, 'w') as f:
            f.write(html)
        
        # Open in browser
        webbrowser.open(f"file://{output_path.absolute()}")
        print(f"Fallback chart opened in browser: {output_path}")
        
    except Exception as e:
        print(f"Fallback visualization also failed: {e}")

def create_simple_bar_chart_html(x_values, y_values, title, x_title, y_title):
    """Create a simple bar chart using Plotly"""
    
    # Convert to JSON for embedding in HTML
    x_json = json.dumps(x_values)
    y_json = json.dumps(y_values)
    
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
        <script type="module" src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }}
            .container {{ max-width: 1200px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
            h1 {{ color: #333; text-align: center; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>{title}</h1>
            <div id="chart" style="width: 100%; height: 600px;"></div>
        </div>
        
         <script type="module">
                    import "https://cdn.plot.ly/plotly-3.0.0.min.js"
            const data = [
                {{
                    x: {x_data},
                    y: {y_data},
                    type: 'bar',
                    marker: {{ color: '#1f77b4' }}
                }}
            ];
            
            const layout = {{
                title: '{title}',
                xaxis: {{
                    title: '{x_title}',
                    tickangle: -45
                }},
                yaxis: {{
                    title: '{y_title}'
                }},
                margin: {{ b: 150 }}
            }};
            
            Plotly.newPlot('chart', data, layout, {{responsive: true}});
        </script>
    </body>
    </html>
    """
    
    html = html_template.format(
        title=title,
        x_data=x_json,
        y_data=y_json,
        x_title=x_title,
        y_title=y_title
    )
    
    return html

if __name__ == "__main__":
    main()
