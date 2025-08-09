#!/usr/bin/env python3
"""
Dashboard Recommendation System Test

This script tests the dashboard recommendation system with a sample CSV file.
"""

import sys
import os
import asyncio
from pathlib import Path

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

async def test_dashboard_recommendation():
    """Test the dashboard recommendation system"""
    from dashboard_recommender import DashboardRecommender
    import pandas as pd
    import json
    
    # Path to CSV file - update this path as needed
    csv_path = "/Users/tylersmbp/Documents/Bookexcel.csv"
    
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found at {csv_path}")
        print("Please update the path in the script.")
        return
    
    print(f"Reading CSV file: {csv_path}")
    
    try:
        # Read the CSV file
        df = pd.read_csv(csv_path)
        
        # Print basic information about the data
        print(f"Data shape: {df.shape}")
        print("Columns:")
        for col in df.columns:
            print(f"  - {col}")
        
        print("\nAnalyzing data for dashboard recommendations...")
        
        # Initialize the recommender
        recommender = DashboardRecommender()
        
        # Get recommendations
        recommendations = recommender.analyze_and_recommend(df)
        
        print("\nRecommendations generated successfully:")
        print(f"Dashboard title: {recommendations['recommendations']['dashboard_title']}")
        print(f"Dashboard structure: {recommendations['recommendations']['dashboard_structure']}")
        print("\nRecommended charts:")
        
        for i, chart in enumerate(recommendations['recommendations']['charts']):
            print(f"{i+1}. {chart['title']} ({chart['chart_type']})")
        
        # Save the recommendations to a file
        output_file = Path(script_dir).parent / "output" / "test_recommendations.json"
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        with open(output_file, 'w') as f:
            json.dump(recommendations, f, indent=2)
        
        print(f"\nRecommendations saved to {output_file}")
        print("\nTest completed successfully.")
        
    except Exception as e:
        print(f"Error during test: {str(e)}")
        raise

if __name__ == "__main__":
    asyncio.run(test_dashboard_recommendation())
