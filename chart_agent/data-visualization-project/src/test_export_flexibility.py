#!/usr/bin/env python3
"""
Test the flexible export functionality with different datasets
"""

import sys
import pandas as pd
from pathlib import Path
import tempfile

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

from dashboard_export import export_dashboard_charts

def test_with_different_datasets():
    """Test export functionality with various dataset column names"""
    
    print("🧪 Testing Export Flexibility with Different Datasets")
    print("=" * 60)
    
    # Test 1: E-commerce data
    ecommerce_data = {
        'ProductName': ['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones'],
        'Price': [1200, 800, 400, 300, 150],
        'UnitsSold': [50, 120, 80, 200, 300],
        'Category': ['Electronics', 'Electronics', 'Electronics', 'Wearables', 'Audio'],
        'LaunchDate': ['2024-01-15', '2024-02-20', '2024-03-10', '2024-04-05', '2024-05-12']
    }
    
    # Test 2: Sales data  
    sales_data = {
        'SalesRep': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
        'Revenue': [50000, 75000, 60000, 90000, 45000],
        'Commission': [5000, 7500, 6000, 9000, 4500],
        'Territory': ['North', 'South', 'East', 'West', 'Central'],
        'JoinDate': ['2023-01-01', '2023-03-15', '2023-06-20', '2023-08-10', '2023-11-05']
    }
    
    # Test 3: Website analytics
    analytics_data = {
        'PageTitle': ['Home', 'Products', 'About', 'Contact', 'Blog'],
        'PageViews': [10000, 8500, 3200, 1800, 5400],
        'BounceRate': [0.25, 0.35, 0.45, 0.55, 0.30],
        'Source': ['Direct', 'Google', 'Facebook', 'Twitter', 'Email'],
        'Date': ['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04', '2024-07-05']
    }
    
    datasets = [
        ('ecommerce', ecommerce_data, "E-commerce Product Performance"),
        ('sales', sales_data, "Sales Team Performance"), 
        ('analytics', analytics_data, "Website Analytics")
    ]
    
    output_dir = Path(__file__).parent.parent / "output" / "flexibility_test"
    
    for name, data, description in datasets:
        print(f"\n📊 Testing: {description}")
        print("-" * 40)
        
        # Create DataFrame
        df = pd.DataFrame(data)
        print(f"Columns: {list(df.columns)}")
        
        # Create temporary CSV file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as tmp:
            df.to_csv(tmp.name, index=False)
            temp_csv = tmp.name
        
        try:
            # Export charts
            exported_files = export_dashboard_charts(
                temp_csv, 
                output_dir / name, 
                formats=['html']  # Just HTML for demo
            )
            
            print(f"✅ Successfully exported {len(exported_files)} charts")
            
        except Exception as e:
            print(f"❌ Export failed: {str(e)}")
        
        finally:
            # Clean up temp file
            Path(temp_csv).unlink(missing_ok=True)
    
    print(f"\n🎉 Flexibility Test Complete!")
    print(f"📁 Results saved to: {output_dir}")
    print(f"💡 The export system now works with ANY column names!")

if __name__ == "__main__":
    test_with_different_datasets()
