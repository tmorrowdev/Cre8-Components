#!/usr/bin/env python3
"""
Campaign Revenue Chart Generator
This script creates a bar chart showing Campaign Name vs Revenue from the Bookexcel.csv file
and opens the visualization in a web browser.
"""

import os
import pandas as pd
import json
import webbrowser
from pathlib import Path
import tempfile
import base64

# Import functions from the MCP data viz tool
try:
    from mcp_data_viz_tool import MCPDataVisualizationAgent, ChartType, ChartOptions, ChartData
except ImportError:
    print("Could not import from mcp_data_viz_tool. Make sure you're running this from the src directory.")
    exit(1)

def main():
    # Set up paths
    project_dir = Path(__file__).parent.parent
    data_dir = project_dir / "data"
    output_dir = project_dir / "output"
    
    # Ensure output directory exists
    output_dir.mkdir(exist_ok=True)
    
    # Load the CSV file
    csv_path = data_dir / "Bookexcel.csv"
    if not csv_path.exists():
        print(f"Error: CSV file not found at {csv_path}")
        return
    
    print(f"Loading data from {csv_path}")
    df = pd.read_csv(csv_path)
    
    # Group by campaign and sum Revenue
    # We'll handle duplicate campaign names by grouping them
    campaign_revenue = df.groupby('campaign')['Revenue'].sum().reset_index()
    
    # Sort by revenue in descending order
    campaign_revenue = campaign_revenue.sort_values('Revenue', ascending=False)
    
    # Create visualization agent
    agent = MCPDataVisualizationAgent()
    
    # Prepare chart data
    chart_data = ChartData(
        x=campaign_revenue['campaign'].tolist(),
        y=campaign_revenue['Revenue'].tolist(),
        name="Campaign Revenue",
        color="#1f77b4"  # Blue color
    )
    
    # Configure chart options
    chart_options = ChartOptions(
        title="Campaign Revenue Comparison",
        xTitle="Campaign Name",
        yTitle="Revenue (USD)",
        width=1000,
        height=600,
        showLegend=True
    )
    
    # Generate HTML for the chart
    html = generate_bar_chart_html(chart_data, chart_options)
    
    # Save HTML to a temporary file and open in browser
    html_path = output_dir / "campaign_revenue_chart.html"
    with open(html_path, "w") as f:
        f.write(html)
    
    print(f"Chart saved to {html_path}")
    
    # Open in browser
    webbrowser.open(f"file://{html_path.absolute()}")
    print(f"Opened chart in browser")

def generate_bar_chart_html(chart_data, chart_options):
    """Generate HTML for a bar chart using Plotly"""
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    </head>
    <body>
        <div id="chart" style="width: {width}px; height: {height}px;"></div>
        <script>
            const data = [
                {{
                    x: {x_data},
                    y: {y_data},
                    type: 'bar',
                    name: '{series_name}',
                    marker: {{
                        color: '{color}'
                    }}
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
                margin: {{
                    b: 150
                }},
                showlegend: {show_legend}
            }};
            
            Plotly.newPlot('chart', data, layout, {{responsive: true}});
        </script>
    </body>
    </html>
    """
    
    # Format data for JavaScript
    x_data = json.dumps(chart_data.x)
    y_data = json.dumps(chart_data.y)
    
    # Fill in template
    html = html_template.format(
        title=chart_options.title,
        width=chart_options.width,
        height=chart_options.height,
        x_data=x_data,
        y_data=y_data,
        series_name=chart_data.name,
        color=chart_data.color or "#1f77b4",
        x_title=chart_options.xTitle,
        y_title=chart_options.yTitle,
        show_legend=str(chart_options.showLegend).lower()
    )
    
    return html

if __name__ == "__main__":
    main()
