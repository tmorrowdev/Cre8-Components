#!/usr/bin/env python3
"""
Simple Dashboard Deployment Script

This script provides an easy way to generate and deploy dashboards using the
working components of our dashboard visualization platform.
"""

import os
import sys
import argparse
import webbrowser
from pathlib import Path

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

def generate_dashboard(csv_path, output_dir=None, open_browser=True):
    """Generate a dashboard from a CSV file"""
    try:
        from mcp_plotly_integration import generate_plotly_dashboard_string
        
        csv_path = Path(csv_path)
        if not csv_path.exists():
            print(f"❌ CSV file not found: {csv_path}")
            return False
        
        if output_dir is None:
            output_dir = Path(__file__).parent.parent / "output"
        else:
            output_dir = Path(output_dir)
        
        os.makedirs(output_dir, exist_ok=True)
        
        print(f"🎯 Generating dashboard for {csv_path.name}...")
        
        # Generate the dashboard HTML
        dashboard_html = generate_plotly_dashboard_string(data_path=csv_path)
        
        # Save the HTML
        output_filename = f"{csv_path.stem}_dashboard.html"
        output_path = output_dir / output_filename
        
        with open(output_path, 'w') as f:
            f.write(dashboard_html)
        
        print(f"✅ Dashboard saved to {output_path}")
        
        # Open in browser
        if open_browser:
            webbrowser.open(f"file://{output_path.absolute()}")
            print(f"🌐 Dashboard opened in browser")
        
        return str(output_path)
        
    except Exception as e:
        print(f"❌ Error generating dashboard: {str(e)}")
        return False

def generate_recommendations(csv_path, output_dir=None, generate_preview=False):
    """Generate dashboard recommendations for a CSV file"""
    try:
        from dashboard_recommender import DashboardRecommender
        from mcp_plotly_integration import generate_plotly_dashboard_string
        import pandas as pd
        import json
        
        csv_path = Path(csv_path)
        if not csv_path.exists():
            print(f"❌ CSV file not found: {csv_path}")
            return False
        
        if output_dir is None:
            output_dir = Path(__file__).parent.parent / "output"
        else:
            output_dir = Path(output_dir)
        
        os.makedirs(output_dir, exist_ok=True)
        
        print(f"🎯 Analyzing {csv_path.name} for dashboard recommendations...")
        
        # Read the data
        df = pd.read_csv(csv_path)
        
        # Get recommendations
        recommender = DashboardRecommender()
        recommendations = recommender.analyze_and_recommend(df)
        
        # Save recommendations
        recommendations_file = output_dir / f"{csv_path.stem}_recommendations.json"
        with open(recommendations_file, 'w') as f:
            json.dump(recommendations, f, indent=2, default=str)
        
        print(f"✅ Recommendations saved to {recommendations_file}")
        
        # Display recommendations
        display_recommendations(recommendations)
        
        # Generate preview if requested
        if generate_preview:
            print(f"🎯 Generating preview dashboard based on recommendations...")
            preview_html = generate_plotly_dashboard_string(dataframe=df)
            
            preview_file = output_dir / f"{csv_path.stem}_recommended_dashboard.html"
            with open(preview_file, 'w') as f:
                f.write(preview_html)
            
            print(f"✅ Preview dashboard saved to {preview_file}")
            
            # Open preview in browser
            webbrowser.open(f"file://{preview_file.absolute()}")
            print(f"🌐 Preview dashboard opened in browser")
        
        return True
        
    except Exception as e:
        print(f"❌ Error generating recommendations: {str(e)}")
        return False

def display_recommendations(recommendations):
    """Display recommendations in a readable format"""
    print("\n" + "="*50)
    print("📊 DASHBOARD RECOMMENDATIONS")
    print("="*50)
    
    # Dashboard info
    rec = recommendations.get('recommendations', {})
    print(f"📋 Title: {rec.get('dashboard_title', 'Unknown')}")
    print(f"🏗️  Structure: {rec.get('dashboard_structure', 'Unknown')}")
    
    # Charts
    charts = rec.get('charts', [])
    if charts:
        print(f"\n📈 Recommended Charts ({len(charts)}):")
        for i, chart in enumerate(charts, 1):
            print(f"   {i}. {chart.get('title', 'Untitled')} ({chart.get('chart_type', 'unknown')})")
    
    # Data insights
    insights = recommendations.get('insights', [])
    if insights:
        print(f"\n💡 Data Insights ({len(insights)}):")
        for insight in insights:
            severity = insight.get('severity', 'info')
            marker = '⚠️' if severity == 'warning' else 'ℹ️'
            print(f"   {marker} {insight.get('message', '')}")
    
    # Data profile
    profile = recommendations.get('data_profile', {})
    if profile:
        print(f"\n📊 Data Profile:")
        print(f"   • Rows: {profile.get('row_count', 'Unknown'):,}")
        print(f"   • Columns: {profile.get('column_count', 'Unknown')}")
        
        col_types = profile.get('column_types', {})
        for col_type, columns in col_types.items():
            if columns:
                print(f"   • {col_type.title()}: {len(columns)} columns")
    
    print("="*50)

def interactive_mode():
    """Run in interactive mode"""
    print("🎯 Dashboard Visualization Platform")
    print("=" * 50)
    
    # Ask for CSV file
    csv_path = input("📄 Enter path to CSV file: ").strip()
    
    if not csv_path or not Path(csv_path).exists():
        print("❌ CSV file not found or invalid path.")
        return False
    
    while True:
        print(f"\n🎯 Working with: {Path(csv_path).name}")
        print("="*30)
        print("1. 📊 Generate dashboard")
        print("2. 🎯 Generate marketing dashboard")
        print("3. 💡 Get dashboard recommendations")
        print("4. 🔍 Get recommendations + preview")
        print("5. 🚪 Exit")
        
        choice = input("\nEnter your choice (1-5): ").strip()
        
        try:
            if choice == "1":
                generate_dashboard(csv_path)
            elif choice == "2":
                generate_dashboard(csv_path)  # Same as regular for now
            elif choice == "3":
                generate_recommendations(csv_path, generate_preview=False)
            elif choice == "4":
                generate_recommendations(csv_path, generate_preview=True)
            elif choice == "5":
                print("👋 Goodbye!")
                break
            else:
                print("❌ Invalid choice. Please try again.")
                continue
            
            # Ask if user wants to continue
            if input("\nPress Enter to continue or 'q' to quit: ").strip().lower() == 'q':
                break
                
        except KeyboardInterrupt:
            print("\n👋 Interrupted by user")
            break
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            if input("Continue? (y/n): ").strip().lower() != 'y':
                break
    
    return True

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Simple Dashboard Deployment")
    parser.add_argument("--csv", help="Path to CSV file")
    parser.add_argument("--action", choices=["dashboard", "recommend", "recommend-preview", "interactive"], 
                        default="interactive", help="Action to perform")
    parser.add_argument("--output", help="Output directory")
    parser.add_argument("--no-browser", action="store_true", help="Don't open browser")
    args = parser.parse_args()
    
    try:
        if args.action == "interactive" or (not args.csv and args.action != "interactive"):
            return 0 if interactive_mode() else 1
        
        open_browser = not args.no_browser
        
        if args.action == "dashboard":
            result = generate_dashboard(args.csv, args.output, open_browser)
            return 0 if result else 1
        elif args.action == "recommend":
            result = generate_recommendations(args.csv, args.output, generate_preview=False)
            return 0 if result else 1
        elif args.action == "recommend-preview":
            result = generate_recommendations(args.csv, args.output, generate_preview=True)
            return 0 if result else 1
            
    except KeyboardInterrupt:
        print("\n👋 Interrupted by user")
        return 0
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
