#!/usr/bin/env python3
"""
Dashboard Platform Launcher

Quick launcher for the Dashboard Visualization Platform.
This script provides the easiest way to generate dashboards from CSV data.
"""

import sys
import os
from pathlib import Path

# Add the src directory to path
src_dir = Path(__file__).parent / "src"
if str(src_dir) not in sys.path:
    sys.path.append(str(src_dir))

def main():
    """Main launcher function"""
    
    print("🎯 Dashboard Visualization Platform Launcher")
    print("=" * 50)
    
    # Import and run the simple deploy script
    try:
        from simple_deploy import main as deploy_main
        
        # Check if arguments were passed
        if len(sys.argv) > 1:
            # Pass through arguments to the deploy script
            result = deploy_main()
        else:
            # Interactive mode
            print("\n🚀 Launching interactive dashboard generator...")
            print("   Use Ctrl+C to exit at any time")
            print()
            result = deploy_main()
        
        return result
        
    except ImportError as e:
        print(f"❌ Error importing dashboard modules: {e}")
        print("Make sure you're running from the project root directory.")
        return 1
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
