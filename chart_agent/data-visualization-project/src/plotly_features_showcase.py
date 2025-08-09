#!/usr/bin/env python3
"""
Interactive Plotly Features Showcase
Demonstrates advanced Plotly features including animation, interactive controls, and 3D plots
"""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import numpy as np
import webbrowser
from pathlib import Path
import os

def main():
    # Set paths
    data_path = Path('/Users/tylersmbp/Documents/Bookexcel.csv')
    project_dir = Path(__file__).parent.parent
    output_dir = project_dir / 'output'
    output_file = output_dir / 'plotly_features_showcase.html'
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Reading data from {data_path}")
    
    # Read the CSV file
    df = pd.read_csv(data_path)
    
    # Create HTML with multiple showcase visualizations
    create_showcase_html(df, output_file)
    print(f"Showcase saved to {output_file}")
    
    # Open in browser
    webbrowser.open(f"file://{output_file}")
    print(f"Showcase opened in browser")

def create_showcase_html(df, output_file):
    """Create an HTML file with multiple Plotly showcase visualizations"""
    
    # Create different visualizations
    bubble_fig = create_bubble_chart(df)
    heatmap_fig = create_heatmap(df)
    sunburst_fig = create_sunburst(df)
    
    # Generate 3D scatter plot with some artificial Z dimension
    # (since our data is 2D, we'll create a derived dimension)
    scatter3d_fig = create_3d_scatter(df)
    
    # Convert figures to JSON
    bubble_json = bubble_fig.to_json()
    heatmap_json = heatmap_fig.to_json()
    sunburst_json = sunburst_fig.to_json()
    scatter3d_json = scatter3d_fig.to_json()
    
    # Write all figures to HTML
    with open(output_file, 'w') as f:
        f.write(f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Plotly Features Showcase</title>
            <script type="module" src="https://cdn.plot.ly/plotly-latest.min.js"></script>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f5f5f5;
                }}
                .container {{
                    max-width: 1200px;
                    margin: 0 auto;
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }}
                h1 {{
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 30px;
                }}
                h2 {{
                    color: #3498db;
                    margin-top: 40px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                }}
                .chart-container {{
                    margin: 30px 0;
                    height: 600px;
                }}
                p {{
                    color: #666;
                    line-height: 1.5;
                }}
                .feature-description {{
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-left: 4px solid #3498db;
                    margin-bottom: 20px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Plotly Visualization Features Showcase</h1>
                
                <div class="feature-description">
                    <p>This showcase demonstrates various interactive visualization capabilities of Plotly. 
                    Each chart below highlights different features such as interactivity, animations, 
                    3D visualizations, and specialized chart types.</p>
                </div>
                
                <h2>Interactive Bubble Chart: Campaign Performance</h2>
                <p>This bubble chart shows the relationship between clicks, conversions, and revenue. 
                The size of each bubble represents the campaign's budget, and the color indicates the 
                channel. Hover over bubbles for details, and use the animation controls to see changes over time.</p>
                <div class="chart-container" id="bubble-chart"></div>
                
                <h2>Heatmap: Campaign Performance Metrics by Month and Channel</h2>
                <p>This heatmap visualizes performance across months and channels. Darker colors indicate 
                higher values. Hover over cells for specific values.</p>
                <div class="chart-container" id="heatmap"></div>
                
                <h2>Sunburst Chart: Revenue Hierarchy</h2>
                <p>This sunburst chart shows the hierarchical breakdown of revenue by month, campaign type, and channel.
                Click on sections to zoom in and explore the hierarchy.</p>
                <div class="chart-container" id="sunburst"></div>
                
                <h2>3D Scatter Plot: Multi-Dimensional Analysis</h2>
                <p>This 3D scatter plot visualizes the relationship between clicks, conversions, and revenue.
                Use your mouse to rotate and explore the 3D space.</p>
                <div class="chart-container" id="scatter3d"></div>
            </div>
            
            <script>
                // Bubble Chart
                var bubbleDiv = document.getElementById('bubble-chart');
                
                // Heatmap
                var heatmapDiv = document.getElementById('heatmap');
                
                // Sunburst Chart
                var sunburstDiv = document.getElementById('sunburst');
                
                // 3D Scatter Plot
                var scatter3dDiv = document.getElementById('scatter3d');
                
                // Plot bubble chart
                Plotly.newPlot(bubbleDiv, {bubble_json});
                
                // Plot heatmap
                Plotly.newPlot(heatmapDiv, {heatmap_json});
                
                // Plot sunburst
                Plotly.newPlot(sunburstDiv, {sunburst_json});
                
                // Plot 3D scatter
                Plotly.newPlot(scatter3dDiv, {scatter3d_json});
            </script>
        </body>
        </html>
        """)

def create_bubble_chart(df):
    """Create an animated bubble chart"""
    
    # Group by Month, Channel
    grouped = df.groupby(['Month', 'Channel']).agg({
        'Clicks': 'sum',
        'Conversions': 'sum', 
        'Revenue': 'sum',
        'Budget': 'sum'
    }).reset_index()
    
    # Filter out zero values to avoid log errors
    grouped = grouped[grouped['Clicks'] > 0]
    
    # Order months chronologically for animation
    month_order = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    grouped['Month'] = pd.Categorical(grouped['Month'], categories=month_order, ordered=True)
    grouped = grouped.sort_values('Month')
    
    # Create bubble chart with animation
    fig = px.scatter(
        grouped, 
        x='Clicks', 
        y='Conversions',
        size='Budget',
        color='Channel',
        animation_frame='Month',
        size_max=60,
        hover_name='Channel',
        text='Channel',
        log_x=True,
        range_x=[grouped['Clicks'].min()*0.8, grouped['Clicks'].max()*1.2],
        range_y=[grouped['Conversions'].min()*0.8, grouped['Conversions'].max()*1.2],
        labels={
            'Clicks': 'Total Clicks',
            'Conversions': 'Total Conversions',
            'Budget': 'Total Budget',
            'Revenue': 'Total Revenue'
        }
    )
    
    # Add revenue as hover data
    fig.update_traces(
        customdata=grouped['Revenue'],
        hovertemplate='<b>%{text}</b><br>Clicks: %{x}<br>Conversions: %{y}<br>Budget: %{marker.size:$,.0f}<br>Revenue: $%{customdata:,.0f}'
    )
    
    fig.update_layout(
        title='Campaign Performance by Channel (Animated by Month)',
        height=600,
        hovermode='closest',
    )
    
    return fig

def create_heatmap(df):
    """Create a heatmap visualization"""
    
    # Create pivot table for heatmap
    pivot = df.pivot_table(
        index='Channel',
        columns='Month',
        values='ROAS',
        aggfunc='mean'
    )
    
    # Reorder columns (months) chronologically
    month_order = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    pivot = pivot[month_order]
    
    # Create heatmap
    fig = go.Figure(data=go.Heatmap(
        z=pivot.values,
        x=pivot.columns,
        y=pivot.index,
        colorscale='Blues',
        hoverongaps=False,
        hovertemplate='Channel: %{y}<br>Month: %{x}<br>ROAS: %{z:.2f}<extra></extra>'
    ))
    
    fig.update_layout(
        title='ROAS Heatmap by Channel and Month',
        height=600,
        xaxis_title='Month',
        yaxis_title='Channel',
    )
    
    return fig

def create_sunburst(df):
    """Create a sunburst chart for hierarchical data visualization"""
    
    # Prepare data for sunburst
    sunburst_df = df.copy()
    sunburst_df['Value'] = sunburst_df['Revenue']
    
    # Create sunburst chart
    fig = px.sunburst(
        sunburst_df,
        path=['Month', 'Campaign_Type', 'Channel'],
        values='Value',
        color='ROAS',
        color_continuous_scale='RdBu',
        range_color=[0, sunburst_df['ROAS'].max()],
        title='Revenue Breakdown by Month, Campaign Type, and Channel'
    )
    
    fig.update_layout(height=600)
    
    return fig

def create_3d_scatter(df):
    """Create a 3D scatter plot"""
    
    # Group by Campaign Name
    grouped = df.groupby('campaign').agg({
        'Clicks': 'sum',
        'Conversions': 'sum', 
        'Revenue': 'sum',
        'Spend': 'sum',
        'Campaign_Type': 'first'  # Take the first campaign type for each campaign
    }).reset_index()
    
    # Create 3D scatter plot
    fig = go.Figure(data=[go.Scatter3d(
        x=grouped['Clicks'],
        y=grouped['Conversions'],
        z=grouped['Revenue'],
        mode='markers',
        marker=dict(
            size=grouped['Spend'] / 5000,  # Scale down the spend for marker size
            color=grouped['Revenue'],
            colorscale='Viridis',
            opacity=0.8,
            colorbar=dict(title="Revenue"),
            symbol='circle',
            line=dict(
                color='rgb(204, 204, 204)',
                width=1
            )
        ),
        text=grouped['campaign'],
        hovertemplate=
        '<b>%{text}</b><br>' +
        'Clicks: %{x:,}<br>' +
        'Conversions: %{y:,}<br>' +
        'Revenue: $%{z:,.2f}<br>' +
        'Spend: $%{marker.size:.2f}<br>' +
        '<extra></extra>',
    )])
    
    # Update layout
    fig.update_layout(
        title='3D Campaign Performance Analysis',
        scene=dict(
            xaxis_title='Clicks',
            yaxis_title='Conversions',
            zaxis_title='Revenue',
            camera=dict(
                up=dict(x=0, y=0, z=1),
                center=dict(x=0, y=0, z=0),
                eye=dict(x=1.5, y=1.5, z=1.2)
            )
        ),
        height=600,
        margin=dict(l=0, r=0, b=0, t=30)
    )
    
    return fig

if __name__ == "__main__":
    main()
