#!/usr/bin/env python3
"""
Direct Web Interface Upload Test
"""

import sys
import requests
from pathlib import Path

def test_upload_endpoint():
    """Test the upload endpoint directly"""
    
    print("🌐 Testing Web Interface Upload Endpoint")
    print("=" * 50)
    
    # Path to the CSV file
    csv_path = Path(__file__).parent.parent / "data" / "marketing_campaigns.csv"
    
    if not csv_path.exists():
        print(f"❌ CSV file not found: {csv_path}")
        return False
    
    print(f"📊 Using file: {csv_path}")
    
    try:
        # Prepare the file for upload
        with open(csv_path, 'rb') as f:
            files = {'file': (csv_path.name, f, 'text/csv')}
            
            print("📤 Sending POST request to /upload...")
            
            # Send the request (assuming server is running on port 5002)
            response = requests.post(
                'http://localhost:5002/upload',
                files=files,
                timeout=60  # Increase timeout for large files
            )
        
        print(f"📥 Response Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Upload successful!")
            print(f"   Dashboard ID: {result.get('dashboard_id')}")
            print(f"   Message: {result.get('message')}")
            
            # Test viewing the dashboard
            dashboard_id = result.get('dashboard_id')
            if dashboard_id:
                dashboard_url = f"http://localhost:5002/dashboard/{dashboard_id}"
                print(f"\n🌐 Dashboard URL: {dashboard_url}")
                
                # Try to access the dashboard
                dashboard_response = requests.get(dashboard_url, timeout=30)
                if dashboard_response.status_code == 200:
                    print("✅ Dashboard is accessible")
                else:
                    print(f"❌ Dashboard not accessible: {dashboard_response.status_code}")
            
            return True
        else:
            print(f"❌ Upload failed with status {response.status_code}")
            try:
                error_data = response.json()
                print(f"   Error: {error_data.get('error', 'Unknown error')}")
            except:
                print(f"   Response text: {response.text[:500]}...")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the server.")
        print("💡 Make sure the web interface is running:")
        print("   cd src/")
        print("   python3 web_interface.py --port 5002")
        return False
        
    except Exception as e:
        print(f"❌ Upload test failed: {str(e)}")
        return False

def main():
    """Main test function"""
    
    success = test_upload_endpoint()
    
    if success:
        print("\n🎉 WEB INTERFACE UPLOAD TEST PASSED!")
        print("The web interface should work correctly with file uploads.")
    else:
        print("\n⚠️ WEB INTERFACE UPLOAD TEST FAILED!")
        print("There may be an issue with the server or the upload process.")
    
    return success

if __name__ == "__main__":
    # First, let's install requests if it's not available
    try:
        import requests
    except ImportError:
        print("Installing requests module...")
        import subprocess
        subprocess.check_call([
            "/Library/Frameworks/Python.framework/Versions/3.12/bin/python3", 
            "-m", "pip", "install", "requests"
        ])
        import requests
    
    success = main()
    sys.exit(0 if success else 1)
