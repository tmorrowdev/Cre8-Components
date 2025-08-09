#!/usr/bin/env python3
"""
Revenue Bar Chart Generator
Creates a bar chart showing revenue by campaign name and opens it in a browser
"""

import pandas as pd
import plotly.express as px
import os
import webbrowser
from pathlib import Path

def main():
    # Set paths
    data_path = Path('/Users/tylersmbp/Documents/Bookexcel.csv')
    project_dir = Path(__file__).parent.parent
    output_dir = project_dir / 'output'
    output_file = output_dir / 'campaign_revenue_chart.html'
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Reading data from {data_path}")
    
    # Read the CSV file
    df = pd.read_csv(data_path)
    
    # Group by campaign and sum Revenue
    campaign_revenue = df.groupby('campaign')['Revenue'].sum().reset_index()
    
    # Sort by Revenue in descending order
    campaign_revenue = campaign_revenue.sort_values('Revenue', ascending=False)
    
    print(f"Found {len(campaign_revenue)} unique campaigns")
    
    # Create a bar chart using Plotly Express
    fig = px.bar(
        campaign_revenue,
        x='campaign',
        y='Revenue',
        title='Revenue by Campaign Name',
        labels={'campaign': 'Campaign Name', 'Revenue': 'Revenue (USD)'},
        color='Revenue',
        color_continuous_scale='blues',
    )
    
    # Update layout for better readability
    fig.update_layout(
        xaxis_tickangle=-45,
        height=700,
        margin=dict(b=150),
        coloraxis_showscale=False
    )
    
    # Save the chart as an HTML file
    fig.write_html(output_file)
    print(f"Chart saved to {output_file}")
    
    # Open the chart in the default web browser
    chart_url = f"file://{output_file}"
    print(f"Opening chart in browser: {chart_url}")
    webbrowser.open(chart_url)

if __name__ == "__main__":
    main()
