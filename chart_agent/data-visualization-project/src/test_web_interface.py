#!/usr/bin/env python3
"""
Quick test of web interface template resolution
"""

import sys
from pathlib import Path

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

def test_web_interface():
    """Test the web interface initialization"""
    
    print("🧪 Testing Web Interface...")
    
    try:
        # Import and test template resolution
        from web_interface import app
        
        print(f"✅ Flask app imported successfully")
        print(f"📁 Template folder: {app.template_folder}")
        
        # Test template resolution
        with app.app_context():
            from flask import render_template
            
            # Try to render index template
            try:
                html = render_template('index.html')
                print(f"✅ index.html template renders successfully ({len(html)} chars)")
            except Exception as e:
                print(f"❌ index.html template error: {e}")
                return False
            
            # Try to render dashboard_list template
            try:
                html = render_template('dashboard_list.html', dashboards=[])
                print(f"✅ dashboard_list.html template renders successfully ({len(html)} chars)")
            except Exception as e:
                print(f"❌ dashboard_list.html template error: {e}")
                return False
        
        print("✅ All templates working correctly!")
        print("🌐 Web interface is ready to start")
        return True
        
    except Exception as e:
        print(f"❌ Web interface test failed: {e}")
        return False

if __name__ == "__main__":
    success = test_web_interface()
    sys.exit(0 if success else 1)
