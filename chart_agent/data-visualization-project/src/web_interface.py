#!/usr/bin/env python3
"""
Web-based Dashboard Interface
Provides a simple web interface for uploading CSV files and generating dashboards
"""

import os
import sys
import json
import tempfile
import uuid
from pathlib import Path
from datetime import datetime
import pandas as pd

# Add the script directory to path
script_dir = Path(__file__).parent
if str(script_dir) not in sys.path:
    sys.path.append(str(script_dir))

try:
    from flask import Flask, render_template, request, jsonify, send_file, redirect, url_for
    from werkzeug.utils import secure_filename
    HAS_FLASK = True
except ImportError:
    print("Flask not installed. Install with: pip install flask")
    HAS_FLASK = False
    sys.exit(1)

from mcp_plotly_integration import generate_plotly_dashboard_string
from dashboard_recommender import DashboardRecommender

# Initialize Flask app with correct template folder
template_dir = Path(__file__).parent.parent / 'templates'
app = Flask(__name__, template_folder=str(template_dir))
app.config['SECRET_KEY'] = 'dashboard-viz-platform-2024'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload directory
UPLOAD_FOLDER = Path(__file__).parent.parent / 'output' / 'uploads'
OUTPUT_FOLDER = Path(__file__).parent.parent / 'output' / 'web_dashboards'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = str(UPLOAD_FOLDER)
app.config['OUTPUT_FOLDER'] = str(OUTPUT_FOLDER)

# Store dashboard info in memory (in production, use a database)
dashboards = {}

@app.route('/')
def index():
    """Home page with upload form"""
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle CSV file upload and dashboard generation"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.lower().endswith('.csv'):
            return jsonify({'error': 'Only CSV files are allowed'}), 400
        
        # Generate unique identifier
        dashboard_id = str(uuid.uuid4())
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        file_path = Path(app.config['UPLOAD_FOLDER']) / f"{timestamp}_{filename}"
        file.save(file_path)
        
        # Analyze data and generate recommendations
        df = pd.read_csv(file_path)
        recommender = DashboardRecommender()
        recommendations = recommender.analyze_and_recommend(df)
        
        # Generate dashboard
        dashboard_html = generate_plotly_dashboard_string(dataframe=df)
        
        # Save dashboard
        dashboard_filename = f"dashboard_{timestamp}.html"
        dashboard_path = Path(app.config['OUTPUT_FOLDER']) / dashboard_filename
        
        with open(dashboard_path, 'w') as f:
            f.write(dashboard_html)
        
        # Store dashboard info
        dashboards[dashboard_id] = {
            'id': dashboard_id,
            'filename': filename,
            'timestamp': datetime.now().isoformat(),
            'dashboard_path': str(dashboard_path),
            'dashboard_filename': dashboard_filename,
            'recommendations': recommendations,
            'row_count': len(df),
            'column_count': len(df.columns)
        }
        
        return jsonify({
            'success': True,
            'dashboard_id': dashboard_id,
            'message': 'Dashboard generated successfully!'
        })
        
    except Exception as e:
        return jsonify({'error': f'Error processing file: {str(e)}'}), 500

@app.route('/dashboard/<dashboard_id>')
def view_dashboard(dashboard_id):
    """View a generated dashboard"""
    if dashboard_id not in dashboards:
        return "Dashboard not found", 404
    
    dashboard_info = dashboards[dashboard_id]
    return send_file(dashboard_info['dashboard_path'])

@app.route('/recommendations/<dashboard_id>')
def view_recommendations(dashboard_id):
    """View recommendations for a dashboard"""
    if dashboard_id not in dashboards:
        return jsonify({'error': 'Dashboard not found'}), 404
    
    dashboard_info = dashboards[dashboard_id]
    return jsonify(dashboard_info['recommendations'])

@app.route('/dashboards')
def list_dashboards():
    """List all generated dashboards"""
    dashboard_list = []
    for dashboard_id, info in dashboards.items():
        dashboard_list.append({
            'id': dashboard_id,
            'filename': info['filename'],
            'timestamp': info['timestamp'],
            'row_count': info['row_count'],
            'column_count': info['column_count'],
            'dashboard_url': url_for('view_dashboard', dashboard_id=dashboard_id),
            'recommendations_url': url_for('view_recommendations', dashboard_id=dashboard_id)
        })
    
    return render_template('dashboard_list.html', dashboards=dashboard_list)

@app.route('/api/status')
def api_status():
    """API status endpoint"""
    return jsonify({
        'status': 'running',
        'dashboards_count': len(dashboards),
        'capabilities': [
            'CSV upload and processing',
            'AI-powered data analysis',
            'Interactive dashboard generation',
            'Real-time recommendations',
            'Multiple chart types',
            'Marketing analytics focus'
        ]
    })

# Create templates directory and files
def create_templates():
    """Create HTML templates for the web interface"""
    templates_dir = Path(__file__).parent.parent / 'templates'
    os.makedirs(templates_dir, exist_ok=True)
    
    # Index template
    index_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Visualization Platform</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .upload-area {
            border: 2px dashed #007bff;
            border-radius: 10px;
            padding: 50px;
            text-align: center;
            background: #f8f9fa;
            margin: 20px 0;
            transition: all 0.3s ease;
        }
        .upload-area:hover {
            background: #e3f2fd;
        }
        .feature-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 text-center mb-5">
                <h1>🎯 Dashboard Visualization Platform</h1>
                <p class="lead">Upload your CSV data and get AI-powered interactive dashboards instantly</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="upload-area">
                    <form id="uploadForm" enctype="multipart/form-data">
                        <div class="mb-3">
                            <i class="fas fa-cloud-upload-alt fa-3x mb-3 text-primary"></i>
                            <h4>Upload Your CSV File</h4>
                            <p class="text-muted">Choose a CSV file with your data to generate an interactive dashboard</p>
                        </div>
                        <div class="mb-3">
                            <input type="file" class="form-control" id="csvFile" accept=".csv" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg">
                            <i class="fas fa-magic"></i> Generate Dashboard
                        </button>
                    </form>
                </div>
                
                <div id="uploadStatus" class="mt-3"></div>
            </div>
        </div>
        
        <div class="row mt-5">
            <div class="col-md-4">
                <div class="feature-card">
                    <h5>🧠 AI Analysis</h5>
                    <p>Automatic data type detection and intelligent insights</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="feature-card">
                    <h5>📊 Interactive Charts</h5>
                    <p>Beautiful, responsive visualizations with Plotly</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="feature-card">
                    <h5>💼 Marketing Focus</h5>
                    <p>Specialized analytics for campaign performance</p>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-12 text-center">
                <a href="/dashboards" class="btn btn-outline-primary">View All Dashboards</a>
                <a href="/api/status" class="btn btn-outline-secondary">API Status</a>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('uploadForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const fileInput = document.getElementById('csvFile');
            const statusDiv = document.getElementById('uploadStatus');
            
            if (!fileInput.files[0]) {
                statusDiv.innerHTML = '<div class="alert alert-warning">Please select a file</div>';
                return;
            }
            
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            
            statusDiv.innerHTML = '<div class="alert alert-info">📊 Processing your data...</div>';
            
            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    statusDiv.innerHTML = `
                        <div class="alert alert-success">
                            <h5>✅ Dashboard Generated Successfully!</h5>
                            <p>${result.message}</p>
                            <div class="mt-3">
                                <a href="/dashboard/${result.dashboard_id}" class="btn btn-success" target="_blank">
                                    View Dashboard
                                </a>
                                <a href="/recommendations/${result.dashboard_id}" class="btn btn-info ml-2" target="_blank">
                                    View Recommendations
                                </a>
                            </div>
                        </div>
                    `;
                } else {
                    statusDiv.innerHTML = `<div class="alert alert-danger">❌ Error: ${result.error}</div>`;
                }
            } catch (error) {
                statusDiv.innerHTML = `<div class="alert alert-danger">❌ Upload failed: ${error.message}</div>`;
            }
        });
    </script>
</body>
</html>"""
    
    # Dashboard list template
    dashboard_list_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Dashboards - Dashboard Platform</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <h1>📊 All Dashboards</h1>
                <a href="/" class="btn btn-primary mb-4">← Back to Upload</a>
                
                {% if dashboards %}
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Created</th>
                                <th>Rows</th>
                                <th>Columns</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {% for dashboard in dashboards %}
                            <tr>
                                <td>{{ dashboard.filename }}</td>
                                <td>{{ dashboard.timestamp[:19].replace('T', ' ') }}</td>
                                <td>{{ dashboard.row_count }}</td>
                                <td>{{ dashboard.column_count }}</td>
                                <td>
                                    <a href="{{ dashboard.dashboard_url }}" class="btn btn-sm btn-success" target="_blank">
                                        View Dashboard
                                    </a>
                                    <a href="{{ dashboard.recommendations_url }}" class="btn btn-sm btn-info" target="_blank">
                                        Recommendations
                                    </a>
                                </td>
                            </tr>
                            {% endfor %}
                        </tbody>
                    </table>
                </div>
                {% else %}
                <div class="alert alert-info">
                    <h4>No dashboards yet</h4>
                    <p>Upload a CSV file to generate your first dashboard!</p>
                    <a href="/" class="btn btn-primary">Upload CSV</a>
                </div>
                {% endif %}
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>"""
    
    # Write templates
    with open(templates_dir / 'index.html', 'w') as f:
        f.write(index_html)
    
    with open(templates_dir / 'dashboard_list.html', 'w') as f:
        f.write(dashboard_list_html)
    
    print(f"✅ Templates created in {templates_dir}")

def main():
    """Main function to run the web server"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Web-based Dashboard Interface")
    parser.add_argument("--host", default="127.0.0.1", help="Host to bind to")
    parser.add_argument("--port", type=int, default=5000, help="Port to bind to")
    parser.add_argument("--debug", action="store_true", help="Run in debug mode")
    args = parser.parse_args()
    
    # Create templates
    create_templates()
    
    print(f"🌐 Starting Dashboard Visualization Platform Web Interface")
    print(f"📍 Access at: http://{args.host}:{args.port}")
    print(f"📊 Features available:")
    print(f"   • CSV file upload and processing")
    print(f"   • AI-powered data analysis")
    print(f"   • Interactive dashboard generation")
    print(f"   • Real-time recommendations")
    print(f"   • Dashboard gallery and management")
    
    # Run Flask app
    app.run(host=args.host, port=args.port, debug=args.debug)

if __name__ == "__main__":
    if not HAS_FLASK:
        print("❌ Flask is required for the web interface")
        print("💡 Install with: pip install flask")
        sys.exit(1)
    
    main()
