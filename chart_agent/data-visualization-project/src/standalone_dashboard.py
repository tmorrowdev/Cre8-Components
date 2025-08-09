#!/usr/bin/env python3
"""
Standalone Dashboard Generator

A simple, standalone dashboard generator that works without MCP dependencies.
This provides the core functionality for generating dashboards and recommendations.
"""

import os
import sys
import json
import argparse
import webbrowser
from pathlib import Path
from typing import Dict, Any, Optional

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

# Import our modules
from dashboard_recommender import DashboardRecommender
from mcp_plotly_integration import generate_plotly_dashboard_string
import pandas as pd


class StandaloneDashboardGenerator:
    """Standalone dashboard generator without MCP dependencies"""
    
    def __init__(self):
        self.output_dir = Path(__file__).parent.parent / "output"
        os.makedirs(self.output_dir, exist_ok=True)
        self.recommender = DashboardRecommender()
    
    def generate_dashboard(self, csv_path: str, chart_type: str = "auto", title: str = None) -> str:
        """Generate a standard dashboard from CSV data"""
        csv_path = Path(csv_path)
        
        if not csv_path.exists():
            raise FileNotFoundError(f"CSV file not found: {csv_path}")
        
        print(f"Generating dashboard for {csv_path.name}...")
        
        # Generate the dashboard HTML
        dashboard_html = generate_plotly_dashboard_string(data_path=csv_path)
        
        # Save the HTML
        output_filename = f"{csv_path.stem}_dashboard.html"
        output_path = self.output_dir / output_filename
        
        with open(output_path, 'w') as f:
            f.write(dashboard_html)
        
        print(f"Dashboard saved to {output_path}")
        
        # Open in browser
        webbrowser.open(f"file://{output_path.absolute()}")
        
        return str(output_path)
    
    def generate_marketing_dashboard(self, csv_path: str) -> str:
        """Generate a marketing-focused dashboard"""
        return self.generate_dashboard(csv_path, title="Marketing Campaign Performance Dashboard")
    
    def recommend_dashboard(self, csv_path: str, generate_preview: bool = False) -> Dict[str, Any]:
        """Analyze data and recommend dashboard visualizations"""
        csv_path = Path(csv_path)
        
        if not csv_path.exists():
            raise FileNotFoundError(f"CSV file not found: {csv_path}")
        
        print(f"Analyzing {csv_path.name} for dashboard recommendations...")
        
        # Read the data
        df = pd.read_csv(csv_path)
        
        # Get recommendations
        recommendations = self.recommender.analyze_and_recommend(df)
        
        # Save recommendations
        recommendations_file = self.output_dir / f"{csv_path.stem}_recommendations.json"
        with open(recommendations_file, 'w') as f:
            json.dump(recommendations, f, indent=2, default=str)
        
        print(f"Recommendations saved to {recommendations_file}")
        
        # Generate preview if requested
        if generate_preview:
            print("Generating preview dashboard based on recommendations...")
            preview_html = generate_plotly_dashboard_string(dataframe=df)
            
            preview_file = self.output_dir / f"{csv_path.stem}_recommended_dashboard.html"
            with open(preview_file, 'w') as f:
                f.write(preview_html)
            
            recommendations["preview_file"] = str(preview_file)
            print(f"Preview dashboard saved to {preview_file}")
            
            # Open preview in browser
            webbrowser.open(f"file://{preview_file.absolute()}")
        
        # Display recommendations
        self._display_recommendations(recommendations)
        
        return recommendations
    
    def _display_recommendations(self, recommendations: Dict[str, Any]) -> None:
        """Display recommendations in a readable format"""
        print("\n" + "="*50)
        print("DASHBOARD RECOMMENDATIONS")
        print("="*50)
        
        # Dashboard info
        rec = recommendations.get('recommendations', {})
        print(f"Title: {rec.get('dashboard_title', 'Unknown')}")
        print(f"Structure: {rec.get('dashboard_structure', 'Unknown')}")
        
        # Charts
        charts = rec.get('charts', [])
        if charts:
            print(f"\nRecommended Charts ({len(charts)}):")
            for i, chart in enumerate(charts, 1):
                print(f"{i}. {chart.get('title', 'Untitled')} ({chart.get('chart_type', 'unknown')})")
        
        # Data insights
        insights = recommendations.get('insights', [])
        if insights:
            print(f"\nData Insights ({len(insights)}):")
            for insight in insights:
                severity = insight.get('severity', 'info')
                marker = '⚠️' if severity == 'warning' else 'ℹ️'
                print(f"{marker} {insight.get('message', '')}")
        
        # Data profile
        profile = recommendations.get('data_profile', {})
        if profile:
            print(f"\nData Profile:")
            print(f"• Rows: {profile.get('row_count', 'Unknown')}")
            print(f"• Columns: {profile.get('column_count', 'Unknown')}")
            
            col_types = profile.get('column_types', {})
            for col_type, columns in col_types.items():
                if columns:
                    print(f"• {col_type.title()}: {len(columns)} columns")
        
        print("="*50)
    
    def interactive_mode(self, csv_path: Optional[str] = None) -> None:
        """Run in interactive mode"""
        print("🎯 Standalone Dashboard Generator")
        print("-" * 40)
        
        if csv_path:
            print(f"Working with CSV file: {csv_path}")
            self._process_csv_interactively(csv_path)
        else:
            # Ask for CSV file
            csv_path = input("Enter path to CSV file: ").strip()
            if csv_path and Path(csv_path).exists():
                self._process_csv_interactively(csv_path)
            else:
                print("❌ CSV file not found or invalid path.")
    
    def _process_csv_interactively(self, csv_path: str) -> None:
        """Process CSV file interactively"""
        while True:
            print("\nWhat would you like to do?")
            print("1. Generate standard dashboard")
            print("2. Generate marketing dashboard")
            print("3. Get dashboard recommendations")
            print("4. Get recommendations with preview")
            print("5. Exit")
            
            choice = input("\nEnter your choice (1-5): ").strip()
            
            try:
                if choice == "1":
                    self.generate_dashboard(csv_path)
                elif choice == "2":
                    self.generate_marketing_dashboard(csv_path)
                elif choice == "3":
                    self.recommend_dashboard(csv_path, generate_preview=False)
                elif choice == "4":
                    self.recommend_dashboard(csv_path, generate_preview=True)
                elif choice == "5":
                    print("👋 Goodbye!")
                    break
                else:
                    print("❌ Invalid choice. Please try again.")
                    continue
                
                # Ask if user wants to continue
                if input("\nPress Enter to continue or 'q' to quit: ").strip().lower() == 'q':
                    break
                    
            except Exception as e:
                print(f"❌ Error: {str(e)}")
                if input("Continue? (y/n): ").strip().lower() != 'y':
                    break


def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Standalone Dashboard Generator")
    parser.add_argument("--csv", help="Path to CSV file")
    parser.add_argument("--action", choices=["dashboard", "marketing", "recommend", "recommend-preview"], 
                        default="interactive", help="Action to perform")
    parser.add_argument("--title", help="Dashboard title")
    args = parser.parse_args()
    
    generator = StandaloneDashboardGenerator()
    
    try:
        if args.action == "interactive" or not args.csv:
            generator.interactive_mode(args.csv)
        elif args.action == "dashboard":
            generator.generate_dashboard(args.csv, title=args.title)
        elif args.action == "marketing":
            generator.generate_marketing_dashboard(args.csv)
        elif args.action == "recommend":
            generator.recommend_dashboard(args.csv, generate_preview=False)
        elif args.action == "recommend-preview":
            generator.recommend_dashboard(args.csv, generate_preview=True)
            
    except KeyboardInterrupt:
        print("\n👋 Interrupted by user")
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return 1
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
