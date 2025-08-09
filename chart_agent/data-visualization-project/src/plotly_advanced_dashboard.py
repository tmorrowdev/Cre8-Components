#!/usr/bin/env python3
"""
Advanced Plotly Visualization for Marketing Campaign Analysis
Creates multiple interactive charts to analyze campaign performance
"""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import plotly.subplots as sp
import webbrowser
from pathlib import Path
import os

def main():
    # Set paths
    data_path = Path('/Users/tylersmbp/Documents/Bookexcel.csv')
    project_dir = Path(__file__).parent.parent
    output_dir = project_dir / 'output'
    output_file = output_dir / 'campaign_analysis_dashboard.html'
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Reading data from {data_path}")
    
    # Read the CSV file
    df = pd.read_csv(data_path)
    
    # Create a dashboard with multiple charts
    fig = create_dashboard(df)
    
    # Save to HTML file
    fig.write_html(output_file, include_plotlyjs=True, full_html=True)
    print(f"Dashboard saved to {output_file}")
    
    # Open in browser
    webbrowser.open(f"file://{output_file}")
    print(f"Dashboard opened in browser")

def create_dashboard(df):
    """Create a dashboard with multiple charts"""
    
    # Create subplot figure with 2x2 grid
    fig = sp.make_subplots(
        rows=2, 
        cols=2,
        subplot_titles=(
            "Revenue by Campaign",
            "Campaign Type Performance",
            "Monthly Revenue Trend",
            "Channel Comparison"
        ),
        specs=[
            [{"type": "bar"}, {"type": "pie"}],
            [{"type": "scatter"}, {"type": "bar"}]
        ],
        vertical_spacing=0.1,
        horizontal_spacing=0.05
    )
    
    # Chart 1: Revenue by Campaign (Bar Chart) - Top 10
    campaign_revenue = df.groupby('campaign')['Revenue'].sum().reset_index()
    top_campaigns = campaign_revenue.sort_values('Revenue', ascending=False).head(10)
    
    fig.add_trace(
        go.Bar(
            x=top_campaigns['campaign'],
            y=top_campaigns['Revenue'],
            marker_color=px.colors.sequential.Blues[-4],
            name="Revenue"
        ),
        row=1, col=1
    )
    
    # Chart 2: Campaign Type Performance (Pie Chart)
    campaign_type_revenue = df.groupby('Campaign_Type')['Revenue'].sum().reset_index()
    
    fig.add_trace(
        go.Pie(
            labels=campaign_type_revenue['Campaign_Type'],
            values=campaign_type_revenue['Revenue'],
            hole=0.4,
            marker=dict(colors=px.colors.qualitative.Pastel)
        ),
        row=1, col=2
    )
    
    # Chart 3: Monthly Revenue Trend (Line Chart)
    monthly_revenue = df.groupby('Month')['Revenue'].sum().reset_index()
    
    # Sort months chronologically
    month_order = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    monthly_revenue['Month'] = pd.Categorical(monthly_revenue['Month'], categories=month_order, ordered=True)
    monthly_revenue = monthly_revenue.sort_values('Month')
    
    fig.add_trace(
        go.Scatter(
            x=monthly_revenue['Month'],
            y=monthly_revenue['Revenue'],
            mode='lines+markers',
            line=dict(color='royalblue', width=3),
            marker=dict(size=8),
            name="Monthly Revenue"
        ),
        row=2, col=1
    )
    
    # Chart 4: Channel Comparison (Horizontal Bar)
    channel_metrics = df.groupby('Channel').agg({
        'Revenue': 'sum',
        'Conversions': 'sum'
    }).reset_index()
    channel_metrics = channel_metrics.sort_values('Revenue', ascending=True)
    
    fig.add_trace(
        go.Bar(
            y=channel_metrics['Channel'],
            x=channel_metrics['Revenue'],
            orientation='h',
            marker_color='lightseagreen',
            name="Revenue by Channel"
        ),
        row=2, col=2
    )
    
    # Update layout and formatting
    fig.update_layout(
        title_text="Marketing Campaign Performance Dashboard",
        title_font_size=24,
        height=900,
        width=1200,
        showlegend=False,
        template="plotly_white"
    )
    
    # Format axes
    fig.update_xaxes(title_text="Campaign Name", row=1, col=1, tickangle=-45)
    fig.update_yaxes(title_text="Revenue (USD)", row=1, col=1)
    
    fig.update_xaxes(title_text="Month", row=2, col=1)
    fig.update_yaxes(title_text="Revenue (USD)", row=2, col=1)
    
    fig.update_xaxes(title_text="Revenue (USD)", row=2, col=2)
    fig.update_yaxes(title_text="Channel", row=2, col=2)
    
    return fig

def create_channel_roas_chart(df):
    """Create a specialized chart for ROAS by channel"""
    
    # Calculate average ROAS by channel
    channel_roas = df.groupby('Channel')['ROAS'].mean().reset_index()
    channel_roas = channel_roas.sort_values('ROAS', ascending=False)
    
    # Create the figure
    fig = px.bar(
        channel_roas, 
        x='Channel', 
        y='ROAS',
        title='Return on Ad Spend (ROAS) by Channel',
        color='ROAS',
        color_continuous_scale='Viridis',
        height=500
    )
    
    fig.update_layout(
        xaxis_title="Channel",
        yaxis_title="Average ROAS",
        coloraxis_showscale=True,
        template="plotly_white"
    )
    
    return fig

if __name__ == "__main__":
    main()
