#!/usr/bin/env python3
"""
Test script to isolate the bubble chart rendering issue
"""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
import json

def test_bubble_chart():
    # Read data
    data_path = Path('/Users/tylersmbp/Documents/Bookexcel.csv')
    df = pd.read_csv(data_path)
    
    # Group by Month, Channel
    grouped = df.groupby(['Month', 'Channel']).agg({
        'Clicks': 'sum',
        'Conversions': 'sum', 
        'Revenue': 'sum',
        'Budget': 'sum'
    }).reset_index()
    
    print("Original data shape:", grouped.shape)
    print("Clicks min/max:", grouped['Clicks'].min(), grouped['Clicks'].max())
    
    # Filter out zero values to avoid log errors
    grouped = grouped[grouped['Clicks'] > 0]
    
    print("After filtering shape:", grouped.shape)
    print("Clicks min/max after filtering:", grouped['Clicks'].min(), grouped['Clicks'].max())
    
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
    
    # Test creating HTML
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Bubble Chart Test</title>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    </head>
    <body>
        <div id="bubble-chart" style="width:100%; height:600px;"></div>
        <script>
            var bubbleDiv = document.getElementById('bubble-chart');
            Plotly.newPlot(bubbleDiv, {fig.to_json()});
        </script>
    </body>
    </html>
    """
    
    # Save test HTML
    output_path = Path('/Users/tylersmbp/Projects/cre8-web-components/chart_agent/data-visualization-project/output/bubble_test.html')
    with open(output_path, 'w') as f:
        f.write(html_content)
    
    print(f"Test HTML saved to: {output_path}")
    print("Figure data summary:")
    print(f"Data traces: {len(fig.data)}")
    
    # Try to get JSON and check for errors
    try:
        json_data = fig.to_json()
        print(f"JSON length: {len(json_data)}")
        print("JSON generation successful")
    except Exception as e:
        print(f"JSON generation error: {e}")
    
    return fig

if __name__ == "__main__":
    test_bubble_chart()