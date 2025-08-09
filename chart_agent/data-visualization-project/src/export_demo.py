#!/usr/bin/env python3
"""
Dashboard Export Demo
Demonstrates export capabilities for dashboard charts
"""

import os
import sys
from pathlib import Path
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

def demo_export_capabilities():
    """Demo the export capabilities of the dashboard system"""
    
    print("🎨 Dashboard Export Capabilities Demo")
    print("=" * 50)
    
    # Check what's available
    data_path = Path(__file__).parent.parent / "data" / "marketing_campaigns.csv"
    output_dir = Path(__file__).parent.parent / "output" / "exports"
    
    if not data_path.exists():
        print(f"❌ Data file not found: {data_path}")
        return
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Load data
    df = pd.read_csv(data_path)
    print(f"📊 Loaded data: {len(df)} campaigns with {len(df.columns)} metrics")
    
    # Create sample charts for export
    charts_created = []
    
    # 1. Revenue by Campaign (Bar Chart)
    if 'campaign' in df.columns and 'Revenue' in df.columns:
        campaign_revenue = df.groupby('campaign')['Revenue'].sum().sort_values(ascending=False).head(8)
        
        fig = px.bar(
            x=campaign_revenue.index,
            y=campaign_revenue.values,
            title='Top 8 Campaigns by Revenue',
            labels={'x': 'Campaign', 'y': 'Revenue ($)'}
        )
        fig.update_layout(xaxis_tickangle=-45, width=1000, height=600)
        
        # Export HTML (always works)
        html_path = output_dir / "revenue_by_campaign.html"
        fig.write_html(html_path, include_plotlyjs=True)
        charts_created.append(str(html_path))
        print(f"✅ Created: revenue_by_campaign.html")
        
        # Try PNG export
        try:
            png_path = output_dir / "revenue_by_campaign.png"
            fig.write_image(png_path, width=1000, height=600)
            charts_created.append(str(png_path))
            print(f"✅ Created: revenue_by_campaign.png")
        except Exception as e:
            print(f"⚠️  PNG export unavailable: {str(e)[:50]}...")
    
    # 2. ROAS by Channel (Horizontal Bar)
    if 'Channel' in df.columns:
        channel_metrics = df.groupby('Channel').agg({
            'Revenue': 'sum',
            'Spend': 'sum'
        }).reset_index()
        channel_metrics['ROAS'] = channel_metrics['Revenue'] / channel_metrics['Spend']
        
        fig = px.bar(
            channel_metrics.sort_values('ROAS', ascending=True),
            x='ROAS',
            y='Channel',
            orientation='h',
            title='Return on Ad Spend by Channel',
            color='ROAS',
            color_continuous_scale='RdYlGn'
        )
        fig.update_layout(width=1000, height=600)
        
        html_path = output_dir / "roas_by_channel.html"
        fig.write_html(html_path, include_plotlyjs=True)
        charts_created.append(str(html_path))
        print(f"✅ Created: roas_by_channel.html")
    
    # 3. Campaign Type Distribution (Pie Chart)
    if 'Campaign_Type' in df.columns and 'Revenue' in df.columns:
        type_revenue = df.groupby('Campaign_Type')['Revenue'].sum()
        
        fig = px.pie(
            values=type_revenue.values,
            names=type_revenue.index,
            title='Revenue Share by Campaign Type'
        )
        fig.update_layout(width=800, height=600)
        
        html_path = output_dir / "campaign_type_distribution.html"
        fig.write_html(html_path, include_plotlyjs=True)
        charts_created.append(str(html_path))
        print(f"✅ Created: campaign_type_distribution.html")
    
    # 4. Budget vs Revenue Scatter
    if all(col in df.columns for col in ['Budget', 'Revenue', 'Campaign_Type']):
        fig = px.scatter(
            df,
            x='Budget',
            y='Revenue',
            color='Campaign_Type',
            size='Conversions' if 'Conversions' in df.columns else None,
            hover_data=['campaign'],
            title='Budget vs Revenue Analysis'
        )
        fig.update_layout(width=1000, height=700)
        
        html_path = output_dir / "budget_vs_revenue.html"
        fig.write_html(html_path, include_plotlyjs=True)
        charts_created.append(str(html_path))
        print(f"✅ Created: budget_vs_revenue.html")
    
    print(f"\n📁 Export Summary:")
    print(f"   • Location: {output_dir}")
    print(f"   • Files created: {len(charts_created)}")
    print(f"   • Formats: HTML (always), PNG (if kaleido available)")
    
    print(f"\n💡 Export Enhancement Options:")
    print(f"   📦 Install kaleido for image exports: pip install kaleido")
    print(f"   🎨 Supports formats: PNG, PDF, SVG, JPEG")
    print(f"   📱 Responsive charts work in any browser")
    print(f"   🔗 Shareable HTML files with embedded interactivity")
    
    return charts_created

def check_export_dependencies():
    """Check what export capabilities are available"""
    print("\n🔍 Checking Export Dependencies:")
    
    # Check kaleido
    try:
        import kaleido
        print("✅ Kaleido: Available (PNG, PDF, SVG, JPEG export)")
    except ImportError:
        print("❌ Kaleido: Not installed (image export unavailable)")
        print("   Install with: pip install kaleido")
    
    # Check basic requirements
    try:
        import plotly
        print(f"✅ Plotly: {plotly.__version__}")
    except ImportError:
        print("❌ Plotly: Not available")
    
    try:
        import pandas
        print(f"✅ Pandas: {pandas.__version__}")
    except ImportError:
        print("❌ Pandas: Not available")

if __name__ == "__main__":
    try:
        check_export_dependencies()
        charts = demo_export_capabilities()
        
        if charts:
            print(f"\n🎉 Demo complete! {len(charts)} charts exported.")
            print(f"📂 Open {Path(__file__).parent.parent / 'output' / 'exports'} to view files")
        else:
            print("❌ No charts were created")
            
    except Exception as e:
        print(f"❌ Demo failed: {str(e)}")
        sys.exit(1)
