#!/usr/bin/env python3
"""
Dashboard Export Utilities
Provides functionality to export dashboards and charts to various formats (PDF, PNG, SVG)
"""

import os
import sys
from pathlib import Path
import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.io as pio
import json

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

def setup_export_engines():
    """Setup export engines for different formats"""
    try:
        # Try to use kaleido (recommended)
        import kaleido
        pio.kaleido.scope.default_format = "png"
        return "kaleido"
    except ImportError:
        try:
            # Try to use orca (legacy)
            import plotly.io._orca
            return "orca"
        except ImportError:
            print("⚠️  Warning: No export engine found. Install kaleido for best results:")
            print("   pip install kaleido")
            return None

def export_dashboard_charts(csv_path, output_dir=None, formats=None):
    """
    Export individual charts from dashboard to various formats
    
    Args:
        csv_path (str): Path to CSV file
        output_dir (str): Output directory (default: output/exports/)
        formats (list): List of formats to export ['png', 'pdf', 'svg', 'html']
    """
    from mcp_plotly_integration import generate_plotly_dashboard_string
    from dashboard_recommender import DashboardRecommender
    
    if formats is None:
        formats = ['png', 'pdf', 'svg']
    
    if output_dir is None:
        output_dir = Path(__file__).parent.parent / "output" / "exports"
    else:
        output_dir = Path(output_dir)
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Setup export engine
    engine = setup_export_engines()
    if engine is None and any(fmt in formats for fmt in ['png', 'pdf', 'svg']):
        print("❌ Cannot export to image formats without kaleido or orca")
        formats = [fmt for fmt in formats if fmt == 'html']
    
    print(f"🎯 Exporting charts from {Path(csv_path).name}...")
    
    # Load and analyze data
    df = pd.read_csv(csv_path)
    recommender = DashboardRecommender()
    recommendations = recommender.analyze_and_recommend(df)
    
    # Create individual charts based on recommendations
    charts = create_export_charts(df, recommendations)
    
    file_stem = Path(csv_path).stem
    exported_files = []
    
    for chart_name, fig in charts.items():
        for fmt in formats:
            filename = f"{file_stem}_{chart_name}.{fmt}"
            filepath = output_dir / filename
            
            try:
                if fmt == 'html':
                    fig.write_html(filepath, include_plotlyjs=True)
                elif fmt == 'png':
                    fig.write_image(filepath, format='png', width=1200, height=800)
                elif fmt == 'pdf':
                    fig.write_image(filepath, format='pdf', width=1200, height=800)
                elif fmt == 'svg':
                    fig.write_image(filepath, format='svg', width=1200, height=800)
                
                exported_files.append(str(filepath))
                print(f"✅ Exported {filename}")
                
            except Exception as e:
                print(f"❌ Failed to export {filename}: {str(e)}")
    
    print(f"\n📊 Export complete! Files saved to {output_dir}")
    print(f"🎉 {len(exported_files)} files exported")
    
    return exported_files

def create_export_charts(df, recommendations):
    """Create individual charts suitable for export based on data analysis"""
    import plotly.express as px
    import plotly.graph_objects as go
    
    charts = {}
    
    # Analyze column types dynamically
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
    date_cols = []
    
    # Try to identify date columns
    for col in df.columns:
        try:
            # Only check if column is not already numeric
            if col not in numeric_cols:
                test_sample = df[col].dropna().head(10)
                pd.to_datetime(test_sample, errors='raise')
                date_cols.append(col)
        except:
            continue
    
    # Remove date columns from categorical if they exist there
    categorical_cols = [col for col in categorical_cols if col not in date_cols]
    
    print(f"📊 Column Analysis: {len(numeric_cols)} numeric, {len(categorical_cols)} categorical, {len(date_cols)} date")
    
    # 1. Top values for the highest numeric column (like revenue/sales)
    if len(numeric_cols) >= 1 and len(categorical_cols) >= 1:
        # Find the numeric column with highest values (likely revenue/sales)
        main_metric = max(numeric_cols, key=lambda x: df[x].sum() if df[x].sum() > 0 else 0)
        main_category = categorical_cols[0]  # Use first categorical column
        
        top_values = df.groupby(main_category)[main_metric].sum().sort_values(ascending=False).head(10)
        
        fig = px.bar(
            x=top_values.index,
            y=top_values.values,
            title=f'Top 10 {main_category} by {main_metric}',
            labels={'x': main_category, 'y': main_metric},
            color=top_values.values,
            color_continuous_scale='Blues'
        )
        fig.update_layout(xaxis_tickangle=-45, width=1200, height=600)
        charts['top_performance'] = fig
    
    # 2. Distribution pie chart for categorical data
    if len(categorical_cols) >= 1 and len(numeric_cols) >= 1:
        category_col = categorical_cols[0]
        value_col = numeric_cols[0]
        
        distribution = df.groupby(category_col)[value_col].sum()
        
        fig = px.pie(
            values=distribution.values,
            names=distribution.index,
            title=f'{value_col} Distribution by {category_col}'
        )
        fig.update_layout(width=800, height=600)
        charts['distribution'] = fig
    
    # 3. Correlation scatter plot for two numeric columns
    if len(numeric_cols) >= 2:
        x_col = numeric_cols[0]
        y_col = numeric_cols[1]
        color_col = categorical_cols[0] if categorical_cols else None
        
        fig = px.scatter(
            df,
            x=x_col,
            y=y_col,
            color=color_col,
            title=f'{x_col} vs {y_col}' + (f' by {color_col}' if color_col else ''),
            hover_data=[col for col in categorical_cols[:2]]  # Show first 2 categorical columns in hover
        )
        fig.update_layout(width=1000, height=700)
        charts['correlation'] = fig
    
    # 4. Time series trend if date columns available
    if date_cols and numeric_cols:
        date_col = date_cols[0]
        value_col = numeric_cols[0]
        
        try:
            df_trend = df.copy()
            df_trend[date_col] = pd.to_datetime(df_trend[date_col])
            df_trend = df_trend.sort_values(date_col)
            
            # Group by date and sum numeric values
            if len(numeric_cols) >= 2:
                # Create date grouping
                df_trend['date_group'] = df_trend[date_col].dt.date
                trend_data = df_trend.groupby('date_group').agg({
                    numeric_cols[0]: 'sum',
                    numeric_cols[1]: 'sum' 
                }).reset_index()
                
                fig = go.Figure()
                fig.add_trace(go.Scatter(
                    x=trend_data['date_group'],
                    y=trend_data[numeric_cols[0]],
                    name=numeric_cols[0],
                    line=dict(color='blue')
                ))
                fig.add_trace(go.Scatter(
                    x=trend_data['date_group'],
                    y=trend_data[numeric_cols[1]],
                    name=numeric_cols[1],
                    line=dict(color='red')
                ))
                
                fig.update_layout(
                    title=f'{numeric_cols[0]} and {numeric_cols[1]} Over Time',
                    xaxis_title=date_col,
                    yaxis_title='Values',
                    width=1200,
                    height=600
                )
            else:
                # Create date grouping for single metric
                df_trend['date_group'] = df_trend[date_col].dt.date
                trend_data = df_trend.groupby('date_group')[value_col].sum().reset_index()
                
                fig = px.line(
                    trend_data,
                    x='date_group',
                    y=value_col,
                    title=f'{value_col} Trend Over Time'
                )
                fig.update_layout(width=1200, height=600)
            
            charts['time_trend'] = fig
        except Exception as e:
            print(f"⚠️  Could not create time series chart: {str(e)}")
    
    # 5. Multi-metric comparison (bar chart for multiple numeric columns)
    if len(numeric_cols) >= 3 and len(categorical_cols) >= 1:
        category_col = categorical_cols[0]
        
        # Aggregate multiple metrics by category
        metrics_data = df.groupby(category_col)[numeric_cols[:3]].sum().reset_index()
        
        fig = go.Figure()
        for metric in numeric_cols[:3]:
            fig.add_trace(go.Bar(
                name=metric,
                x=metrics_data[category_col],
                y=metrics_data[metric]
            ))
        
        fig.update_layout(
            title=f'Multi-Metric Comparison by {category_col}',
            xaxis_title=category_col,
            yaxis_title='Values',
            barmode='group',
            width=1200,
            height=600
        )
        charts['multi_metric'] = fig
    
    # 6. Box plot for distribution analysis
    if len(numeric_cols) >= 1 and len(categorical_cols) >= 1:
        numeric_col = numeric_cols[0]
        category_col = categorical_cols[0]
        
        fig = px.box(
            df,
            x=category_col,
            y=numeric_col,
            title=f'{numeric_col} Distribution by {category_col}'
        )
        fig.update_layout(width=1000, height=600)
        charts['distribution_analysis'] = fig
    
    return charts

def export_dashboard_pdf(csv_path, output_dir=None):
    """Export complete dashboard as a multi-page PDF"""
    engine = setup_export_engines()
    if engine is None:
        print("❌ Cannot export PDF without kaleido or orca")
        return None
    
    try:
        # This would require additional libraries like reportlab or weasyprint
        # For now, we'll export individual charts and provide instructions
        print("📄 Multi-page PDF export requires additional setup.")
        print("💡 Consider using:")
        print("   1. Export individual charts as PDF")
        print("   2. Use browser print-to-PDF on HTML dashboard")
        print("   3. Install weasyprint: pip install weasyprint")
        
        return export_dashboard_charts(csv_path, output_dir, formats=['pdf'])
        
    except Exception as e:
        print(f"❌ PDF export failed: {str(e)}")
        return None

def main():
    """Main function for command-line usage"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Export dashboards to various formats")
    parser.add_argument("--csv", required=True, help="Path to CSV file")
    parser.add_argument("--output", help="Output directory")
    parser.add_argument("--formats", nargs='+', choices=['png', 'pdf', 'svg', 'html'], 
                        default=['png', 'pdf', 'svg'], help="Export formats")
    parser.add_argument("--dashboard-pdf", action='store_true', 
                        help="Export complete dashboard as PDF")
    
    args = parser.parse_args()
    
    try:
        if args.dashboard_pdf:
            export_dashboard_pdf(args.csv, args.output)
        else:
            export_dashboard_charts(args.csv, args.output, args.formats)
            
    except Exception as e:
        print(f"❌ Export failed: {str(e)}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
