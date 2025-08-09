#!/usr/bin/env python3
"""
Minimal Campaign Revenue Bar Chart Generator
This script creates an HTML file with a bar chart and opens it in a browser.
"""

import os
import csv
import json
import webbrowser
from pathlib import Path
from collections import defaultdict

def main():
    # Set paths
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    data_dir = project_dir / "data"
    output_dir = project_dir / "output"
    
    # Ensure output directory exists
    output_dir.mkdir(exist_ok=True)
    
    csv_path = data_dir / "Bookexcel.csv"
    
    print(f"Reading data from: {csv_path}")
    
    # Parse the CSV data manually
    campaign_revenues = defaultdict(float)
    
    try:
        with open(csv_path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                campaign = row['campaign']
                try:
                    revenue = float(row['Revenue'])
                    campaign_revenues[campaign] += revenue
                except (ValueError, KeyError):
                    print(f"Warning: Could not parse revenue for {campaign}")
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return
    
    # Sort campaigns by revenue
    sorted_campaigns = sorted(campaign_revenues.items(), key=lambda x: x[1], reverse=True)
    
    # Get top campaigns
    campaigns = [item[0] for item in sorted_campaigns]
    revenue_values = [item[1] for item in sorted_campaigns]
    
    # Generate HTML
    html = generate_bar_chart_html(campaigns, revenue_values)
    
    # Save to file
    output_path = output_dir / "minimal_campaign_revenue_chart.html"
    with open(output_path, 'w') as f:
        f.write(html)
    
    print(f"Chart saved to: {output_path}")
    
    # Open in browser
    webbrowser.open(f"file://{output_path.absolute()}")
    print(f"Chart opened in browser")

def generate_bar_chart_html(campaigns, revenue_values):
    """Generate a bar chart HTML using Plotly"""
    
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Campaign Revenue Analysis</title>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    </head>
    <body>
        <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
            <h1 style="text-align: center;">Campaign Revenue Analysis</h1>
            <div id="chart" style="width: 100%; height: 600px;"></div>
        </div>
        
        <script>
            const campaignNames = {campaigns};
            const revenueValues = {revenue_values};
            
            const data = [{
                x: campaignNames,
                y: revenueValues,
                type: 'bar',
                marker: {
                    color: '#1f77b4'
                }
            }];
            
            const layout = {
                title: 'Campaign Revenue Comparison',
                xaxis: {
                    title: 'Campaign Name',
                    tickangle: -45
                },
                yaxis: {
                    title: 'Revenue (USD)'
                },
                margin: {
                    b: 150
                }
            };
            
            Plotly.newPlot('chart', data, layout, {responsive: true});
        </script>
    </body>
    </html>
    """
    
    html = html_template.format(
        campaigns=json.dumps(campaigns),
        revenue_values=json.dumps(revenue_values)
    )
    
    return html

if __name__ == "__main__":
    main()
