#!/usr/bin/env python3
"""
Test Web Interface Upload Process
"""

import sys
import tempfile
from pathlib import Path

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

def test_web_upload_process():
    """Test the web interface upload process"""
    
    print("🧪 Testing Web Interface Upload Process")
    print("=" * 50)
    
    try:
        # Import required modules
        import pandas as pd
        from dashboard_recommender import DashboardRecommender
        from mcp_plotly_integration import generate_plotly_dashboard_string
        
        print("✅ All modules imported successfully")
        
        # Test with the marketing campaigns data
        csv_path = Path(__file__).parent.parent / "data" / "marketing_campaigns.csv"
        
        if not csv_path.exists():
            print(f"❌ CSV file not found: {csv_path}")
            return False
        
        print(f"📊 Testing with: {csv_path.name}")
        
        # Step 1: Load CSV (simulating file upload)
        df = pd.read_csv(csv_path)
        print(f"✅ CSV loaded: {len(df)} rows, {len(df.columns)} columns")
        
        # Step 2: Generate recommendations (as web interface does)
        recommender = DashboardRecommender()
        print("🧠 Generating recommendations...")
        recommendations = recommender.analyze_and_recommend(df)
        print("✅ Recommendations generated")
        
        # Step 3: Generate dashboard (as web interface does)
        print("🎨 Generating dashboard...")
        dashboard_html = generate_plotly_dashboard_string(dataframe=df)
        print(f"✅ Dashboard generated ({len(dashboard_html):,} characters)")
        
        # Step 4: Save dashboard (as web interface does)
        with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False) as f:
            f.write(dashboard_html)
            temp_path = f.name
        
        print(f"✅ Dashboard saved to: {temp_path}")
        
        # Step 5: Test data structure that web interface expects
        dashboard_info = {
            'filename': csv_path.name,
            'row_count': len(df),
            'column_count': len(df.columns),
            'recommendations': recommendations
        }
        
        print("✅ Dashboard info structure created")
        print(f"   • Filename: {dashboard_info['filename']}")
        print(f"   • Rows: {dashboard_info['row_count']}")
        print(f"   • Columns: {dashboard_info['column_count']}")
        print(f"   • Recommendations: {len(dashboard_info['recommendations'])} items")
        
        print("\n🎉 Web interface upload process test PASSED!")
        print("   All components work correctly with the marketing campaigns data.")
        
        return True
        
    except Exception as e:
        print(f"❌ Web interface upload test FAILED: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def test_web_interface_startup():
    """Test web interface startup"""
    
    print("\n🌐 Testing Web Interface Startup")
    print("=" * 50)
    
    try:
        from web_interface import app
        
        print(f"✅ Flask app created")
        print(f"📁 Template folder: {app.template_folder}")
        print(f"🔧 Upload folder: {app.config.get('UPLOAD_FOLDER', 'Not set')}")
        print(f"📊 Output folder: {app.config.get('OUTPUT_FOLDER', 'Not set')}")
        
        # Test template rendering
        with app.app_context():
            from flask import render_template
            
            # Test index template
            index_html = render_template('index.html')
            print(f"✅ index.html renders ({len(index_html)} chars)")
            
            # Test dashboard list template
            list_html = render_template('dashboard_list.html', dashboards=[])
            print(f"✅ dashboard_list.html renders ({len(list_html)} chars)")
        
        print("✅ Web interface startup test PASSED!")
        return True
        
    except Exception as e:
        print(f"❌ Web interface startup test FAILED: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all tests"""
    
    print("🚀 Comprehensive Web Interface Testing")
    print("=" * 60)
    
    # Test upload process
    upload_success = test_web_upload_process()
    
    # Test startup
    startup_success = test_web_interface_startup()
    
    # Summary
    print(f"\n📋 TEST SUMMARY")
    print("=" * 60)
    print(f"Upload Process: {'✅ PASSED' if upload_success else '❌ FAILED'}")
    print(f"Interface Startup: {'✅ PASSED' if startup_success else '❌ FAILED'}")
    
    if upload_success and startup_success:
        print("\n🎉 ALL TESTS PASSED!")
        print("Web interface should work correctly with your CSV file.")
        print("\n💡 To start the web interface:")
        print("   cd src/")
        print("   python3 web_interface.py")
        print("   Open: http://localhost:5000")
    else:
        print("\n⚠️ SOME TESTS FAILED!")
        print("Please check the error messages above.")
    
    return upload_success and startup_success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
