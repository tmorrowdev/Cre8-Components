#!/usr/bin/env python3
"""
Dashboard Visualization Platform - Complete Demo

This script demonstrates all the features of our dashboard visualization platform,
including data analysis, recommendation engine, and interactive dashboard generation.
"""

import os
import sys
import time
from pathlib import Path

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

def run_demo():
    """Run a complete demonstration of the platform"""
    print("🎯 DASHBOARD VISUALIZATION PLATFORM DEMO")
    print("=" * 60)
    print()
    
    # Check if CSV file exists
    csv_path = Path(__file__).parent.parent / "data" / "marketing_campaigns.csv"
    if not csv_path.exists():
        print(f"❌ Demo CSV file not found at {csv_path}")
        print("Please ensure the marketing_campaigns.csv file is available.")
        return False
    
    print(f"📄 Demo data: {Path(csv_path).name}")
    print(f"📊 Data contains marketing campaign performance metrics")
    print()
    
    # Step 1: Data Analysis and Recommendations
    print("STEP 1: 🧠 INTELLIGENT DATA ANALYSIS")
    print("-" * 40)
    
    try:
        from dashboard_recommender import DashboardRecommender
        import pandas as pd
        import json
        
        # Load and analyze data
        df = pd.read_csv(csv_path)
        recommender = DashboardRecommender()
        
        print(f"✅ Loaded {len(df)} rows with {len(df.columns)} columns")
        print("🔍 Analyzing data structure and content...")
        
        # Suppress the pandas warnings for cleaner demo output
        import warnings
        warnings.filterwarnings('ignore')
        
        recommendations = recommender.analyze_and_recommend(df)
        
        print("✅ Analysis complete!")
        
        # Display key findings
        rec = recommendations.get('recommendations', {})
        print(f"📋 Recommended Dashboard: {rec.get('dashboard_title')}")
        print(f"🏗️  Structure: {rec.get('dashboard_structure')}")
        print(f"📈 Charts recommended: {len(rec.get('charts', []))}")
        print(f"💡 Insights found: {len(recommendations.get('insights', []))}")
        
        time.sleep(2)
        print()
        
    except Exception as e:
        print(f"❌ Error in data analysis: {str(e)}")
        return False
    
    # Step 2: Dashboard Generation
    print("STEP 2: 🎨 INTERACTIVE DASHBOARD GENERATION")
    print("-" * 40)
    
    try:
        from mcp_plotly_integration import generate_plotly_dashboard_string
        
        print("🎯 Generating interactive dashboard with Plotly...")
        
        # Generate dashboard
        dashboard_html = generate_plotly_dashboard_string(data_path=csv_path)
        
        # Save dashboard
        output_dir = Path(__file__).parent.parent / "output"
        os.makedirs(output_dir, exist_ok=True)
        
        dashboard_file = output_dir / "demo_dashboard.html"
        with open(dashboard_file, 'w') as f:
            f.write(dashboard_html)
        
        print(f"✅ Dashboard generated ({len(dashboard_html):,} characters)")
        print(f"💾 Saved to: {dashboard_file}")
        
        time.sleep(1)
        print()
        
    except Exception as e:
        print(f"❌ Error in dashboard generation: {str(e)}")
        return False
    
    # Step 3: Recommendation-based Preview
    print("STEP 3: 🔍 RECOMMENDATION-BASED PREVIEW")
    print("-" * 40)
    
    try:
        print("🎯 Creating dashboard based on AI recommendations...")
        
        # Generate preview based on recommendations
        preview_html = generate_plotly_dashboard_string(dataframe=df)
        
        preview_file = output_dir / "demo_recommended_dashboard.html"
        with open(preview_file, 'w') as f:
            f.write(preview_html)
        
        print(f"✅ Recommendation-based dashboard created")
        print(f"💾 Saved to: {preview_file}")
        
        # Save recommendations as well
        recommendations_file = output_dir / "demo_recommendations.json"
        with open(recommendations_file, 'w') as f:
            json.dump(recommendations, f, indent=2, default=str)
        
        print(f"💾 Recommendations saved to: {recommendations_file}")
        
        time.sleep(1)
        print()
        
    except Exception as e:
        print(f"❌ Error in preview generation: {str(e)}")
        return False
    
    # Step 4: Summary and Results
    print("STEP 4: 📊 DEMO RESULTS SUMMARY")
    print("-" * 40)
    
    print("✅ Demo completed successfully!")
    print()
    print("📁 Generated Files:")
    print(f"   • {dashboard_file.name} - Main interactive dashboard")
    print(f"   • {preview_file.name} - AI-recommended dashboard")
    print(f"   • {recommendations_file.name} - Detailed analysis report")
    print()
    
    print("🎯 Key Features Demonstrated:")
    print("   ✓ Intelligent data type detection")
    print("   ✓ Automatic metric and dimension identification") 
    print("   ✓ Smart chart type recommendations")
    print("   ✓ Data quality insights and outlier detection")
    print("   ✓ Interactive Plotly visualizations")
    print("   ✓ Professional dashboard styling")
    print("   ✓ Marketing-specific KPI calculations")
    print()
    
    # Display detailed recommendations
    print("💡 AI RECOMMENDATIONS:")
    print("-" * 25)
    
    # Charts
    charts = rec.get('charts', [])
    if charts:
        print("📈 Recommended Visualizations:")
        for i, chart in enumerate(charts[:3], 1):  # Show top 3
            print(f"   {i}. {chart.get('title')} ({chart.get('chart_type')})")
    
    # Insights
    insights = recommendations.get('insights', [])
    if insights:
        print("\n🔍 Data Quality Insights:")
        for insight in insights[:3]:  # Show top 3
            severity = insight.get('severity', 'info')
            marker = '⚠️' if severity == 'warning' else 'ℹ️'
            print(f"   {marker} {insight.get('message', '')}")
    
    print()
    print("🌐 To view dashboards, open the HTML files in your browser:")
    print(f"   file://{dashboard_file.absolute()}")
    print(f"   file://{preview_file.absolute()}")
    print()
    
    # Offer to open browsers
    response = input("🌐 Open dashboards in browser now? (y/n): ").strip().lower()
    if response in ['y', 'yes']:
        import webbrowser
        webbrowser.open(f"file://{dashboard_file.absolute()}")
        time.sleep(1)
        webbrowser.open(f"file://{preview_file.absolute()}")
        print("✅ Dashboards opened in browser!")
    
    print()
    print("🎉 DEMO COMPLETE!")
    print("=" * 60)
    
    return True

def show_platform_capabilities():
    """Show the full capabilities of the platform"""
    print("🚀 PLATFORM CAPABILITIES")
    print("=" * 60)
    print()
    
    capabilities = [
        ("🧠 Intelligent Data Analysis", [
            "Automatic column type detection (numeric, categorical, temporal, text)",
            "Smart identification of key metrics and dimensions",
            "Temporal pattern recognition",
            "Data quality assessment and outlier detection",
            "Business context inference (marketing, sales, etc.)"
        ]),
        
        ("📊 Dashboard Recommendations", [
            "Chart type optimization based on data characteristics",
            "Layout structure recommendations (single, grid, etc.)",
            "Priority-based visualization ranking",
            "Color scheme and styling suggestions",
            "Interactive feature recommendations"
        ]),
        
        ("🎨 Visualization Generation", [
            "Interactive Plotly charts (bar, line, pie, scatter, heatmap)",
            "Professional dashboard styling and theming",
            "Responsive design for different screen sizes",
            "KPI cards and summary metrics",
            "Trend analysis and correlation views"
        ]),
        
        ("💼 Marketing Analytics", [
            "Campaign performance tracking",
            "ROI and ROAS calculations",
            "Conversion funnel analysis",
            "Channel comparison dashboards",
            "Time-series trend analysis"
        ]),
        
        ("🔧 Technical Features", [
            "CSV data import and processing",
            "Base64 encoded data support",
            "Error handling and data validation",
            "HTML export with embedded charts",
            "JSON recommendations export"
        ]),
        
        ("🚀 Deployment Options", [
            "Standalone Python scripts",
            "Interactive command-line interface",
            "Web browser integration",
            "Batch processing capabilities",
            "Simple deployment scripts"
        ])
    ]
    
    for category, features in capabilities:
        print(f"{category}")
        print("-" * (len(category) - 2))
        for feature in features:
            print(f"  • {feature}")
        print()
    
    print("=" * 60)

def main():
    """Main function"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Dashboard Visualization Platform Demo")
    parser.add_argument("--capabilities", action="store_true", help="Show platform capabilities")
    parser.add_argument("--demo", action="store_true", help="Run full demo")
    args = parser.parse_args()
    
    if args.capabilities:
        show_platform_capabilities()
        return 0
    
    if args.demo or True:  # Default to demo
        success = run_demo()
        return 0 if success else 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
