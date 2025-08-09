#!/usr/bin/env python3
"""
Dashboard Visualization Platform Deployment Script

This script provides a simple way to deploy the entire dashboard visualization platform,
including the MCP server, recommendation engine, and web interface.

Usage:
    python deploy.py --port 8080 
"""

import os
import sys
import argparse
import subprocess
import webbrowser
import time
from pathlib import Path
import signal

# Add script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

def check_requirements():
    """Check if all required packages are installed"""
    requirements_file = Path(__file__).parent.parent / "requirements.txt"
    
    if not requirements_file.exists():
        print("Requirements file not found. Creating one...")
        with open(requirements_file, 'w') as f:
            f.write("""# Data Visualization Platform Requirements
pandas>=1.3.0
numpy>=1.20.0
plotly>=5.3.0
mcp>=0.1.0
kaleido>=0.2.1  # For static image export
pydantic>=1.8.0
"""
            )
    
    print("Checking requirements...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", str(requirements_file)])
        print("All requirements satisfied.")
        return True
    except subprocess.CalledProcessError:
        print("Error installing requirements. Please install them manually.")
        print(f"pip install -r {requirements_file}")
        return False

def start_mcp_server(port=8000, detach=False):
    """Start the MCP server"""
    server_script = script_dir / "enhanced_dashboard_mcp_server_compatible.py"
    
    if not server_script.exists():
        print(f"Server script not found at {server_script}")
        # Try the original script as fallback
        fallback_script = script_dir / "enhanced_dashboard_mcp_server.py"
        if fallback_script.exists():
            print(f"Using fallback server script: {fallback_script}")
            server_script = fallback_script
        else:
            return None
    
    print("Starting Enhanced Dashboard MCP Server...")
    
    # Make the script executable
    os.chmod(server_script, os.stat(server_script).st_mode | 0o111)
    
    # Start the server
    if detach:
        # Run in background
        process = subprocess.Popen(
            [sys.executable, str(server_script)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            preexec_fn=os.setpgrp  # Detach from parent process
        )
    else:
        # Run in foreground
        process = subprocess.Popen([sys.executable, str(server_script)])
    
    # Wait for server to start
    time.sleep(2)
    
    return process

def run_client(csv_path=None, port=8000):
    """Run the client"""
    client_script = script_dir / "enhanced_dashboard_client.py"
    
    if not client_script.exists():
        print(f"Client script not found at {client_script}")
        return False
    
    print("Starting Enhanced Dashboard Client...")
    
    # Make the script executable
    os.chmod(client_script, os.stat(client_script).st_mode | 0o111)
    
    # Build command
    cmd = [sys.executable, str(client_script)]
    
    if csv_path:
        cmd.extend(["--csv", csv_path])
    
    if port != 8000:
        cmd.extend(["--port", str(port)])
        
    # Run the client
    client_process = subprocess.Popen(cmd)
    client_process.wait()
    
    return True

def deploy_server_only(port=8000):
    """Deploy just the server component for production"""
    server_script = script_dir / "enhanced_dashboard_mcp_server_compatible.py"
    http_script = script_dir / "dashboard_http_server.py"
    
    if not server_script.exists():
        print(f"Server script not found at {server_script}")
        # Try the original script as fallback
        fallback_script = script_dir / "enhanced_dashboard_mcp_server.py"
        if fallback_script.exists():
            print(f"Using fallback server script: {fallback_script}")
            server_script = fallback_script
        else:
            return False
    
    print("Deploying Enhanced Dashboard MCP Server for production...")
    
    # Make the scripts executable
    os.chmod(server_script, os.stat(server_script).st_mode | 0o111)
    
    if http_script.exists():
        os.chmod(http_script, os.stat(http_script).st_mode | 0o111)
        
        # Start the HTTP server
        print(f"Starting HTTP server on port {port}...")
        http_process = subprocess.Popen(
            [sys.executable, str(http_script), "--port", str(port)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        # Wait for HTTP server to start
        time.sleep(2)
        
        # Open browser
        webbrowser.open(f"http://localhost:{port}")
        
        print(f"Dashboard HTTP server running at http://localhost:{port}")
        print("Press Ctrl+C to stop the server")
        
        try:
            http_process.wait()
        except KeyboardInterrupt:
            print("Stopping HTTP server...")
            http_process.terminate()
    else:
        # Start the MCP server and open the client
        mcp_process = start_mcp_server(port=port, detach=True)
        
        if not mcp_process:
            return False
        
        # Deploy dashboard server via MCP client
        from enhanced_dashboard_client import EnhancedDashboardClient
        import asyncio
        
        async def deploy():
            client = EnhancedDashboardClient()
            await client.start()
            await client.deploy_dashboard_server(port=port)
            await client.close()
        
        asyncio.run(deploy())
        
        print(f"Dashboard server running at http://localhost:{port}")
        print("Press Ctrl+C to stop the server")
        
        try:
            mcp_process.wait()
        except KeyboardInterrupt:
            print("Stopping MCP server...")
            mcp_process.terminate()
    
    return True

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Deploy Dashboard Visualization Platform")
    parser.add_argument("--port", type=int, default=8000, help="Port for the web server")
    parser.add_argument("--csv", help="Path to CSV file to analyze")
    parser.add_argument("--server-only", action="store_true", help="Deploy server only (for production)")
    parser.add_argument("--skip-check", action="store_true", help="Skip requirements check")
    args = parser.parse_args()
    
    # Check requirements
    if not args.skip_check and not check_requirements():
        return 1
    
    # Deploy based on arguments
    if args.server_only:
        if deploy_server_only(port=args.port):
            return 0
        else:
            return 1
    else:
        # Start the MCP server
        server_process = start_mcp_server(port=args.port)
        
        if not server_process:
            return 1
        
        try:
            # Run the client
            if not run_client(csv_path=args.csv, port=args.port):
                print("Error running client.")
                return 1
        finally:
            # Stop the server
            print("Stopping MCP server...")
            server_process.terminate()
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
