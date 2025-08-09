#!/usr/bin/env python3
"""
Plotly MCP Integration Example
Demonstrates how to use Plotly with the MCP data visualization framework
"""

import sys
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import json
import numpy as np
import webbrowser
from pathlib import Path
import os
import base64

# Custom JSON encoder to handle NumPy types
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

def main():
    # TODO: replace data_path with a reference to the uploaded data file 
    data_path = Path('/Users/tylersmbp/Documents/Bookexcel.csv')
    project_dir = Path(__file__).parent.parent
    output_dir = project_dir / 'output'
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Reading data from {data_path}")
    
    # Read the CSV file
    df = pd.read_csv(data_path)
    
    # Generate HTML with embedded Plotly charts
    html_string = generate_html_dashboard(df)
    
    # In the main function, we'll still create a file for demonstration
    output_file = output_dir / 'mcp_plotly_integration.html'
    with open(output_file, 'w') as f:
        f.write(html_string)
    
    print(f"MCP-Plotly integration example saved to {output_file}")
    
    # Open in browser
    webbrowser.open(f"file://{output_file}")
    print(f"Example opened in browser")
    
    # Return the HTML string for reuse
    return html_string

def generate_plotly_dashboard_string(data_path=None, dataframe=None):
    """
    Generate an HTML dashboard string with Plotly charts
    
    Args:
        data_path (str or Path, optional): Path to CSV file
        dataframe (pandas.DataFrame, optional): Pandas dataframe with campaign data
        
    Returns:
        str: HTML string containing the complete dashboard
        
    Note:
        Either data_path or dataframe must be provided
    """
    if dataframe is not None:
        df = dataframe
    elif data_path is not None:
        df = pd.read_csv(data_path)
    else:
        raise ValueError("Either data_path or dataframe must be provided")
        
    return generate_html_dashboard(df)
        
def generate_html_dashboard(df):
    """Generate an HTML dashboard with Plotly charts (fully dynamic, column-agnostic)"""
    import plotly.express as px
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    import pandas as pd
    import numpy as np

    # Detect column types
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
    date_cols = []
    for col in df.columns:
        try:
            pd.to_datetime(df[col].dropna().head(10), errors='raise')
            date_cols.append(col)
        except Exception:
            continue
    # Remove date columns from categorical
    categorical_cols = [c for c in categorical_cols if c not in date_cols]

    # Start HTML
    html = '<h1>Dashboard</h1>'
    html += f'<p><b>Rows:</b> {len(df)} | <b>Columns:</b> {len(df.columns)}</p>'
    html += '<div>'

    # 1. Top categorical by numeric
    if numeric_cols and categorical_cols:
        cat = categorical_cols[0]
        num = numeric_cols[0]
        top = df.groupby(cat)[num].sum().sort_values(ascending=False).head(10)
        fig = px.bar(x=top.index, y=top.values, labels={'x':cat, 'y':num}, title=f'Top {cat} by {num}')
        html += fig.to_html(full_html=False)

    # 2. Pie chart of categorical distribution
    if numeric_cols and categorical_cols:
        cat = categorical_cols[0]
        num = numeric_cols[0]
        pie = df.groupby(cat)[num].sum()
        fig = px.pie(values=pie.values, names=pie.index, title=f'{num} Distribution by {cat}')
        html += fig.to_html(full_html=False)

    # 3. Correlation scatter
    if len(numeric_cols) >= 2:
        fig = px.scatter(df, x=numeric_cols[0], y=numeric_cols[1], color=categorical_cols[0] if categorical_cols else None, title=f'{numeric_cols[0]} vs {numeric_cols[1]}')
        html += fig.to_html(full_html=False)

    # 4. Time series
    if date_cols and numeric_cols:
        date_col = date_cols[0]
        num = numeric_cols[0]
        df2 = df.copy()
        df2[date_col] = pd.to_datetime(df2[date_col], errors='coerce')
        df2 = df2.dropna(subset=[date_col])
        ts = df2.groupby(df2[date_col].dt.date)[num].sum().reset_index()
        fig = px.line(ts, x=date_col, y=num, title=f'{num} Over Time')
        html += fig.to_html(full_html=False)

    html += '</div>'
    return html

def create_advanced_charts(df):
    """Create advanced chart types for specialized use cases"""
    
    advanced_charts = {}
    
    # 1. Funnel Chart - Conversion Funnel
    if all(col in df.columns for col in ['Impressions', 'Clicks', 'Conversions']):
        funnel_data = {
            'Stage': ['Impressions', 'Clicks', 'Conversions'],
            'Values': [
                df['Impressions'].sum(),
                df['Clicks'].sum(), 
                df['Conversions'].sum()
            ]
        }
        
        funnel_fig = go.Figure(go.Funnel(
            y = funnel_data['Stage'],
            x = funnel_data['Values'],
            textinfo = "value+percent initial",
            marker_color = ['lightblue', 'orange', 'lightgreen']
        ))
        
        funnel_fig.update_layout(
            title='Marketing Conversion Funnel',
            font=dict(size=14)
        )
        
        advanced_charts['funnel'] = funnel_fig.to_html(include_plotlyjs=False, div_id="funnel-chart")
    
    # 2. Waterfall Chart - Revenue Build-up by Channel
    if 'Channel' in df.columns and 'Revenue' in df.columns:
        channel_revenue = df.groupby('Channel')['Revenue'].sum().sort_values(ascending=False)
        
        waterfall_fig = go.Figure(go.Waterfall(
            name = "Revenue",
            orientation = "v",
            measure = ["relative"] * len(channel_revenue) + ["total"],
            x = list(channel_revenue.index) + ["Total"],
            textposition = "outside",
            text = [f"+${v:,.0f}" for v in channel_revenue.values] + [f"${channel_revenue.sum():,.0f}"],
            y = list(channel_revenue.values) + [0],
            connector = {"line":{"color":"rgb(63, 63, 63)"}},
        ))
        
        waterfall_fig.update_layout(
            title = "Revenue Waterfall by Channel",
            showlegend = True
        )
        
        advanced_charts['waterfall'] = waterfall_fig.to_html(include_plotlyjs=False, div_id="waterfall-chart")
    
    # 3. Radar/Spider Chart - Multi-metric Performance by Campaign Type
    if 'Campaign_Type' in df.columns:
        radar_metrics = df.groupby('Campaign_Type').agg({
            'CTR': 'mean',
            'ROAS': 'mean',
            'Revenue': 'sum',
            'Conversions': 'sum'
        }).reset_index()
        
        # Normalize metrics for radar chart (0-100 scale)
        for col in ['CTR', 'ROAS', 'Revenue', 'Conversions']:
            if col in radar_metrics.columns:
                max_val = radar_metrics[col].max()
                radar_metrics[f'{col}_normalized'] = (radar_metrics[col] / max_val * 100) if max_val > 0 else 0
        
        radar_fig = go.Figure()
        
        for idx, row in radar_metrics.iterrows():
            radar_fig.add_trace(go.Scatterpolar(
                r=[
                    row.get('CTR_normalized', 0),
                    row.get('ROAS_normalized', 0), 
                    row.get('Revenue_normalized', 0),
                    row.get('Conversions_normalized', 0)
                ],
                theta=['CTR', 'ROAS', 'Revenue', 'Conversions'],
                fill='toself',
                name=row['Campaign_Type']
            ))
        
        radar_fig.update_layout(
            polar=dict(
                radialaxis=dict(
                    visible=True,
                    range=[0, 100]
                )),
            showlegend=True,
            title="Performance Radar by Campaign Type"
        )
        
        advanced_charts['radar'] = radar_fig.to_html(include_plotlyjs=False, div_id="radar-chart")
    
    # 4. Treemap - Budget Allocation
    if all(col in df.columns for col in ['Campaign_Type', 'Channel', 'Budget']):
        treemap_fig = px.treemap(
            df, 
            path=[px.Constant("Total Budget"), 'Campaign_Type', 'Channel'], 
            values='Budget',
            title='Budget Allocation Treemap'
        )
        
        advanced_charts['treemap'] = treemap_fig.to_html(include_plotlyjs=False, div_id="treemap-chart")
    
    # 5. Sankey Diagram - Flow from Channel to Campaign Type to Outcome
    if all(col in df.columns for col in ['Channel', 'Campaign_Type', 'Revenue']):
        # Prepare data for sankey
        channel_to_type = df.groupby(['Channel', 'Campaign_Type'])['Revenue'].sum().reset_index()
        
        # Create node labels
        channels = df['Channel'].unique().tolist()
        campaign_types = df['Campaign_Type'].unique().tolist()
        all_nodes = channels + campaign_types
        
        # Create links
        source = []
        target = []
        value = []
        
        for _, row in channel_to_type.iterrows():
            source.append(all_nodes.index(row['Channel']))
            target.append(all_nodes.index(row['Campaign_Type'])) 
            value.append(row['Revenue'])
        
        sankey_fig = go.Figure(data=[go.Sankey(
            node = dict(
                pad = 15,
                thickness = 20,
                line = dict(color = "black", width = 0.5),
                label = all_nodes,
                color = "blue"
            ),
            link = dict(
                source = source,
                target = target,
                value = value
            )
        )])
        
        sankey_fig.update_layout(title_text="Revenue Flow: Channel → Campaign Type", font_size=10)
        
        advanced_charts['sankey'] = sankey_fig.to_html(include_plotlyjs=False, div_id="sankey-chart")
    
    return advanced_charts

if __name__ == "__main__":
    main()
